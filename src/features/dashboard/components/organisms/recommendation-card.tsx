"use client";

import { Icon } from "@/components/ui/icon";

import { Button } from "@/components/ui/button";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";

import type { DashboardRecommendation } from "@server/application/read-models";

export function RecommendationCard({
  completed,
  recommendations,
  onToggle,
  onOpen,
}: {
  completed: Set<string>;
  recommendations: DashboardRecommendation[];
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  return (
    <Card className="surface recommendations-card">
      <CardHeader className="card-heading">
        <div>
          <CardTitle>Recomendações da MESA <Icon name="sparkles" className="heading-sparkle" size={15} /></CardTitle>
          <p className="card-subtitle">Próximos passos sugeridos</p>
        </div>
        <span className="recommendation-count">{completed.size}/{recommendations.length}</span>
      </CardHeader>
      <div className="recommendation-list">
        {recommendations.length === 0 && <p className="card-empty">Ainda não há recomendações. Cadastre pedidos, avaliações e custos do cardápio para gerar análises.</p>}
        {recommendations.map((recommendation, index) => {
          const checked = completed.has(recommendation.id);
          return (
            <div className={`recommendation-row${checked ? " completed" : ""}${index === 0 && !checked ? " featured" : ""}`} key={recommendation.id}>
              <Checkbox
                className={`recommendation-check${checked ? " checked" : ""}`}
                checked={checked}
                onCheckedChange={() => onToggle(recommendation.id)}
                aria-label={`${checked ? "Desmarcar" : "Marcar como concluída"}: ${recommendation.title}`}
              />
              <Button className="recommendation-detail" variant="ghost" onClick={() => onOpen(recommendation.id)}>
                <span className="recommendation-copy">
                  <strong>{recommendation.title}</strong>
            <small>{checked ? "Concluída" : recommendation.description}</small>
                </span>
                <Icon name="chevron-right" size={18} />
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
