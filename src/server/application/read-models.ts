import type {
  CustomerReviewRecord,
  MenuItemRecord,
  OrderRecord,
  Restaurant,
} from "../domain/operational-records";
import type { SimulationInputs, SimulationResults } from "../domain/simulation";

export type SentimentLabel = "Positivo" | "Neutro" | "Negativo";

export type ReviewView = Omit<CustomerReviewRecord, "receivedAt" | "restaurantId"> & {
  item: string;
  date: string;
  timestamp: number;
  sentiment: SentimentLabel;
};

export type DashboardMetric = {
  label: string;
  value: string;
  change: string;
  direction: "up" | "down";
  context: string;
  icon: "cart" | "star" | "clock" | "coins";
};

export type DashboardRecommendation = {
  id: string;
  title: string;
  description: string;
  detail: string;
  impact: string;
};

export type DashboardInsight = {
  label: string;
  title: string;
  description: string;
};

export type DashboardAISummary = {
  positive: string;
  attention: string;
};

export type DashboardReadModel = {
  restaurantId: string | null;
  hasData: boolean;
  metrics: DashboardMetric[];
  ordersByPeriod: Record<string, { hour: string; orders: number }[]>;
  recommendations: DashboardRecommendation[];
  insights: DashboardInsight[];
  reviewThemes: { label: string; score: number }[];
  sentiments: { name: SentimentLabel; value: number; fill: string }[];
  reviews: ReviewView[];
  popularItems: { name: string; change: string; itemId: string }[];
  totalReviews: number;
};

export type MenuItemView = MenuItemRecord & {
  orders: number;
  change: string;
  margin: string;
  rating: string;
  position: string;
  tone: string;
};

export type MenuReadModel = {
  restaurantId: string | null;
  menuMetrics: {
    label: string;
    value: string;
    change: string;
    context: string;
    icon: "cloche" | "revenue" | "rating" | "margin";
  }[];
  menuItems: MenuItemView[];
  totalQuantity: number;
  menuCategories: { name: string; value: number; fill: string }[];
  menuSalesByDay: { day: string; current: number; previous: number }[];
  menuInsights: {
    id: string;
    title: string;
    description: string;
    icon: "up" | "target" | "down";
    tone: "green" | "orange" | "red";
  }[];
};

export type OperationalFactorView = {
  id: string;
  label: string;
  icon: "chart" | "team" | "clock" | "star" | "temperature" | "package" | "menu";
  status: string;
  tone: "warning" | "attention" | "positive";
};

export type RootCauseStepView = {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: OperationalFactorView["icon"];
  hint: string;
};

export type DiagnosticRecommendationView = {
  id: string;
  title: string;
  description: string;
};

export type DiagnosticView = {
  id: string;
  title: string;
  description: string;
  category: "operation" | "customer" | "menu";
  priority: "high" | "medium" | "low";
  icon: OperationalFactorView["icon"];
  possibleFactors: string[];
  rootCauseSteps: RootCauseStepView[];
  recommendations: DiagnosticRecommendationView[];
};

export type DiagnosticsReadModel = {
  restaurantId: string | null;
  operationalHealth: {
    score: number;
    change: string;
    summary: string;
    factors: OperationalFactorView[];
  };
  diagnostics: DiagnosticView[];
};

export type OperationalDataReadModel = {
  restaurant: Restaurant | null;
  menuItems: MenuItemRecord[];
  orders: OrderRecord[];
  reviews: ReviewView[];
};

export type SimulationReadModel = {
  restaurantId: string | null;
  hasOrders: boolean;
  baselineInputs: SimulationInputs;
  baselineResults: SimulationResults;
  hourlyPreparation: { hour: string; current: number }[];
};
