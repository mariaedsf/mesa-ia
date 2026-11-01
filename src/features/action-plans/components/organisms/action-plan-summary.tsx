import { CalendarDays, CheckCircle2, ChevronRight, Clock3, UsersRound } from "lucide-react";

import { Card } from "@/components/ui/card";

import type { PlanAction } from "@/features/action-plans/data";

import { ActionCounts } from "../summary.shared";

import { SummaryStat } from "../molecules/summary-stat";

export function ActionPlanSummary({ counts, nearestDeadline, onSelectDeadline }: { counts: ActionCounts; nearestDeadline?: PlanAction; onSelectDeadline: (action: PlanAction) => void }) {
  const completedPercent = counts.total ? Math.round((counts.completed / counts.total) * 100) : 0;
  const activePercent = counts.total ? Math.round((counts.active / counts.total) * 100) : 0;

  return (
    <section className="plans-summary-grid" aria-label="Resumo das ações">
      <Card className="surface plans-stat-card">
        <span className="plans-stat-icon orange"><UsersRound size={22} aria-hidden="true" /></span>
        <div className="plans-stat-copy"><span className="plans-stat-label">Total de ações</span><strong>{counts.total}</strong>
          <small>{counts.active} em andamento · {counts.completed} concluídas · {counts.pending} pendentes</small>
        </div>
      </Card>
      <SummaryStat icon={Clock3} label="Em andamento" value={String(counts.active)} detail={`${activePercent}% do total`} tone="orange" percent={activePercent} />
      <SummaryStat icon={CheckCircle2} label="Concluídas" value={String(counts.completed)} detail={`${completedPercent}% do total`} tone="green" percent={completedPercent} />
      <Card className="surface plans-stat-card plans-deadline-card">
        <button type="button" className="plans-deadline-button" onClick={() => nearestDeadline && onSelectDeadline(nearestDeadline)} aria-label={nearestDeadline ? `Abrir ação com prazo mais próximo: ${nearestDeadline.title}` : "Nenhum prazo próximo"}>
          <span className="plans-stat-icon orange"><CalendarDays size={22} aria-hidden="true" /></span>
          <span className="plans-stat-copy"><span className="plans-stat-label">Prazo mais próximo</span><strong>{nearestDeadline?.due ?? "Sem prazo"}</strong><small>{nearestDeadline?.title ?? "Todas as ações estão concluídas"}</small></span>
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </Card>
    </section>
  );
}
