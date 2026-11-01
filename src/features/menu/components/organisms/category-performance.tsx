"use client";

import { menuClassName } from "../../tailwind-styles";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { useMenuData } from "@/features/menu/menu-data-context";

import { Pie, PieChart } from "recharts";

import { categoryConfig } from "../menu.shared";

export function CategoryPerformance() {
  const { menuCategories, totalQuantity } = useMenuData();
  return (
    <Card className={menuClassName("surface menu-panel menu-category-card")}>
      <CardHeader className={menuClassName("card-heading")}><CardTitle>Desempenho por categoria</CardTitle></CardHeader>
      <div className={menuClassName("menu-category-layout")}>
        <div className={menuClassName("menu-donut-wrap")}>
          <ChartContainer className={menuClassName("menu-donut-chart")} config={categoryConfig} initialDimension={{ width: 170, height: 170 }} role="img" aria-label="Pedidos por categoria">
            <PieChart>
              <Pie data={menuCategories} dataKey="value" nameKey="name" innerRadius={58} outerRadius={79} paddingAngle={1} stroke="#fff" strokeWidth={1} isAnimationActive={false} />
              <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${value}% dos pedidos`} />} />
            </PieChart>
          </ChartContainer>
          <div className={menuClassName("menu-donut-center")}><strong>{totalQuantity.toLocaleString("pt-BR")}</strong><span>unidades</span></div>
        </div>
        {menuCategories.length === 0 && <p className={menuClassName("menu-empty")}>Cadastre itens no cardápio para ver as categorias.</p>}
        <div className={menuClassName("menu-category-legend")}>
          {menuCategories.map((category) => (
            <div key={category.name}><i style={{ backgroundColor: category.fill }} /><span>{category.name}</span><strong>{category.value}%</strong></div>
          ))}
        </div>
      </div>
    </Card>
  );
}
