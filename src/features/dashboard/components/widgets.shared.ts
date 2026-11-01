import type { ChartConfig } from "@/components/ui/chart";
import type { SentimentLabel } from "@server/application/read-models";

export const orderChartConfig = {
  orders: { label: "Pedidos", color: "#f97316" },
} satisfies ChartConfig;

export const sentimentChartConfig = {
  positive: { label: "Positivo", color: "#31a256" },
  neutral: { label: "Neutro", color: "#d6d5d1" },
  negative: { label: "Negativo", color: "#ed7272" },
} satisfies ChartConfig;

export const sentimentDotClass: Record<SentimentLabel, string> = {
  Positivo: "positive-dot",
  Neutro: "neutral-dot",
  Negativo: "negative-dot",
};
