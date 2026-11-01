"use client";

import { menuClassName } from "../../tailwind-styles";

import { useId } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { useMenuData } from "@/features/menu/menu-data-context";

import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";

import { salesConfig } from "../menu.shared";

export function MenuSalesChart() {
  const { menuSalesByDay } = useMenuData();
  const hasSales = menuSalesByDay.some((point) => point.current > 0 || point.previous > 0);
  const id = useId().replace(/:/g, "");
  const currentGradient = `menu-sales-current-${id}`;
  return (
    <Card className={menuClassName("surface menu-panel menu-sales-card")}>
      <CardHeader className={menuClassName("menu-sales-heading")}>
        <CardTitle>Evolução de vendas</CardTitle>
        <div className={menuClassName("menu-chart-legend")}><span><i className={menuClassName("current")} />Atual</span><span><i />Semana anterior</span></div>
      </CardHeader>
      {!hasSales && <p className={menuClassName("menu-empty")}>Cadastre pedidos para visualizar a evolução das vendas.</p>}
      {hasSales && <ChartContainer className={menuClassName("menu-sales-chart")} config={salesConfig} initialDimension={{ width: 440, height: 220 }} role="img" aria-label="Evolução das vendas de pratos na semana">
        <AreaChart accessibilityLayer data={menuSalesByDay} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
          <defs><linearGradient id={currentGradient} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#fb801b" stopOpacity=".28" /><stop offset="100%" stopColor="#fb801b" stopOpacity=".015" /></linearGradient></defs>
          <CartesianGrid vertical={false} stroke="#efeeeb" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={7} tick={{ fill: "#696660", fontSize: 10 }} />
          <YAxis domain={[0, 250]} ticks={[0, 50, 100, 150, 200, 250]} axisLine={false} tickLine={false} tickMargin={5} width={31} tick={{ fill: "#77746f", fontSize: 10 }} />
          <ChartTooltip cursor={{ stroke: "#f79450", strokeDasharray: "4 4" }} content={<ChartTooltipContent labelFormatter={(label) => `${label}-feira`} formatter={(value) => `${value} pedidos`} />} />
          <ReferenceLine x="Sex" stroke="#f3a36a" strokeDasharray="4 4" />
          <Area type="monotone" dataKey="previous" stroke="#c9c6c2" strokeWidth={2} fill="transparent" activeDot={{ r: 4, fill: "#c9c6c2", stroke: "#fff", strokeWidth: 2 }} isAnimationActive={false} />
          <Area type="monotone" dataKey="current" stroke="#f97316" strokeWidth={2.5} fill={`url(#${currentGradient})`} activeDot={{ r: 5, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }} isAnimationActive={false} />
        </AreaChart>
      </ChartContainer>}
    </Card>
  );
}
