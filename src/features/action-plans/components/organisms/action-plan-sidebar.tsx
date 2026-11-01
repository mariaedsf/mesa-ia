import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronRight, Sparkles, Target } from "lucide-react";
import type { CSSProperties } from "react";
import { Card } from "@/components/ui/card";
import type { ActionCounts } from "@/features/action-plans/components/summary.shared";
import type { PlanAction } from "@/features/action-plans/data";

export function ActionPlanSidebar({ counts, completedPercent, upcomingActions, onShowAll, onOpenCalendar, onSelectAction }: {
  counts: ActionCounts; completedPercent: number; upcomingActions: PlanAction[]; onShowAll: () => void; onOpenCalendar: () => void; onSelectAction: (action: PlanAction) => void;
}) {
  return (
    <aside className="plans-side-column">
      <Card className="surface plans-side-card plans-overview-card">
        <div className="plans-side-heading"><span className="plans-side-icon orange"><Target size={18} aria-hidden="true" /></span><h2>Resumo do plano</h2><button type="button" className="plans-text-link" onClick={onShowAll}>Ver todas <ArrowRight size={14} aria-hidden="true" /></button></div>
        <div className="plans-overview-content">
          <div className="plans-progress-ring" role="img" aria-label={completedPercent + "% das ações concluídas"} style={{ "--plans-progress": completedPercent + "%" } as CSSProperties}><div><strong>{completedPercent}%</strong><span>concluído</span></div></div>
          <div className="plans-overview-stats"><div><i className="orange-dot" /><span>Em andamento</span><strong>{counts.active}</strong></div><div><i className="green-dot" /><span>Concluídas</span><strong>{counts.completed}</strong></div><div><i className="gray-dot" /><span>Pendente</span><strong>{counts.pending}</strong></div><div className="plans-overview-total"><span>Total de ações</span><strong>{counts.total}</strong></div></div>
        </div>
      </Card>
      <Card className="surface plans-side-card plans-upcoming-card">
        <div className="plans-side-heading"><span className="plans-side-icon neutral"><CalendarDays size={18} aria-hidden="true" /></span><h2>Próximas ações</h2><button type="button" className="plans-text-link" onClick={onOpenCalendar}>Ver calendário <ArrowRight size={14} aria-hidden="true" /></button></div>
        <div className="plans-timeline">
          {upcomingActions.map((action) => <button type="button" key={action.id} className="plans-timeline-item" onClick={() => onSelectAction(action)}><span className="plans-timeline-date"><strong>{action.day}</strong><small>{action.date}</small></span><span className="plans-timeline-axis"><i /></span><span className="plans-timeline-copy"><strong>{action.title}</strong><small>{action.responsible} · {action.time}</small></span><ChevronRight size={15} aria-hidden="true" /></button>)}
          {upcomingActions.length === 0 && <p className="plans-timeline-empty">Nenhuma ação prevista no momento.</p>}
        </div>
      </Card>
      <Link className="plans-tip-card" href="/diagnosticos"><span className="plans-tip-icon"><Sparkles size={19} aria-hidden="true" /></span><span className="plans-tip-copy"><strong>Dica da MESA</strong><span>Com base nos diagnósticos, o maior impacto será na redução do tempo de preparo.</span></span><ChevronRight size={17} aria-hidden="true" /></Link>
    </aside>
  );
}
