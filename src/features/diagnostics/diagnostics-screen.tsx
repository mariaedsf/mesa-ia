"use client";

import { useEffect, useState, useTransition } from "react";
import { addDiagnosticRecommendationAction } from "@server/actions";
import { useRestaurantName } from "@/components/workspace-shell";
import type { DiagnosticsReadModel } from "@server/application/read-models";
import { DiagnosticsHeaderActions } from "@/features/diagnostics/components/molecules/diagnostics-header-actions";
import type { CategoryFilter } from "@/features/diagnostics/components/list.shared";
import { DiagnosticsList } from "@/features/diagnostics/components/organisms/diagnostics-list";
import { OperationalHealthCard } from "@/features/diagnostics/components/organisms/operational-health-card";
import { RecommendationsCard } from "@/features/diagnostics/components/organisms/recommendations-card";
import { RootCauseExplorer } from "@/features/diagnostics/components/organisms/root-cause-explorer";
import { DiagnosticsToast } from "@/features/diagnostics/components/atoms/diagnostics-toast";

export function DiagnosticsScreen({ initialPlanIds, data }: { initialPlanIds: string[]; data: DiagnosticsReadModel }) {
  const restaurantName = useRestaurantName();
  const [selectedDiagnosticId, setSelectedDiagnosticId] = useState(data.diagnostics[0]?.id ?? "");
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [selectedRecommendationId, setSelectedRecommendationId] = useState<string | null>(data.diagnostics[0]?.recommendations[0]?.id ?? null);
  const [planIds, setPlanIds] = useState<Set<string>>(() => new Set(initialPlanIds));
  const [, startTransition] = useTransition();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const selectedDiagnostic = data.diagnostics.find((diagnostic) => diagnostic.id === selectedDiagnosticId) ?? data.diagnostics[0];
  const selectedRecommendation = selectedDiagnostic?.recommendations.find((recommendation) => recommendation.id === selectedRecommendationId);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  function selectDiagnostic(id: string) {
    const diagnostic = data.diagnostics.find((item) => item.id === id);
    if (!diagnostic) return;
    setSelectedDiagnosticId(diagnostic.id);
    setSelectedRecommendationId(diagnostic.recommendations[0]?.id ?? null);
  }
  function selectCategory(category: CategoryFilter) {
    setFilter(category);
    const available = data.diagnostics.filter((diagnostic) => category === "all" || diagnostic.category === category);
    if (!available.some((diagnostic) => diagnostic.id === selectedDiagnosticId) && available[0]) selectDiagnostic(available[0].id);
  }
  function addSelectedRecommendation() {
    if (!selectedRecommendation) return;
    const alreadyAdded = planIds.has(selectedRecommendation.id);
    setPlanIds((previous) => new Set(previous).add(selectedRecommendation.id));
    setToastMessage(alreadyAdded ? "Esta recomendação já está no seu plano." : "Recomendação adicionada ao plano.");
    if (!alreadyAdded) startTransition(async () => { await addDiagnosticRecommendationAction(selectedRecommendation.id); });
  }

  return (
    <div className="diagnostics-page">
      <header className="diagnostics-header"><div className="diagnostics-heading"><h1>Diagnósticos</h1><p>Investigue o que está impactando sua operação e descubra oportunidades de melhoria.</p></div><DiagnosticsHeaderActions /></header>
      <div className="diagnostics-top-grid"><OperationalHealthCard operationalHealth={data.operationalHealth} /><DiagnosticsList diagnostics={data.diagnostics} selectedId={selectedDiagnosticId} filter={filter} onFilter={selectCategory} onSelect={selectDiagnostic} /></div>
      {selectedDiagnostic ? <div className="diagnostics-bottom-grid"><RootCauseExplorer diagnostic={selectedDiagnostic} /><RecommendationsCard diagnostic={selectedDiagnostic} selectedRecommendationId={selectedRecommendationId} onSelectRecommendation={setSelectedRecommendationId} onAddToPlan={addSelectedRecommendation} planCount={planIds.size} /></div> : <div className="diagnostics-empty-panel">Selecione um diagnóstico para explorar os fatores relacionados.</div>}
      <footer className="diagnostics-footer"><span>Leitura calculada a partir dos dados cadastrados</span><span>{restaurantName}</span></footer>
      {toastMessage && <DiagnosticsToast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
}
