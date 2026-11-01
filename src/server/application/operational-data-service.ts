import "server-only";

import type {
  CustomerReviewRecord,
  MenuItemRecord,
  OrderRecord,
  Restaurant,
} from "../domain/operational-records";
import type { SimulationInputs } from "../domain/simulation";
import type {
  NewCustomerReview,
  NewMenuItem,
  NewOrder,
  NewRestaurant,
  OperationalDataRepository,
} from "./ports/operational-data-repository";
import type {
  DashboardInsight,
  DashboardReadModel,
  DiagnosticsReadModel,
  MenuReadModel,
  OperationalDataReadModel,
  ReviewView,
  SimulationReadModel,
  SentimentLabel,
} from "./read-models";

const money = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

const number = (value: number, decimals = 0) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const percent = (value: number) => `${number(value)}%`;
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function sentimentForRating(rating: number): SentimentLabel {
  if (rating >= 4) return "Positivo";
  if (rating <= 2) return "Negativo";
  return "Neutro";
}

function toReviewView(
  review: CustomerReviewRecord,
  menuItems: Map<string, MenuItemRecord>,
): ReviewView {
  return {
    id: review.id,
    menuItemId: review.menuItemId,
    customer: review.customer,
    rating: review.rating,
    comment: review.comment,
    channel: review.channel,
    answered: review.answered,
    item: review.menuItemId
      ? menuItems.get(review.menuItemId)?.name ?? "Experiência geral"
      : "Experiência geral",
    date: new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(review.receivedAt),
    timestamp: review.receivedAt.getTime(),
    sentiment: sentimentForRating(review.rating),
  };
}

function percentChange(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? "Novo" : "—";
  const change = Math.round(((current - previous) / previous) * 100);
  return `${change > 0 ? "+" : ""}${change}%`;
}

function direction(current: number, previous: number, lowerIsBetter = false): "up" | "down" {
  if (current === previous) return "up";
  const improved = lowerIsBetter ? current < previous : current > previous;
  return improved ? "up" : "down";
}

function startOfDay(date: Date): Date {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
}

function startOfWeek(date: Date): Date {
  const start = startOfDay(date);
  start.setDate(start.getDate() - 6);
  return start;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function groupOrdersByHour(orders: OrderRecord[]) {
  const counts = new Map<number, number>();
  for (const order of orders) {
    const hour = order.orderedAt.getHours();
    counts.set(hour, (counts.get(hour) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort(([left], [right]) => left - right)
    .map(([hour, orders]) => ({ hour: `${String(hour).padStart(2, "0")}h`, orders }));
}

function reviewThemeScores(reviews: ReviewView[]) {
  const themes = [
    { label: "Sabor", match: /sabor|gosto|tempero|del[ií]cia|gostoso/i },
    { label: "Entrega", match: /entrega|entregador|demor|atras|pedido/i },
    { label: "Temperatura", match: /frio|quente|temperatura|esfri/i },
  ];

  return themes.map(({ label, match }) => {
    const mentions = reviews.filter((review) => match.test(review.comment));
    const positive = mentions.filter((review) => review.sentiment === "Positivo").length;
    return { label, score: mentions.length ? Math.round((positive / mentions.length) * 100) : 0 };
  });
}

function buildDashboardRecommendations(
  orders: OrderRecord[],
  reviews: ReviewView[],
  items: MenuItemRecord[],
) {
  const recommendations = [];
  const avgPreparation = orders.length
    ? orders.reduce((sum, order) => sum + order.preparationMinutes, 0) / orders.length
    : 0;

  if (orders.length && avgPreparation > 22) {
    recommendations.push({
      id: "reduce-preparation-time",
      title: "Revisar o tempo de preparo",
      description: `Média atual de ${number(avgPreparation, 1)} minutos por pedido.`,
      detail: "Compare os pedidos mais demorados e reveja o pré-preparo e a distribuição das etapas da cozinha.",
      impact: `Tempo médio registrado: ${number(avgPreparation, 1)} min`,
    });
  }

  const negativeReviews = reviews.filter((review) => review.sentiment === "Negativo");
  if (negativeReviews.length) {
    const mostRecent = negativeReviews[0];
    recommendations.push({
      id: "review-follow-up",
      title: "Acompanhar avaliações negativas",
      description: `${negativeReviews.length} avaliação(ões) com nota até 2.`,
      detail: `Leia o feedback recente: “${mostRecent.comment}” e registre o retorno dado ao cliente.`,
      impact: `${negativeReviews.length} feedback(s) precisam de acompanhamento`,
    });
  }

  const lowMarginItem = items
    .filter((item) => item.priceCents > 0 && item.costCents < item.priceCents)
    .map((item) => ({ item, margin: (item.priceCents - item.costCents) / item.priceCents }))
    .sort((a, b) => a.margin - b.margin)[0];

  if (lowMarginItem && lowMarginItem.margin < 0.3) {
    recommendations.push({
      id: "menu-margin-review",
      title: `Rever a margem de ${lowMarginItem.item.name}`,
      description: `Margem cadastrada de ${percent(lowMarginItem.margin * 100)}.`,
      detail: "Confira o custo dos ingredientes e o preço de venda cadastrados para este item.",
      impact: `Margem atual: ${percent(lowMarginItem.margin * 100)}`,
    });
  }

  return recommendations;
}

export class OperationalDataService {
  constructor(private readonly repository: OperationalDataRepository) {}

  getRestaurants(): Promise<Restaurant[]> {
    return this.repository.getRestaurants();
  }

  getSelectedRestaurant(): Promise<Restaurant | null> {
    return this.repository.getSelectedRestaurant();
  }

  async createRestaurant(input: NewRestaurant): Promise<Restaurant> {
    const existing = await this.repository.getRestaurants();
    if (existing.some((restaurant) => restaurant.name.toLowerCase() === input.name.toLowerCase())) {
      throw new Error("Já existe um restaurante com esse nome.");
    }
    const restaurant = await this.repository.createRestaurant(input);
    if (!(await this.repository.getSelectedRestaurant())) {
      await this.repository.selectRestaurant(restaurant.id);
    }
    return restaurant;
  }

  selectRestaurant(id: string): Promise<void> {
    return this.repository.selectRestaurant(id);
  }

  async getOperationalData(restaurantId?: string): Promise<OperationalDataReadModel> {
    const restaurant = restaurantId
      ? await this.repository.getRestaurant(restaurantId)
      : await this.repository.getSelectedRestaurant();
    if (!restaurant) {
      return { restaurant: null, menuItems: [], orders: [], reviews: [] };
    }

    const [menuItems, orders, reviews] = await Promise.all([
      this.repository.getMenuItems(restaurant.id),
      this.repository.getOrders(restaurant.id),
      this.repository.getReviews(restaurant.id),
    ]);
    const menuItemMap = new Map(menuItems.map((item) => [item.id, item]));

    return {
      restaurant,
      menuItems,
      orders,
      reviews: reviews.map((review) => toReviewView(review, menuItemMap)),
    };
  }

  async getDashboardData(restaurantId?: string): Promise<DashboardReadModel> {
    const data = await this.getOperationalData(restaurantId);
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now);
    const previousWeekStart = new Date(weekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7);
    const monthStart = startOfMonth(now);
    const currentOrders = data.orders.filter((order) => order.orderedAt >= weekStart);
    const previousOrders = data.orders.filter(
      (order) => order.orderedAt >= previousWeekStart && order.orderedAt < weekStart,
    );
    const currentReviews = data.reviews.filter((review) => review.timestamp >= weekStart.getTime());
    const previousReviews = data.reviews.filter(
      (review) => review.timestamp >= previousWeekStart.getTime() && review.timestamp < weekStart.getTime(),
    );
    const countRevenue = (orders: OrderRecord[]) =>
      orders.reduce((sum, order) => sum + order.revenueCents, 0);
    const averagePreparation = (orders: OrderRecord[]) =>
      orders.length
        ? orders.reduce((sum, order) => sum + order.preparationMinutes, 0) / orders.length
        : 0;
    const averageRating = (reviews: ReviewView[]) =>
      reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
    const positive = data.reviews.filter((review) => review.sentiment === "Positivo").length;
    const neutral = data.reviews.filter((review) => review.sentiment === "Neutro").length;
    const negative = data.reviews.filter((review) => review.sentiment === "Negativo").length;
    const totalReviews = data.reviews.length;
    const sentiments = [
      { name: "Positivo" as const, count: positive, fill: "var(--color-positive)" },
      { name: "Neutro" as const, count: neutral, fill: "var(--color-neutral)" },
      { name: "Negativo" as const, count: negative, fill: "var(--color-negative)" },
    ].map(({ name, count, fill }) => ({
      name,
      value: totalReviews ? Math.round((count / totalReviews) * 100) : 0,
      fill,
    }));

    const currentRating = averageRating(currentReviews);
    const previousRating = averageRating(previousReviews);
    const currentPrep = averagePreparation(currentOrders);
    const previousPrep = averagePreparation(previousOrders);
    const recommendations = buildDashboardRecommendations(data.orders, data.reviews, data.menuItems);
    const insights: DashboardInsight[] = recommendations.slice(0, 3).map((item, index) => ({
      label: index === 0 ? "Insight operacional" : "Oportunidade identificada",
      title: item.title,
      description: item.description,
    }));
    if (!insights.length && (data.orders.length || data.reviews.length)) {
      insights.push({
        label: "Dados registrados",
        title: "Acompanhe sua operação",
        description: `${data.orders.length} pedido(s) e ${data.reviews.length} avaliação(ões) registrados no sistema.`,
      });
    }

    const itemOrders = new Map<string, number>();
    const previousItemOrders = new Map<string, number>();
    for (const order of currentOrders) {
      if (order.menuItemId) itemOrders.set(order.menuItemId, (itemOrders.get(order.menuItemId) ?? 0) + order.quantity);
    }
    for (const order of previousOrders) {
      if (order.menuItemId) previousItemOrders.set(order.menuItemId, (previousItemOrders.get(order.menuItemId) ?? 0) + order.quantity);
    }
    const itemMap = new Map(data.menuItems.map((item) => [item.id, item]));
    const popularItems = [...itemOrders.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .flatMap(([id, count]) => {
        const item = itemMap.get(id);
        if (!item) return [];
        return [{ name: item.name, change: percentChange(count, previousItemOrders.get(id) ?? 0), itemId: id }];
      });

    const todayOrders = data.orders.filter((order) => order.orderedAt >= todayStart);
    const monthOrders = data.orders.filter((order) => order.orderedAt >= monthStart);
    const ordersByPeriod = {
      Hoje: groupOrdersByHour(todayOrders),
      "Esta semana": groupOrdersByHour(currentOrders),
      "Este mês": groupOrdersByHour(monthOrders),
    };
    const avgRatingAll = averageRating(data.reviews);
    const ratingChange = currentRating - previousRating;
    const metrics = [
      {
        label: "Pedidos",
        value: number(currentOrders.length),
        change: percentChange(currentOrders.length, previousOrders.length),
        direction: direction(currentOrders.length, previousOrders.length),
        context: "vs. semana anterior",
        icon: "cart" as const,
      },
      {
        label: "Satisfação",
        value: data.reviews.length ? number(avgRatingAll, 1) : "—",
        change: previousReviews.length ? `${ratingChange >= 0 ? "+" : ""}${number(ratingChange, 1)}` : "—",
        direction: direction(currentRating, previousRating),
        context: "média das avaliações",
        icon: "star" as const,
      },
      {
        label: "Tempo médio",
        value: currentOrders.length ? `${number(currentPrep, 1)} min` : "—",
        change: previousOrders.length ? `${number(currentPrep - previousPrep, 1)} min` : "—",
        direction: direction(currentPrep, previousPrep, true),
        context: "tempo de preparo registrado",
        icon: "clock" as const,
      },
      {
        label: "Receita",
        value: money(countRevenue(currentOrders)),
        change: percentChange(countRevenue(currentOrders), countRevenue(previousOrders)),
        direction: direction(countRevenue(currentOrders), countRevenue(previousOrders)),
        context: "vs. semana anterior",
        icon: "coins" as const,
      },
    ];

    return {
      restaurantId: data.restaurant?.id ?? null,
      hasData: data.orders.length > 0 || data.reviews.length > 0,
      metrics,
      ordersByPeriod,
      recommendations,
      insights,
      reviewThemes: reviewThemeScores(data.reviews),
      sentiments,
      reviews: data.reviews,
      popularItems,
      totalReviews,
    };
  }

  async getMenuData(restaurantId?: string): Promise<MenuReadModel> {
    const data = await this.getOperationalData(restaurantId);
    const now = new Date();
    const weekStart = startOfWeek(now);
    const previousWeekStart = new Date(weekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7);
    const currentOrders = data.orders.filter((order) => order.orderedAt >= weekStart);
    const previousOrders = data.orders.filter(
      (order) => order.orderedAt >= previousWeekStart && order.orderedAt < weekStart,
    );
    const itemMap = new Map(data.menuItems.map((item) => [item.id, item]));
    const ratings = new Map<string, number[]>();
    for (const review of data.reviews) {
      if (review.menuItemId) ratings.set(review.menuItemId, [...(ratings.get(review.menuItemId) ?? []), review.rating]);
    }
    const currentSales = new Map<string, number>();
    const previousSales = new Map<string, number>();
    const categorySales = new Map<string, number>();
    for (const order of currentOrders) {
      if (!order.menuItemId) continue;
      currentSales.set(order.menuItemId, (currentSales.get(order.menuItemId) ?? 0) + order.quantity);
      const item = itemMap.get(order.menuItemId);
      if (item) categorySales.set(item.category, (categorySales.get(item.category) ?? 0) + order.quantity);
    }
    for (const order of previousOrders) {
      if (order.menuItemId) previousSales.set(order.menuItemId, (previousSales.get(order.menuItemId) ?? 0) + order.quantity);
    }

    const palette = ["#f47b16", "#ff9b3d", "#ffbb7b", "#ffd2ad", "#e6e3e0"];
    const categories = [...new Set(data.menuItems.map((item) => item.category))];
    const totalCategorySales = [...categorySales.values()].reduce((sum, count) => sum + count, 0);
    const menuItems = data.menuItems.map((item, index) => {
      const itemRatings = ratings.get(item.id) ?? [];
      const average = itemRatings.length ? itemRatings.reduce((sum, rating) => sum + rating, 0) / itemRatings.length : null;
      const toneNames = ["warm", "olive", "gold", "rose", "green", "chocolate"];
      return {
        ...item,
        orders: currentSales.get(item.id) ?? 0,
        change: percentChange(currentSales.get(item.id) ?? 0, previousSales.get(item.id) ?? 0),
        margin: item.priceCents ? percent(((item.priceCents - item.costCents) / item.priceCents) * 100) : "—",
        rating: average === null ? "—" : number(average, 1),
        position: "50% 50%",
        tone: toneNames[index % toneNames.length],
      };
    });
    const totalRevenue = currentOrders.reduce((sum, order) => sum + order.revenueCents, 0);
    const totalQuantity = currentOrders.reduce((sum, order) => sum + order.quantity, 0);
    const totalUnitsRevenue = currentOrders.reduce((sum, order) => sum + order.revenueCents, 0);
    const totalCosts = currentOrders.reduce((sum, order) => {
      const item = order.menuItemId ? itemMap.get(order.menuItemId) : null;
      return sum + (item ? item.costCents * order.quantity : 0);
    }, 0);
    const ratingValues = data.reviews.map((review) => review.rating);
    const avgRating = ratingValues.length ? ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length : null;
    const averageMargin = totalUnitsRevenue ? ((totalUnitsRevenue - totalCosts) / totalUnitsRevenue) * 100 : null;
    const weekdayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const menuSalesByDay = weekdayNames.map((day, weekday) => ({
      day,
      current: currentOrders
        .filter((order) => order.orderedAt.getDay() === weekday)
        .reduce((sum, order) => sum + order.quantity, 0),
      previous: previousOrders
        .filter((order) => order.orderedAt.getDay() === weekday)
        .reduce((sum, order) => sum + order.quantity, 0),
    }));
    const bestSeller = [...menuItems].sort((a, b) => b.orders - a.orders)[0];
    const lowMargin = [...menuItems]
      .filter((item) => item.priceCents > 0)
      .sort((a, b) => a.priceCents - a.costCents - (b.priceCents - b.costCents))[0];
    const menuInsights: MenuReadModel["menuInsights"] = [];
    if (bestSeller && bestSeller.orders > 0) {
      menuInsights.push({
        id: bestSeller.id,
        title: `${bestSeller.name} é seu item mais vendido`,
        description: `${bestSeller.orders} unidade(s) registradas nesta semana.`,
        icon: "up",
        tone: "green",
      });
    }
    if (lowMargin && lowMargin.priceCents > 0 && (lowMargin.priceCents - lowMargin.costCents) / lowMargin.priceCents < 0.3) {
      menuInsights.push({
        id: lowMargin.id,
        title: `Confira a margem de ${lowMargin.name}`,
        description: `Margem cadastrada de ${lowMargin.margin}.`,
        icon: "target",
        tone: "orange",
      });
    }

    return {
      restaurantId: data.restaurant?.id ?? null,
      menuMetrics: [
        { label: "Itens vendidos", value: number(totalQuantity), change: percentChange(totalQuantity, previousOrders.reduce((sum, order) => sum + order.quantity, 0)), context: "unidades nesta semana", icon: "cloche" },
        { label: "Receita do cardápio", value: money(totalRevenue), change: percentChange(totalRevenue, previousOrders.reduce((sum, order) => sum + order.revenueCents, 0)), context: "vs. semana anterior", icon: "revenue" },
        { label: "Nota média dos pratos", value: avgRating === null ? "—" : number(avgRating, 1), change: "", context: `${ratingValues.length} avaliação(ões)`, icon: "rating" },
        { label: "Margem média", value: averageMargin === null ? "—" : percent(averageMargin), change: "", context: "sobre vendas registradas", icon: "margin" },
      ],
      menuItems,
      totalQuantity,
      menuCategories: categories.map((name, index) => ({
        name,
        value: totalCategorySales ? Math.round(((categorySales.get(name) ?? 0) / totalCategorySales) * 100) : 0,
        fill: palette[index % palette.length],
      })),
      menuSalesByDay,
      menuInsights,
    };
  }

  async getDiagnosticsData(restaurantId?: string): Promise<DiagnosticsReadModel> {
    const data = await this.getOperationalData(restaurantId);
    const avgPreparation = data.orders.length
      ? data.orders.reduce((sum, order) => sum + order.preparationMinutes, 0) / data.orders.length
      : null;
    const negativeReviews = data.reviews.filter((review) => review.sentiment === "Negativo");
    const negativeRate = data.reviews.length ? negativeReviews.length / data.reviews.length : 0;
    const lowMarginItems = data.menuItems.filter(
      (item) => item.priceCents > 0 && (item.priceCents - item.costCents) / item.priceCents < 0.3,
    );
    const factors = [] as DiagnosticsReadModel["operationalHealth"]["factors"];
    if (avgPreparation !== null) {
      factors.push({
        id: "preparation-time",
        label: "Tempo de preparo",
        icon: "clock",
        status: `${number(avgPreparation, 1)} min`,
        tone: avgPreparation > 22 ? "warning" : "positive",
      });
    }
    if (data.orders.length) {
      factors.push({
        id: "order-volume",
        label: "Pedidos registrados",
        icon: "chart",
        status: number(data.orders.length),
        tone: "attention",
      });
    }
    if (data.reviews.length) {
      factors.push({
        id: "customer-feedback",
        label: "Avaliações positivas",
        icon: "star",
        status: percent((1 - negativeRate) * 100),
        tone: negativeRate > 0.2 ? "warning" : "positive",
      });
    }
    const healthScore = data.orders.length || data.reviews.length
      ? Math.round(clamp(100 - Math.max(0, (avgPreparation ?? 15) - 15) * 2 - negativeRate * 40, 0, 100))
      : 0;
    const diagnostics: DiagnosticsReadModel["diagnostics"] = [];

    if (avgPreparation !== null && avgPreparation > 22) {
      diagnostics.push({
        id: "long-preparation-time",
        title: "Tempo de preparo acima da meta",
        description: `Média de ${number(avgPreparation, 1)} minutos nos ${data.orders.length} pedidos cadastrados.`,
        category: "operation",
        priority: avgPreparation > 30 ? "high" : "medium",
        icon: "clock",
        possibleFactors: ["order-volume", "preparation-time"],
        rootCauseSteps: [
          { id: "order-count", label: "Pedidos registrados", value: number(data.orders.length), description: "no período armazenado", icon: "chart", hint: "Volume de pedidos informado no cadastro." },
          { id: "prep-average", label: "Tempo de preparo", value: `${number(avgPreparation, 1)} min`, description: "média dos pedidos cadastrados", icon: "clock", hint: "Calculado a partir dos tempos registrados." },
        ],
        recommendations: [{ id: "reduce-preparation-time", title: "Rever etapas de preparo", description: "Compare os pedidos com maior tempo registrado e ajuste o fluxo da cozinha." }],
      });
    }
    if (negativeReviews.length) {
      diagnostics.push({
        id: "negative-customer-feedback",
        title: "Avaliações negativas precisam de retorno",
        description: `${negativeReviews.length} de ${data.reviews.length} avaliação(ões) receberam nota até 2.`,
        category: "customer",
        priority: negativeRate > 0.2 ? "high" : "medium",
        icon: "star",
        possibleFactors: ["customer-feedback"],
        rootCauseSteps: [
          { id: "review-count", label: "Avaliações recebidas", value: number(data.reviews.length), description: "cadastradas no sistema", icon: "chart", hint: "Total de avaliações registradas." },
          { id: "negative-count", label: "Notas até 2", value: number(negativeReviews.length), description: "avaliação(ões) negativas", icon: "star", hint: "Classificação baseada na nota informada." },
        ],
        recommendations: [{ id: "review-follow-up", title: "Responder aos clientes", description: "Registre o retorno e acompanhe os motivos descritos nos comentários." }],
      });
    }
    if (lowMarginItems.length) {
      const item = lowMarginItems[0];
      const margin = ((item.priceCents - item.costCents) / item.priceCents) * 100;
      diagnostics.push({
        id: "low-menu-margin",
        title: "Item com margem reduzida",
        description: `${item.name} está com margem cadastrada de ${percent(margin)}.`,
        category: "menu",
        priority: margin < 15 ? "high" : "low",
        icon: "menu",
        possibleFactors: ["menu-cost", "menu-price"],
        rootCauseSteps: [
          { id: "menu-price", label: "Preço de venda", value: money(item.priceCents), description: item.name, icon: "menu", hint: "Preço cadastrado para o item." },
          { id: "menu-cost", label: "Custo informado", value: money(item.costCents), description: "custo unitário cadastrado", icon: "package", hint: "Custo informado no cadastro do cardápio." },
          { id: "menu-margin", label: "Margem calculada", value: percent(margin), description: "sobre o preço de venda", icon: "chart", hint: "Calculada a partir do custo e do preço cadastrados." },
        ],
        recommendations: [{ id: "menu-margin-review", title: "Revisar preço ou custo", description: `Confira os valores cadastrados para ${item.name}.` }],
      });
    }

    return {
      restaurantId: data.restaurant?.id ?? null,
      operationalHealth: {
        score: healthScore,
        change: "—",
        summary: healthScore
          ? "Indicador calculado a partir dos pedidos e avaliações cadastrados."
          : "Cadastre pedidos e avaliações para calcular a saúde operacional.",
        factors,
      },
      diagnostics,
    };
  }

  async getReviews(restaurantId?: string): Promise<ReviewView[]> {
    const data = await this.getOperationalData(restaurantId);
    return data.reviews;
  }

  async getSimulationData(restaurantId?: string): Promise<SimulationReadModel> {
    const data = await this.getOperationalData(restaurantId);
    const restaurant = data.restaurant;
    const buckets = new Map<number, { preparationTotal: number; orderCount: number }>();
    const observedHours = new Map<string, number>();

    for (const order of data.orders) {
      const hour = order.orderedAt.getHours();
      const bucket = buckets.get(hour) ?? { preparationTotal: 0, orderCount: 0 };
      bucket.preparationTotal += order.preparationMinutes;
      bucket.orderCount += 1;
      buckets.set(hour, bucket);
      const dateHour = `${order.orderedAt.toDateString()}-${hour}`;
      observedHours.set(dateHour, (observedHours.get(dateHour) ?? 0) + 1);
    }

    const hourlyPreparation = [...buckets.entries()]
      .sort(([left], [right]) => left - right)
      .map(([hour, bucket]) => ({
        hour: `${String(hour).padStart(2, "0")}h`,
        current: Number((bucket.preparationTotal / bucket.orderCount).toFixed(1)),
      }));
    const averagePreparation = data.orders.length
      ? data.orders.reduce((sum, order) => sum + order.preparationMinutes, 0) / data.orders.length
      : 0;
    const peakPreparation = hourlyPreparation.length
      ? Math.max(...hourlyPreparation.map((item) => item.current))
      : 0;
    const averageOrdersPerHour = observedHours.size
      ? [...observedHours.values()].reduce((sum, count) => sum + count, 0) / observedHours.size
      : 0;
    const reviews = data.reviews;
    const averageRating = reviews.length
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : null;
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekRevenue = data.orders
      .filter((order) => order.orderedAt >= weekStart)
      .reduce((sum, order) => sum + order.revenueCents, 0);
    const baselineInputs: SimulationInputs = {
      teamSize: restaurant?.teamSize ?? 1,
      ordersPerHour: Number(averageOrdersPerHour.toFixed(1)),
      prepMinutes: Number(averagePreparation.toFixed(1)),
      demandIncrease: 0,
      optimizedDishes: 0,
      marginIncrease: 0,
      stationsReinforced: restaurant?.stations ?? 1,
      teamExperience: restaurant?.teamExperience ?? 0,
    };

    return {
      restaurantId: restaurant?.id ?? null,
      hasOrders: data.orders.length > 0,
      baselineInputs,
      baselineResults: {
        preparationMinutes: Number(averagePreparation.toFixed(1)),
        peakPreparationMinutes: Number(peakPreparation.toFixed(1)),
        kitchenCapacity: Number(averageOrdersPerHour.toFixed(1)),
        customerSatisfaction: averageRating === null ? null : Number(averageRating.toFixed(1)),
        estimatedRevenue: weekRevenue > 0 ? Math.round(weekRevenue / 100) : null,
      },
      hourlyPreparation,
    };
  }

  async createMenuItem(input: NewMenuItem) {
    await this.requireRestaurant(input.restaurantId);
    return this.repository.createMenuItem(input);
  }

  async setMenuItemAvailability(id: string, available: boolean) {
    const restaurant = await this.requireSelectedRestaurant();
    await this.repository.setMenuItemAvailability(id, restaurant.id, available);
  }

  async deleteMenuItem(id: string) {
    const restaurant = await this.requireSelectedRestaurant();
    await this.repository.deleteMenuItem(id, restaurant.id);
  }

  async createOrder(input: NewOrder) {
    await this.requireRestaurant(input.restaurantId);
    if (input.menuItemId) {
      const items = await this.repository.getMenuItems(input.restaurantId);
      if (!items.some((item) => item.id === input.menuItemId)) {
        throw new Error("O item selecionado não pertence a este restaurante.");
      }
    }
    return this.repository.createOrder(input);
  }

  async deleteOrder(id: string) {
    const restaurant = await this.requireSelectedRestaurant();
    await this.repository.deleteOrder(id, restaurant.id);
  }

  async createReview(input: NewCustomerReview) {
    await this.requireRestaurant(input.restaurantId);
    if (input.menuItemId) {
      const items = await this.repository.getMenuItems(input.restaurantId);
      if (!items.some((item) => item.id === input.menuItemId)) {
        throw new Error("O item selecionado não pertence a este restaurante.");
      }
    }
    return this.repository.createReview(input);
  }

  async setReviewAnswered(id: string, answered: boolean) {
    const restaurant = await this.requireSelectedRestaurant();
    await this.repository.setReviewAnswered(id, restaurant.id, answered);
  }

  async deleteReview(id: string) {
    const restaurant = await this.requireSelectedRestaurant();
    await this.repository.deleteReview(id, restaurant.id);
  }

  private async requireSelectedRestaurant(): Promise<Restaurant> {
    const restaurant = await this.repository.getSelectedRestaurant();
    if (!restaurant) throw new Error("Cadastre e selecione um restaurante primeiro.");
    return restaurant;
  }

  private async requireRestaurant(id: string): Promise<Restaurant> {
    const restaurant = await this.repository.getRestaurant(id);
    if (!restaurant) throw new Error("Restaurante não encontrado.");
    return restaurant;
  }
}
