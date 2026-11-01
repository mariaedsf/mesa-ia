import { Box, ChartNoAxesColumnIncreasing, ChefHat, CircleDollarSign, Layers3, SlidersHorizontal, Sparkles, Star, type LucideIcon } from "lucide-react";
import { type ChartConfig } from "@/components/ui/chart";
import type { MenuReadModel } from "@server/application/read-models";
import type { MenuTabId } from "@/features/menu/data";


export const periods = ["Hoje", "Esta semana", "Este mês"];
export const tabIcons: Record<MenuTabId, LucideIcon> = {
  performance: ChartNoAxesColumnIncreasing,
  items: Box,
  suggestions: Sparkles,
  management: SlidersHorizontal,
};
export const metricIcons: Record<MenuReadModel["menuMetrics"][number]["icon"], LucideIcon> = {
  cloche: ChefHat,
  revenue: CircleDollarSign,
  rating: Star,
  margin: Layers3,
};
export const salesConfig = {
  current: { label: "Atual", color: "#f97316" },
  previous: { label: "Semana anterior", color: "#c9c6c2" },
} satisfies ChartConfig;
export const categoryConfig = { value: { label: "Pedidos", color: "#f97316" } } satisfies ChartConfig;

export type MenuItem = MenuReadModel["menuItems"][number];
export type MenuInsight = MenuReadModel["menuInsights"][number];
