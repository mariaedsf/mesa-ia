"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Icon } from "@/components/ui/icon";

import { Insight } from "../page-sections.shared";

export function DashboardInsightBanner({ insights, index, onChange, onOpenRecommendation }: { insights: Insight[]; index: number; onChange: (index: number) => void; onOpenRecommendation: () => void }) {
  const insight = insights[index];
  if (!insight) {
    return (
      <section className="insight-banner insight-banner-empty" aria-label="Dados operacionais">
        <div className="insight-content">
          <span className="insight-label"><Icon name="sparkle" size={15} /> Operação</span>
          <h2>Seus dados aparecem aqui</h2>
          <p>Cadastre pedidos, itens do cardápio e avaliações para receber indicadores e recomendações calculados pelo sistema.</p>
          <Link className="button insight-button" href="/dados">Cadastrar dados <Icon name="arrow-right" size={17} /></Link>
        </div>
      </section>
    );
  }
  return (
    <section className="insight-banner" aria-label="Insight do dia"><div className="insight-image" /><div className="insight-shade" />
      <div className="insight-content"><span className="insight-label"><Icon name="sparkle" size={15} /> {insight.label}</span><h2>{insight.title}</h2><p>{insight.description}</p><Button className="button insight-button" onClick={onOpenRecommendation}>Ver recomendação <Icon name="arrow-right" size={17} /></Button></div>
      <div className="insight-dots" aria-label="Escolher insight">{insights.map((item, itemIndex) => <Button key={item.title} variant="ghost" size="icon-xs" aria-label={"Insight " + (itemIndex + 1)} aria-pressed={index === itemIndex} onClick={() => onChange(itemIndex)} className={index === itemIndex ? "selected" : ""} />)}</div>
      <span className="insight-source">Dados cadastrados</span>
    </section>
  );
}
