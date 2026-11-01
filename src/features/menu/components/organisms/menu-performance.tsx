"use client";

import { menuClassName } from "../../tailwind-styles";

import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronRight, CircleDollarSign, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { useMenuData } from "@/features/menu/menu-data-context";

import { MenuItem, MenuInsight } from "../menu.shared";

import { MenuItemRow } from "../molecules/menu-item-row";

import { CategoryPerformance } from "./category-performance";

import { MenuSalesChart } from "./menu-sales-chart";

export function MenuPerformance({ onSelectItem, onViewAll, onSelectInsight }: { onSelectItem: (item: MenuItem) => void; onViewAll: () => void; onSelectInsight: (insight: MenuInsight) => void }) {
  const { menuInsights, menuItems } = useMenuData();
  return (
    <div className={menuClassName("menu-content-grid")}>
      <Card className={menuClassName("surface menu-panel menu-sellers-card")}>
        <CardHeader className={menuClassName("card-heading")}><CardTitle>Mais vendidos</CardTitle><Button className={menuClassName("text-link")} variant="ghost" onClick={onViewAll}>Ver todos <ArrowRight size={15} /></Button></CardHeader>
        <div className={menuClassName("menu-sellers-list")}>
          {menuItems.slice(0, 5).map((item, index) => <MenuItemRow key={item.id} item={item} index={index} onSelect={onSelectItem} />)}
          {menuItems.length === 0 && <p className={menuClassName("menu-empty")}>Cadastre itens e pedidos para acompanhar os mais vendidos.</p>}
        </div>
      </Card>
      <CategoryPerformance />
      <MenuSalesChart />
      <Card className={menuClassName("surface menu-panel menu-insights-card")}>
        <CardHeader className={menuClassName("card-heading")}><CardTitle>Insights do cardápio <Sparkles size={17} className={menuClassName("menu-insights-sparkle")} aria-hidden="true" /></CardTitle></CardHeader>
        <div className={menuClassName("menu-insights-list")}>
          {menuInsights.map((insight) => {
            const InsightIcon = insight.icon === "up" ? ArrowUpRight : insight.icon === "down" ? ArrowDownRight : CircleDollarSign;
            return (
              <button className={menuClassName("menu-insight-row")} key={insight.id} type="button" onClick={() => onSelectInsight(insight)}>
                <span className={menuClassName(`menu-insight-icon ${insight.tone}`)}><InsightIcon size={20} strokeWidth={2} aria-hidden="true" /></span>
                <span className={menuClassName("menu-insight-copy")}><strong>{insight.title}</strong><small>{insight.description}</small></span>
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            );
          })}
        </div>
        {menuInsights[0] && <Button className={menuClassName("menu-ai-button")} onClick={() => onSelectInsight(menuInsights[0])}><Sparkles size={19} aria-hidden="true" />Ver primeira sugestão</Button>}
      </Card>
    </div>
  );
}
