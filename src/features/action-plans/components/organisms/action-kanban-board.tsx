import type { RefObject } from "react";

import { Search } from "lucide-react";

import { Card } from "@/components/ui/card";

import type { PlanAction, PlanActionStatus } from "@/features/action-plans/data";

import { KanbanActionCard } from "../molecules/kanban-action-card";

export function ActionKanbanBoard({ actions, counts, search, boardRef, draggedActionId, dropTargetStatus, onSearch, onSelect, onDragStart, onDragEnd, onDropTarget, onDrop }: {
  actions: PlanAction[]; counts: { pending: number; active: number; completed: number }; search: string; boardRef: RefObject<HTMLDivElement | null>;
  draggedActionId: string | null; dropTargetStatus: PlanActionStatus | null; onSearch: (value: string) => void; onSelect: (action: PlanAction) => void;
  onDragStart: (id: string) => void; onDragEnd: () => void; onDropTarget: (status: PlanActionStatus | null) => void; onDrop: (id: string, status: PlanActionStatus) => void;
}) {
  const lanes = [
    { status: "pending", label: "Pendentes", count: counts.pending },
    { status: "active", label: "Em andamento", count: counts.active },
    { status: "completed", label: "Concluídas", count: counts.completed },
  ] satisfies { status: PlanActionStatus; label: string; count: number }[];

  return (
    <Card className="surface plans-actions-card">
      <div className="plans-actions-heading"><h2>Minhas ações</h2><label className="plans-search"><Search size={16} aria-hidden="true" /><input type="search" value={search} onChange={(event) => onSearch(event.currentTarget.value)} placeholder="Buscar ação..." aria-label="Buscar ação" /></label></div>
      <div className="plans-kanban-board" ref={boardRef}>
        {lanes.map((lane) => {
          const laneActions = actions.filter((action) => action.status === lane.status);
          return <section key={lane.status} className={`plans-kanban-column ${lane.status}${dropTargetStatus === lane.status ? " drop-target" : ""}`} aria-label={`${lane.label}: ${lane.count} ações`}
            onDragOver={(event) => { event.preventDefault(); onDropTarget(lane.status); }} onDragLeave={() => onDropTarget(null)}
            onDrop={(event) => { event.preventDefault(); const actionId = event.dataTransfer.getData("text/plain"); onDrop(actionId, lane.status); }}>
            <header className="plans-kanban-column-heading"><span><i className="plans-kanban-status-dot" /><strong>{lane.label}</strong></span><small>{lane.count}</small></header>
            <div className="plans-kanban-list">{laneActions.length ? laneActions.map((action) => <KanbanActionCard key={action.id} action={action} dragging={draggedActionId === action.id} onSelect={() => onSelect(action)} onDragStart={onDragStart} onDragEnd={onDragEnd} />) : <div className="plans-kanban-empty"><span>{search ? "Nenhuma ação encontrada" : "Nenhuma ação nesta etapa"}</span></div>}</div>
          </section>;
        })}
      </div>
    </Card>
  );
}
