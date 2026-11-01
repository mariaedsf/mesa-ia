"use client";

import { useEffect, useState } from "react";
import { DiagnosticsHeaderActions } from "@/features/diagnostics/components/molecules/diagnostics-header-actions";
import type { CategoryFilter } from "@/features/diagnostics/components/list.shared";
import { DiagnosticsList } from "@/features/diagnostics/components/organisms/diagnostics-list";
import { OperationalHealthCard } from "@/features/diagnostics/components/organisms/operational-health-card";
import { RecommendationsCard } from "@/features/diagnostics/components/organisms/recommendations-card";
import { RootCauseExplorer } from "@/features/diagnostics/components/organisms/root-cause-explorer";
import { DiagnosticsToast } from "@/features/diagnostics/components/atoms/diagnostics-toast";
import { demoDiagnostics, demoOperationalHealth } from "@/features/diagnostics/data";

export function DiagnosticsScreen() {
  const [selectedDiagnosticId, setSelectedDiagnosticId] = useState(demoDiagnostics[0]?.id ?? "");
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [selectedRecommendationId, setSelectedRecommendationId] = useState<string | null>(demoDiagnostics[0]?.recommendations[0]?.id ?? null);
  const [planIds, setPlanIds] = useState<Set<string>>(() => new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const selectedDiagnostic = demoDiagnostics.find((diagnostic) => diagnostic.id === selectedDiagnosticId) ?? demoDiagnostics[0];
  const selectedRecommendation = selectedDiagnostic?.recommendations.find((recommendation) => recommendation.id === selectedRecommendationId);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  function selectDiagnostic(id: string) {
    const diagnostic = demoDiagnostics.find((item) => item.id === id);
    if (!diagnostic) return;
    setSelectedDiagnosticId(diagnostic.id);
    setSelectedRecommendationId(diagnostic.recommendations[0]?.id ?? null);
  }

  function selectCategory(category: CategoryFilter) {
    setFilter(category);
    const available = demoDiagnostics.filter((diagnostic) => category === "all" || diagnostic.category === category);
    if (!available.some((diagnostic) => diagnostic.id === selectedDiagnosticId) && available[0]) {
      selectDiagnostic(available[0].id);
    }
  }

  function addSelectedRecommendation() {
    if (!selectedRecommendation) return;
    const alreadyAdded = planIds.has(selectedRecommendation.id);
    setPlanIds((previous) => new Set(previous).add(selectedRecommendation.id));
    setToastMessage(alreadyAdded ? "Esta recomendação já está na sua lista demonstrativa." : "Recomendação adicionada ao plano demonstrativo.");
  }

  return (
    <div className="diagnostics-page">
      <header className="diagnostics-header">
        <div className="diagnostics-heading">
          <h1>Diagnósticos</h1>
          <p>Investigue o que está impactando sua operação e descubra oportunidades de melhoria.</p>
        </div>
        <DiagnosticsHeaderActions />
      </header>

      <div className="diagnostics-top-grid">
        <OperationalHealthCard operationalHealth={demoOperationalHealth} />
        <DiagnosticsList
          diagnostics={demoDiagnostics}
          selectedId={selectedDiagnosticId}
          filter={filter}
          onFilter={selectCategory}
          onSelect={selectDiagnostic}
        />
      </div>

      {selectedDiagnostic ? (
        <div className="diagnostics-bottom-grid">
          <RootCauseExplorer diagnostic={selectedDiagnostic} />
          <RecommendationsCard
            diagnostic={selectedDiagnostic}
            selectedRecommendationId={selectedRecommendationId}
            onSelectRecommendation={setSelectedRecommendationId}
            onAddToPlan={addSelectedRecommendation}
            planCount={planIds.size}
          />
        </div>
      ) : (
        <div className="diagnostics-empty-panel">Selecione um diagnóstico para explorar os fatores relacionados.</div>
      )}

      <footer className="diagnostics-footer">
        <span>Dados demonstrativos. Relações entre fatores são hipóteses operacionais.</span>
        <span>Atualizado para fins de demonstração</span>
      </footer>
      {toastMessage && <DiagnosticsToast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
}
