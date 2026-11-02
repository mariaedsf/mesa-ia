"use client";

import { useState } from "react";
import { LoaderCircle, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { generateDashboardSummaryAction } from "@server/actions";
import type { DashboardAISummary } from "@server/application/read-models";

export function DashboardAISummaryCard({ hasData }: { hasData: boolean }) {
  const [summary, setSummary] = useState<DashboardAISummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  async function generateSummary() {
    if (!hasData || isGenerating) return;
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateDashboardSummaryAction();
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setSummary(result.summary);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível gerar o resumo da operação.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Card className="surface ai-summary-card">
      <CardHeader className="card-heading ai-summary-heading">
        <span className="ai-summary-mark"><Sparkles size={17} aria-hidden="true" /></span>
        <div className="ai-summary-heading-copy">
          <CardTitle>Resumo da IA</CardTitle>
          <p>Leitura da operação e das avaliações</p>
        </div>
      </CardHeader>

      {summary ? (
        <div className="ai-summary-points" aria-live="polite">
          <section className="ai-summary-point ai-summary-positive">
            <strong>Positivo</strong>
            <p>{summary.positive}</p>
          </section>
          <section className="ai-summary-point ai-summary-attention">
            <strong>Atenção</strong>
            <p>{summary.attention}</p>
          </section>
        </div>
      ) : (
        <p className="ai-summary-empty" aria-live="polite">
          {hasData
            ? "Veja o que está indo bem e o que merece atenção na sua operação."
            : "Cadastre pedidos ou avaliações para a IA analisar sua operação."}
        </p>
      )}

      {error && <p className="ai-summary-error" role="alert">{error}</p>}

      <div className="ai-summary-footer">
        <Button
          className="ai-summary-button"
          variant="outline"
          disabled={!hasData || isGenerating}
          onClick={generateSummary}
        >
          {isGenerating
            ? <LoaderCircle className="animate-spin" size={15} aria-hidden="true" />
            : summary ? <RefreshCw size={14} aria-hidden="true" /> : <Sparkles size={15} aria-hidden="true" />}
          {isGenerating ? "Analisando..." : summary ? "Atualizar resumo" : "Gerar resumo"}
        </Button>
        <span>Dados agregados · sem comentários de clientes</span>
      </div>
    </Card>
  );
}
