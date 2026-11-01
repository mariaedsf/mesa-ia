"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Play, Plus, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Diagnostic } from "@/features/diagnostics/data";
import { RecommendationItem } from "../molecules/recommendation-item";

export function RecommendationsCard({ diagnostic, selectedRecommendationId, onSelectRecommendation, onAddToPlan, planCount }: { diagnostic: Diagnostic; selectedRecommendationId: string | null; onSelectRecommendation: (id: string) => void; onAddToPlan: () => void; planCount: number }) {
  const [simulationOpen, setSimulationOpen] = useState(false);

  return (
    <>
      <Card className="surface diagnostics-card mesa-recommendations-card">
        <div className="diagnostics-card-heading">
          <h2>Recomendações da MESA <Sparkles className="recommendation-heading-sparkle" size={17} aria-hidden="true" /></h2>
        </div>
        <p className="diagnostics-recommendation-context">Relacionadas a {diagnostic.title.toLowerCase()}</p>
        <div className="diagnostics-recommendation-list">
          {diagnostic.recommendations.map((recommendation) => (
            <RecommendationItem
              key={recommendation.id}
              recommendation={recommendation}
              selected={selectedRecommendationId === recommendation.id}
              onSelect={() => onSelectRecommendation(recommendation.id)}
            />
          ))}
        </div>
        <div className="diagnostics-recommendation-actions">
          <Button className="diagnostics-action-primary" variant="ghost" onClick={() => setSimulationOpen(true)}>
            <Play size={18} aria-hidden="true" /> Simular cenário
          </Button>
          <Button className="diagnostics-action-secondary" variant="outline" onClick={onAddToPlan} disabled={!selectedRecommendationId}>
            <Plus size={18} aria-hidden="true" /> Adicionar ao plano
          </Button>
        </div>
        <p className="diagnostics-plan-count" aria-live="polite">
          {planCount > 0 ? `${planCount} ${planCount === 1 ? "recomendação adicionada" : "recomendações adicionadas"} à lista demonstrativa` : "Nenhuma recomendação adicionada ao plano"}
        </p>
      </Card>

      <Dialog open={simulationOpen} onOpenChange={setSimulationOpen}>
        <DialogContent className="dialog-card diagnostics-simulation-dialog" overlayClassName="modal-backdrop" showCloseButton={false}>
          <DialogClose render={<Button className="dialog-close icon-button" variant="ghost" size="icon" aria-label="Fechar simulação" />}>
            <X size={18} aria-hidden="true" />
          </DialogClose>
          <span className="dialog-mark"><Sparkles size={20} aria-hidden="true" /></span>
          <p className="eyebrow">Cenário demonstrativo</p>
          <DialogTitle id="diagnostics-simulation-title">Explore esta recomendação no Simulador</DialogTitle>
          <DialogDescription className="dialog-copy">
            A simulação detalhada está disponível na página Simulador, onde você pode comparar ajustes operacionais.
          </DialogDescription>
          <Link className="button button-primary dialog-action" href="/simulador">
            Abrir Simulador <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
}
