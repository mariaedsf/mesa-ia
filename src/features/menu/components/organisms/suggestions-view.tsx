"use client";

import { menuClassName } from "../../tailwind-styles";

import { ArrowDownRight, ArrowRight, ArrowUpRight, CircleDollarSign, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { useMenuData } from "@/features/menu/menu-data-context";

import { MenuInsight } from "../menu.shared";

export function SuggestionsView({ onSelectInsight }: { onSelectInsight: (insight: MenuInsight) => void }) {
  const { menuInsights } = useMenuData();
  return (
    <div className={menuClassName("menu-suggestions-view")}>
      <div className={menuClassName("menu-view-heading")}><span className={menuClassName("menu-view-icon")}><Sparkles size={20} /></span><div><h2>Sugestões</h2><p>Oportunidades calculadas a partir das vendas e margens cadastradas.</p></div></div>
      <div className={menuClassName("menu-suggestion-grid")}>
        {menuInsights.map((insight) => {
          const InsightIcon = insight.icon === "up" ? ArrowUpRight : insight.icon === "down" ? ArrowDownRight : CircleDollarSign;
          return <Card className={menuClassName("surface menu-suggestion-card")} key={insight.id}><span className={menuClassName(`menu-insight-icon ${insight.tone}`)}><InsightIcon size={21} /></span><div><span className={menuClassName("menu-suggestion-label")}>Oportunidade identificada</span><h3>{insight.title}</h3><p>{insight.description}</p><Button className={menuClassName("text-link")} variant="ghost" onClick={() => onSelectInsight(insight)}>Entender sugestão <ArrowRight size={14} /></Button></div></Card>;
        })}
      </div>
      {menuInsights.length === 0 && <p className={menuClassName("menu-empty")}>Cadastre vendas e custos no cardápio para gerar sugestões.</p>}
    </div>
  );
}
