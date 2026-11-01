"use client";

import { useMemo, useState } from "react";

import { Icon } from "@/components/ui/icon";

import { Button } from "@/components/ui/button";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import type { DashboardReadModel } from "@server/application/read-models";

import { Area, AreaChart, CartesianGrid, ReferenceDot, ReferenceLine, XAxis, YAxis } from "recharts";

import { orderChartConfig } from "../widgets.shared";

export function OrdersChart({ period, ordersByPeriod }: { period: string; ordersByPeriod: DashboardReadModel["ordersByPeriod"] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAverage, setShowAverage] = useState(true);
  const chartData = useMemo(() => ordersByPeriod[period] ?? [], [ordersByPeriod, period]);
  const average = chartData.length
    ? Math.round(chartData.reduce((total, point) => total + point.orders, 0) / chartData.length)
    : 0;
  const peak = chartData.reduce((highest, point) => point.orders > highest.orders ? point : highest, chartData[0] ?? { hour: "", orders: 0 });
  const chartMaximum = Math.max(10, Math.ceil(Math.max(...chartData.map((point) => point.orders), 0) / 10) * 10);

  function downloadData() {
    const csv = ["horario,pedidos", ...chartData.map(({ hour, orders }) => `${hour},${orders}`)].join("\n");
    const file = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mesa-pedidos-por-horario.csv";
    link.click();
    URL.revokeObjectURL(url);
    setMenuOpen(false);
  }

  return (
    <Card className="surface chart-card">
      <CardHeader className="card-heading chart-heading">
        <div>
          <CardTitle>Pedidos por horário</CardTitle>
          <p className="card-subtitle">Distribuição média ao longo do dia</p>
        </div>
        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger
            render={<Button variant="ghost" size="icon" className="icon-button quiet-button" aria-label="Opções do gráfico" />}
          >
            <Icon name="more" size={19} />
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="popover chart-popover">
            <Button className="popover-action" variant="ghost" onClick={() => setShowAverage((shown) => !shown)}>
              <span className={`toggle-dot${showAverage ? " on" : ""}`} />
              {showAverage ? "Ocultar" : "Mostrar"} referência da média
            </Button>
            <Button className="popover-action" variant="ghost" onClick={downloadData}>
              <Icon name="download" size={16} /> Baixar dados CSV
            </Button>
            <span className="popover-note">Dados cadastrados neste restaurante</span>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <div className="chart-content">
        <div className="chart-plot-wrap">
          {chartData.length === 0 ? <p className="chart-empty">Cadastre pedidos para visualizar a distribuição por horário.</p> : <ChartContainer className="orders-chart" config={orderChartConfig}>
            <AreaChart accessibilityLayer data={chartData} margin={{ top: 10, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="orders-area-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity=".22" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity=".015" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#efeeeb" />
              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                tickMargin={7}
                interval={0}
                tick={{ fill: "#77746f", fontSize: 10 }}
              />
              <YAxis
                domain={[0, chartMaximum]}
                ticks={Array.from({ length: 5 }, (_, index) => Math.round((chartMaximum / 4) * index))}
                tickLine={false}
                axisLine={false}
                tickMargin={5}
                width={28}
                tick={{ fill: "#77746f", fontSize: 10 }}
              />
              <ChartTooltip
                cursor={{ stroke: "#f79450", strokeDasharray: "4 4" }}
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => String(label)}
                    formatter={(value) => {
                      const count = Number(value);
                      const change = average ? Math.round(((count - average) / average) * 100) : 0;
                      return average ? `${count} pedido(s) · ${change >= 0 ? "+" : ""}${change}% vs. média` : `${count} pedido(s)`;
                    }}
                  />
                }
              />
              {showAverage && average > 0 && (
                <ReferenceLine y={average} stroke="#bbb7b0" strokeDasharray="4 5" />
              )}
              <Area
                type="monotone"
                dataKey="orders"
                stroke="var(--color-orders)"
                strokeWidth={2.5}
                fill="url(#orders-area-gradient)"
                activeDot={{ r: 5, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }}
                isAnimationActive={false}
              />
              <ReferenceLine x={peak.hour} stroke="#f79450" strokeDasharray="4 4" />
              <ReferenceDot x={peak.hour} y={peak.orders} r={6.5} fill="#f97316" stroke="#fff" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>}
        </div>
      </div>
      <div className="chart-footnote">
        <span className="legend-line" /> Pedidos por hora
        {showAverage && average > 0 && <span className="average-legend">— média do período</span>}
      </div>
    </Card>
  );
}
