import { CalendarDays, ChefHat, ChartNoAxesColumnIncreasing, Clock3, Coins, ShoppingBasket, Star, Utensils, UsersRound, Zap, type LucideIcon } from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";
import type { ScenarioArea, SimulationInputs } from "@/features/simulator/data";
export const periods = ["Hoje", "Últimos 7 dias", "Esta semana", "Últimos 30 dias"];

export const areas: { id: ScenarioArea; label: string; icon: LucideIcon }[] = [
  { id: "operation", label: "Operação", icon: ChefHat },
  { id: "demand", label: "Demanda", icon: ChartNoAxesColumnIncreasing },
  { id: "menu", label: "Cardápio", icon: Utensils },
  { id: "team", label: "Equipe", icon: UsersRound },
];

export type InputKey = keyof SimulationInputs;
export type SliderDefinition = {
  key: InputKey;
  label: string;
  icon: LucideIcon;
  min: number;
  max: number;
  step?: number;
};

export const areaControls: Record<ScenarioArea, SliderDefinition[]> = {
  operation: [
    { key: "teamSize", label: "Pessoas na cozinha", icon: UsersRound, min: 1, max: 200 },
    { key: "ordersPerHour", label: "Pedidos por hora", icon: ShoppingBasket, min: 0, max: 1000 },
    { key: "prepMinutes", label: "Tempo médio de preparo", icon: Clock3, min: 0, max: 600 },
  ],
  demand: [
    { key: "ordersPerHour", label: "Pedidos por hora", icon: ShoppingBasket, min: 0, max: 1000 },
    { key: "demandIncrease", label: "Aumento no horário de pico", icon: ChartNoAxesColumnIncreasing, min: 0, max: 100 },
    { key: "teamSize", label: "Pessoas disponíveis", icon: UsersRound, min: 1, max: 200 },
  ],
  menu: [
    { key: "optimizedDishes", label: "Pratos otimizados", icon: Utensils, min: 0, max: 100 },
    { key: "marginIncrease", label: "Aumento de margem", icon: Coins, min: 0, max: 100 },
    { key: "prepMinutes", label: "Tempo médio de preparo", icon: Clock3, min: 0, max: 600 },
  ],
  team: [
    { key: "teamSize", label: "Pessoas na cozinha", icon: UsersRound, min: 1, max: 200 },
    { key: "stationsReinforced", label: "Estações de trabalho", icon: ChefHat, min: 1, max: 100 },
    { key: "teamExperience", label: "Experiência da equipe", icon: Star, min: 0, max: 100, step: 5 },
  ],
};

export const chartConfig = {
  current: { label: "Atual", color: "#cbc7c4" },
  simulated: { label: "Simulado", color: "#f97316" },
} satisfies ChartConfig;

export const presetIcons: Record<string, LucideIcon> = {
  "extra-staff": UsersRound,
  "prep-ahead": Zap,
  "demand-peak": CalendarDays,
  "menu-adjustment": ChefHat,
};

export function formatNumber(value: number, decimals = 0) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value).replace(/\u00a0/g, " ");
}

export function formatControlValue(key: InputKey, value: number) {
  if (key === "prepMinutes") return value + " min";
  if (key === "demandIncrease" || key === "marginIncrease") return "+" + value + "%";
  if (key === "optimizedDishes") return value + (value === 1 ? " prato" : " pratos");
  if (key === "stationsReinforced") return value + (value === 1 ? " estação" : " estações");
  if (key === "teamExperience") return value + "%";
  return String(value);
}

export function percentChange(current: number, projected: number, decimals = 0) {
  if (!current) return "0%";
  const delta = ((projected - current) / current) * 100;
  const sign = delta > 0 ? "+" : delta < 0 ? "−" : "";
  return sign + formatNumber(Math.abs(delta), decimals) + "%";
}

export function formatSigned(value: number, decimals = 0) {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return sign + formatNumber(Math.abs(value), decimals);
}

export function formatSignedCurrency(value: number) {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return sign + formatCurrency(Math.abs(value));
}

export function joinPhrases(phrases: string[]) {
  if (phrases.length < 2) return phrases[0] ?? "";
  if (phrases.length === 2) return phrases[0] + " e " + phrases[1];
  return phrases.slice(0, -1).join(", ") + " e " + phrases[phrases.length - 1];
}
