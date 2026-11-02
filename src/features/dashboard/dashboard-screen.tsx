"use client";

import { useState, useTransition } from "react";
import { setRecommendationCompletedAction } from "@server/actions";
import { useRestaurantName } from "@/components/workspace-shell";
import type { DashboardReadModel } from "@server/application/read-models";
import { DashboardActionDialog } from "@/features/dashboard/components/organisms/dashboard-action-dialog";
import { DashboardAISummaryCard } from "@/features/dashboard/components/organisms/dashboard-ai-summary";
import { DashboardHeader } from "@/features/dashboard/components/organisms/dashboard-header";
import { DashboardInsightBanner } from "@/features/dashboard/components/organisms/dashboard-insight-banner";
import { MetricCards } from "@/features/dashboard/components/organisms/metric-cards";
import { OrdersChart } from "@/features/dashboard/components/organisms/orders-chart";
import { RecommendationCard } from "@/features/dashboard/components/organisms/recommendation-card";
import { SentimentCard } from "@/features/dashboard/components/organisms/sentiment-card";
import { ThemesCard } from "@/features/dashboard/components/organisms/themes-card";

export function DashboardScreen({ initialCompletedIds, data }: { initialCompletedIds: string[]; data: DashboardReadModel }) {
  const [period, setPeriod] = useState("Esta semana");
  const [insightIndex, setInsightIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(() => new Set(initialCompletedIds));
  const [, startTransition] = useTransition();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const restaurantName = useRestaurantName();
  const activeRecommendation = data.recommendations.find((item) => item.id === selectedAction);

  function closeActionDialog() {
    setSelectedAction(null);
  }
  function toggleRecommendation(id: string) {
    const nextCompleted = !completed.has(id);
    setCompleted((previous) => { const next = new Set(previous); if (nextCompleted) next.add(id); else next.delete(id); return next; });
    startTransition(() => setRecommendationCompletedAction(id, nextCompleted));
  }

  return (
    <div className="dashboard-page">
      <DashboardHeader restaurantName={restaurantName} period={period} onPeriodChange={setPeriod} />
      <DashboardInsightBanner insights={data.insights} index={insightIndex} onChange={setInsightIndex} onOpenRecommendation={() => setSelectedAction(data.recommendations[0]?.id ?? null)} />
      <div className="demo-notice"><span className="demo-dot" />{data.hasData ? "Indicadores calculados com dados cadastrados" : "Cadastre os dados da operação para ver os indicadores"}<span>•</span><a href="/dados">Gerenciar dados</a></div>
      <MetricCards metrics={data.metrics} />
      <section className="middle-grid" aria-label="Pedidos e recomendações"><OrdersChart period={period} ordersByPeriod={data.ordersByPeriod} /><RecommendationCard recommendations={data.recommendations} completed={completed} onToggle={toggleRecommendation} onOpen={setSelectedAction} /></section>
      <section className="bottom-grid" aria-label="Avaliações e resumo da operação"><ThemesCard reviewThemes={data.reviewThemes} hasReviews={data.totalReviews > 0} /><SentimentCard sentiments={data.sentiments} reviews={data.reviews} totalReviews={data.totalReviews} /><DashboardAISummaryCard hasData={data.hasData} /></section>
      <footer className="dashboard-footer"><span>MESA <i>•</i> Insights para uma operação melhor.</span><span>{data.hasData ? "Baseado nos registros deste restaurante" : "Nenhum registro operacional"}</span></footer>
      <DashboardActionDialog recommendation={activeRecommendation} completed={completed} onClose={closeActionDialog} onToggle={toggleRecommendation} />
    </div>
  );
}
