import { ChartNoAxesColumnIncreasing, Clock3, Coins, Info, Star } from "lucide-react";

import { Area, AreaChart, CartesianGrid, ReferenceDot, ReferenceLine, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { chartConfig, formatCurrency, formatNumber } from "../simulator.shared";
import { MetricComparison } from "../molecules/metric-comparison";

import type { SimulationResult, SimulationChartPoint } from "../sections.shared";
import type { SimulationResults } from "@server/domain/simulation";

export function SimulatorResultsCard({ results, baselineResults, chartData, chartMax, chartTicks, selectedPoint, gradientId }: { results: SimulationResult; baselineResults: SimulationResults; chartData: SimulationChartPoint[]; chartMax: number; chartTicks: number[]; selectedPoint: SimulationChartPoint; gradientId: string }) {
  const display = (value: number | null, decimals = 0) => value === null ? "—" : formatNumber(value, decimals);
  const displayCurrency = (value: number | null) => value === null ? "—" : formatCurrency(value);
  return <Card className="surface simulator-card simulator-comparison">
    <div className="simulator-card-header simulator-comparison-heading"><div><h2>Comparativo de resultados</h2><p>Impacto estimado do cenário simulado em relação à operação atual.</p></div><div className="simulator-legend"><span><i className="simulator-legend-current" /> Atual</span><span><i className="simulator-legend-simulated" /> Simulado</span></div></div>
    <div className="simulator-metrics">
      <MetricComparison icon={Clock3} label="Tempo de preparo" current={formatNumber(baselineResults.preparationMinutes, 1) + " min"} projected={formatNumber(results.preparationMinutes, 1) + " min"} currentValue={baselineResults.preparationMinutes} projectedValue={results.preparationMinutes} lowerIsBetter />
      <MetricComparison icon={Star} label="Satisfação" current={display(baselineResults.customerSatisfaction, 1)} projected={display(results.customerSatisfaction, 1)} currentValue={baselineResults.customerSatisfaction} projectedValue={results.customerSatisfaction} />
      <MetricComparison icon={Coins} label="Capacidade/h" current={formatNumber(baselineResults.kitchenCapacity)} projected={formatNumber(results.kitchenCapacity)} currentValue={baselineResults.kitchenCapacity} projectedValue={results.kitchenCapacity} />
      <MetricComparison icon={ChartNoAxesColumnIncreasing} label="Receita estimada" current={displayCurrency(baselineResults.estimatedRevenue)} projected={displayCurrency(results.estimatedRevenue)} currentValue={baselineResults.estimatedRevenue} projectedValue={results.estimatedRevenue} decimals={1} />
    </div>
    <div className="simulator-chart-card"><div className="simulator-chart-heading"><div><h3>Tempo de preparo por horário</h3><p><Info size={14} aria-hidden="true" /> Média calculada a partir dos pedidos registrados.</p></div></div>
      <div className="simulator-chart-plot"><ChartContainer className="simulator-line-chart" config={chartConfig} initialDimension={{ width: 600, height: 242 }} role="img" aria-label="Comparativo do tempo de preparo por horário registrado">
        <AreaChart accessibilityLayer data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}><defs><linearGradient id={gradientId + "-current"} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#c9c5c2" stopOpacity=".19" /><stop offset="100%" stopColor="#c9c5c2" stopOpacity=".015" /></linearGradient><linearGradient id={gradientId + "-simulated"} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity=".2" /><stop offset="100%" stopColor="#f97316" stopOpacity=".015" /></linearGradient></defs>
          <CartesianGrid vertical={false} stroke="#efeeeb" /><XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} interval={0} tick={{ fill: "#77746f", fontSize: 11 }} /><YAxis domain={[0, chartMax]} ticks={chartTicks} tickLine={false} axisLine={false} tickMargin={6} width={34} tick={{ fill: "#77746f", fontSize: 11 }} />
          <ChartTooltip cursor={{ stroke: "#c9c5c2", strokeDasharray: "4 4" }} content={<ChartTooltipContent labelFormatter={(label) => String(label)} formatter={(value) => Number(value).toLocaleString("pt-BR") + " min"} />} />
          <Area type="monotone" dataKey="current" stroke="var(--color-current)" strokeWidth={2.4} fill={"url(#" + gradientId + "-current)"} activeDot={{ r: 4, fill: "#cbc7c4", stroke: "#fff", strokeWidth: 2 }} isAnimationActive={false} />
          <Area type="monotone" dataKey="simulated" stroke="var(--color-simulated)" strokeWidth={2.6} fill={"url(#" + gradientId + "-simulated)"} activeDot={{ r: 5, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }} isAnimationActive={false} />
          <ReferenceLine x={selectedPoint.hour} stroke="#ef873c" strokeDasharray="4 4" /><ReferenceDot x={selectedPoint.hour} y={selectedPoint.current} r={5.5} fill="#cbc7c4" stroke="#fff" strokeWidth={2} /><ReferenceDot x={selectedPoint.hour} y={selectedPoint.simulated} r={6} fill="#f97316" stroke="#fff" strokeWidth={2} />
        </AreaChart>
      </ChartContainer></div>
      <div className="simulator-chart-legend"><span><i className="simulator-legend-current" /> Cenário atual</span><span><i className="simulator-legend-simulated" /> Cenário simulado</span></div>
    </div>
  </Card>;
}
