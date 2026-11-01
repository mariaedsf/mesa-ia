import type { PlanAction } from "@/features/action-plans/data";

import { actionStatusLabel } from "@/features/action-plans/components/summary.shared";

import { actionIcons } from "../action-icons";

export function KanbanActionCard({ action, onSelect, onDragStart, onDragEnd, dragging }: {
  action: PlanAction; onSelect: () => void; onDragStart: (id: string) => void; onDragEnd: () => void; dragging: boolean;
}) {
  const Icon = actionIcons[action.icon];
  return (
    <button type="button" draggable className={`plans-kanban-action${dragging ? " dragging" : ""}`} onClick={onSelect}
      onDragStart={(event) => { event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("text/plain", action.id); onDragStart(action.id); }} onDragEnd={onDragEnd}
      aria-label={`${action.title}, ${actionStatusLabel(action)}, responsável: ${action.responsible}`}>
      <span className="plans-kanban-card-heading"><i className={`plans-kanban-card-icon icon-${action.icon}`}><Icon size={16} aria-hidden="true" /></i>{action.overdue && action.status !== "completed" && <span className="plans-kanban-overdue">Atrasada</span>}</span>
      <strong className="plans-kanban-card-title">{action.title}</strong><span className="plans-kanban-card-description">{action.description}</span>
      <span className="plans-kanban-card-footer"><span className="plans-kanban-person"><i className="plans-person-avatar" aria-hidden="true">{action.initials}</i><span>{action.responsible}</span></span><span className={`plans-kanban-due${action.due === "Hoje" ? " today" : ""}`}>{action.due}</span></span>
    </button>
  );
}
