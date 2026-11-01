import Link from "next/link";

import { Play, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { Icon } from "@/components/ui/icon";

import type { Diagnostic } from "@/features/diagnostics/data";

import { RecommendationItem } from "../molecules/recommendation-item";

export function RecommendationsCard({ diagnostic, selectedRecommendationId, onSelectRecommendation, onAddToPlan, planCount }: { diagnostic: Diagnostic; selectedRecommendationId: string | null; onSelectRecommendation: (id: string) => void; onAddToPlan: () => void; planCount: number }) {
  return <Card className="surface diagnostics-card mesa-recommendations-card"><div className="diagnostics-card-heading"><h2>Recomendações da MESA <Sparkles className="recommendation-heading-sparkle" size={17} aria-hidden="true" /></h2></div><p className="diagnostics-recommendation-context">Relacionadas a {diagnostic.title.toLowerCase()}</p>
    {diagnostic.recommendations.length ? <div className="diagnostics-recommendation-list">{diagnostic.recommendations.map((recommendation) => <RecommendationItem key={recommendation.id} recommendation={recommendation} selected={selectedRecommendationId === recommendation.id} onSelect={() => onSelectRecommendation(recommendation.id)} />)}</div> : <p className="diagnostics-empty">Não há ações sugeridas para este diagnóstico.</p>}
    <div className="diagnostics-recommendation-actions"><Link className="diagnostics-action-primary" href="/simulador"><Play size={18} aria-hidden="true" /> Simular cenário</Link><Button className="diagnostics-action-secondary" variant="outline" onClick={onAddToPlan} disabled={!selectedRecommendationId}><Icon name="plus" size={19} /> Adicionar ao plano</Button></div>
    <p className="diagnostics-plan-count" aria-live="polite">{planCount > 0 ? planCount + (planCount === 1 ? " recomendação adicionada" : " recomendações adicionadas") + " ao plano" : "Nenhuma recomendação adicionada ao plano"}</p>
  </Card>;
}
