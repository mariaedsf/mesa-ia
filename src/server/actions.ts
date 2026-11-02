"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { appStateService, operationalDataService } from "./container";
import { actionStatuses } from "./domain/action-plan";
import { estimateScenario } from "./domain/simulation";
import { generateDashboardSummary } from "./infrastructure/openai-dashboard-summary";
import { generateReviewReply } from "./infrastructure/openai-review-reply";

const idSchema = z.string().trim().min(1).max(100);
const nameSchema = z.string().trim().min(2).max(100);
const formNumber = z.coerce.number();
const simulationSchema = z.object({
  teamSize: z.number().int().min(1).max(200),
  ordersPerHour: z.number().min(0).max(1000),
  prepMinutes: z.number().min(0).max(600),
  demandIncrease: z.number().min(0).max(100),
  optimizedDishes: z.number().int().min(0).max(100),
  marginIncrease: z.number().min(0).max(100),
  stationsReinforced: z.number().int().min(1).max(100),
  teamExperience: z.number().min(0).max(100),
});

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function selectRestaurantAction(id: string) {
  await operationalDataService.selectRestaurant(idSchema.parse(id));
  revalidatePath("/", "layout");
}

export async function createRestaurantAction(formData: FormData) {
  const input = z.object({
    name: nameSchema,
    teamSize: formNumber.int().min(1).max(200),
    stations: formNumber.int().min(1).max(100),
    teamExperience: formNumber.int().min(0).max(100),
  }).parse({
    name: readText(formData, "name"),
    teamSize: formData.get("teamSize"),
    stations: formData.get("stations"),
    teamExperience: formData.get("teamExperience"),
  });

  await operationalDataService.createRestaurant(input);
  revalidatePath("/", "layout");
  revalidatePath("/dados");
}

export async function createMenuItemAction(formData: FormData) {
  const restaurant = await operationalDataService.getSelectedRestaurant();
  if (!restaurant) throw new Error("Cadastre e selecione um restaurante primeiro.");

  const input = z.object({
    name: nameSchema,
    category: z.string().trim().min(2).max(60),
    price: formNumber.positive().max(100000),
    cost: formNumber.min(0).max(100000),
  }).parse({
    name: readText(formData, "name"),
    category: readText(formData, "category"),
    price: formData.get("price"),
    cost: formData.get("cost"),
  });
  if (input.cost >= input.price) throw new Error("O custo precisa ser menor que o preço.");

  await operationalDataService.createMenuItem({
    restaurantId: restaurant.id,
    name: input.name,
    category: input.category,
    priceCents: Math.round(input.price * 100),
    costCents: Math.round(input.cost * 100),
  });
  revalidatePath("/dados");
  revalidatePath("/cardapio");
  revalidatePath("/");
}

export async function setMenuItemAvailabilityAction(id: string, available: boolean) {
  await operationalDataService.setMenuItemAvailability(
    idSchema.parse(id),
    z.boolean().parse(available),
  );
  revalidatePath("/cardapio");
  revalidatePath("/dados");
}

export async function deleteMenuItemAction(id: string) {
  await operationalDataService.deleteMenuItem(idSchema.parse(id));
  revalidatePath("/dados");
  revalidatePath("/cardapio");
}

export async function createOrderAction(formData: FormData) {
  const restaurant = await operationalDataService.getSelectedRestaurant();
  if (!restaurant) throw new Error("Cadastre e selecione um restaurante primeiro.");

  const input = z.object({
    menuItemId: z.string().optional(),
    quantity: formNumber.int().min(1).max(1000),
    orderedAt: z.string().min(1),
    revenue: formNumber.min(0).max(1000000),
    preparationMinutes: formNumber.min(0).max(600),
  }).parse({
    menuItemId: readText(formData, "menuItemId"),
    quantity: formData.get("quantity"),
    orderedAt: readText(formData, "orderedAt"),
    revenue: formData.get("revenue"),
    preparationMinutes: formData.get("preparationMinutes"),
  });
  const orderedAt = new Date(input.orderedAt);
  if (Number.isNaN(orderedAt.getTime())) throw new Error("Data do pedido inválida.");

  let revenueCents = Math.round(input.revenue * 100);
  if (input.menuItemId) {
    const item = (await operationalDataService.getOperationalData(restaurant.id)).menuItems
      .find((menuItem) => menuItem.id === input.menuItemId);
    if (!item) throw new Error("O item selecionado não pertence a este restaurante.");
    revenueCents = item.priceCents * input.quantity;
  }

  await operationalDataService.createOrder({
    restaurantId: restaurant.id,
    menuItemId: input.menuItemId || null,
    quantity: input.quantity,
    orderedAt,
    revenueCents,
    preparationMinutes: input.preparationMinutes,
  });
  revalidateOperationalPages();
}

export async function deleteOrderAction(id: string) {
  await operationalDataService.deleteOrder(idSchema.parse(id));
  revalidateOperationalPages();
}

export async function createReviewAction(formData: FormData) {
  const restaurant = await operationalDataService.getSelectedRestaurant();
  if (!restaurant) throw new Error("Cadastre e selecione um restaurante primeiro.");

  const input = z.object({
    customer: z.string().trim().max(100).default(""),
    menuItemId: z.string().optional(),
    receivedAt: z.string().min(1),
    rating: formNumber.int().min(1).max(5),
    comment: z.string().trim().min(2).max(2000),
    channel: z.string().trim().min(2).max(60),
  }).parse({
    customer: readText(formData, "customer"),
    menuItemId: readText(formData, "menuItemId"),
    receivedAt: readText(formData, "receivedAt"),
    rating: formData.get("rating"),
    comment: readText(formData, "comment"),
    channel: readText(formData, "channel"),
  });
  const receivedAt = new Date(input.receivedAt);
  if (Number.isNaN(receivedAt.getTime())) throw new Error("Data da avaliação inválida.");

  await operationalDataService.createReview({
    restaurantId: restaurant.id,
    menuItemId: input.menuItemId || null,
    receivedAt,
    customer: input.customer || "Cliente",
    rating: input.rating,
    comment: input.comment,
    channel: input.channel,
  });
  revalidateOperationalPages();
}

export async function setReviewAnsweredAction(id: string, answered: boolean) {
  await operationalDataService.setReviewAnswered(
    idSchema.parse(id),
    z.boolean().parse(answered),
  );
  revalidatePath("/avaliacoes");
}

export async function generateReviewResponseAction(id: string) {
  const reviewId = idSchema.parse(id);
  const restaurant = await operationalDataService.getSelectedRestaurant();
  if (!restaurant) throw new Error("Nenhum restaurante selecionado.");

  const review = (await operationalDataService.getReviews(restaurant.id))
    .find((item) => item.id === reviewId);
  if (!review) throw new Error("Avaliação não encontrada para o restaurante selecionado.");

  try {
    const draft = await generateReviewReply({
      rating: review.rating,
      item: review.item,
      comment: review.comment.slice(0, 600),
    });
    return { draft };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Não foi possível gerar a resposta.",
    };
  }
}

export async function generateDashboardSummaryAction() {
  try {
    const data = await operationalDataService.getDashboardData();
    const summary = await generateDashboardSummary(data);
    return { summary };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Não foi possível gerar o resumo da operação.",
    };
  }
}

export async function deleteReviewAction(id: string) {
  await operationalDataService.deleteReview(idSchema.parse(id));
  revalidateOperationalPages();
}

export async function setRecommendationCompletedAction(
  value: string,
  completed: boolean,
) {
  const recommendationId = idSchema.parse(value);
  const dashboard = await operationalDataService.getDashboardData();
  if (!dashboard.recommendations.some((recommendation) => recommendation.id === recommendationId)) {
    throw new Error("Recomendação não encontrada para os dados atuais.");
  }
  if (!dashboard.restaurantId) throw new Error("Nenhum restaurante selecionado.");
  await appStateService.setRecommendationCompleted(
    dashboard.restaurantId,
    recommendationId,
    z.boolean().parse(completed),
  );
  revalidatePath("/");
}

export async function setActionStatusAction(value: string, state: string) {
  const actionId = idSchema.parse(value);
  const status = z.enum(actionStatuses).parse(state);
  const restaurant = await operationalDataService.getSelectedRestaurant();
  if (!restaurant) throw new Error("Nenhum restaurante selecionado.");
  await appStateService.setActionStatus(restaurant.id, actionId, status);
  revalidatePath("/planos-de-acao");
}

export async function addDiagnosticRecommendationAction(value: string) {
  const recommendationId = idSchema.parse(value);
  const diagnostics = await operationalDataService.getDiagnosticsData();
  if (!diagnostics.restaurantId) throw new Error("Nenhum restaurante selecionado.");
  const recommendation = diagnostics.diagnostics
    .flatMap((diagnostic) => diagnostic.recommendations)
    .find(({ id }) => id === recommendationId);
  if (!recommendation) throw new Error("Recomendação não encontrada para os dados atuais.");

  const added = await appStateService.addDiagnosticRecommendation(diagnostics.restaurantId, recommendation);
  revalidatePath("/diagnosticos");
  revalidatePath("/planos-de-acao");
  return { added };
}

export async function saveSimulationAction(value: unknown) {
  const inputs = simulationSchema.parse(value);
  const baseline = await operationalDataService.getSimulationData();
  if (!baseline.restaurantId || !baseline.hasOrders) throw new Error("Registre pedidos antes de salvar uma simulação.");
  const results = estimateScenario(inputs, baseline.baselineInputs, baseline.baselineResults);
  await appStateService.saveSimulation(baseline.restaurantId, inputs, results);
  revalidatePath("/simulador");
  revalidatePath("/planos-de-acao");
  return { saved: true };
}

function revalidateOperationalPages() {
  revalidatePath("/", "layout");
  revalidatePath("/dados");
  revalidatePath("/cardapio");
  revalidatePath("/avaliacoes");
  revalidatePath("/diagnosticos");
}
