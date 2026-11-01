import { ChartNoAxesColumnIncreasing, Clock3, Package, Star, Thermometer, Utensils, UsersRound, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { type DiagnosticCategory, type DiagnosticPriority, type RootCauseIcon } from "@/features/diagnostics/data";

export type CategoryFilter = "all" | DiagnosticCategory;
export const iconMap: Record<RootCauseIcon, ComponentType<LucideProps>> = { chart: ChartNoAxesColumnIncreasing, team: UsersRound, clock: Clock3, star: Star, temperature: Thermometer, package: Package, menu: Utensils };
export const priorityLabels: Record<DiagnosticPriority, string> = { high: "Alta", medium: "Média", low: "Baixa" };
export const priorityDescriptions: Record<DiagnosticPriority, string> = { high: "Prioridade alta", medium: "Prioridade média", low: "Prioridade baixa" };
