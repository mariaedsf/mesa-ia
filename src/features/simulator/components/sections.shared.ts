import { estimateScenario } from "@/features/simulator/data";

export type SimulationResult = ReturnType<typeof estimateScenario>;
export type SimulationChartPoint = { hour: string; current: number; simulated: number };
export type ImpactBadge = { label: string; favorable: boolean };
