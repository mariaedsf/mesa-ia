"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { setActionStatusAction } from "@server/actions";
import { useRestaurantName } from "@/components/workspace-shell";
import { type PlanAction, type PlanActionStatus } from "@/features/action-plans/data";
import { ActionKanbanBoard } from "@/features/action-plans/components/organisms/action-kanban-board";
import { ActionPlanHeaderActions } from "@/features/action-plans/components/molecules/action-plan-header-actions";
import { ActionCalendarDialog } from "@/features/action-plans/components/organisms/action-calendar-dialog";
import { ActionDetailDialog } from "@/features/action-plans/components/organisms/action-detail-dialog";
import { ActionPlanSidebar } from "@/features/action-plans/components/organisms/action-plan-sidebar";
import { ActionPlanSummary } from "@/features/action-plans/components/organisms/action-plan-summary";

export function ActionPlansScreen({ initialActions }: { initialActions: PlanAction[] }) {
  const restaurantName = useRestaurantName();
  const [actions, setActions] = useState(() => initialActions.map((action) => ({ ...action })));
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [draggedActionId, setDraggedActionId] = useState<string | null>(null);
  const [dropTargetStatus, setDropTargetStatus] = useState<PlanActionStatus | null>(null);
  const [activeAction, setActiveAction] = useState<PlanAction | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const actionBoardRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => actions.reduce((result, action) => {
    result.total += 1;
    result[action.status] += 1;
    return result;
  }, { total: 0, active: 0, completed: 0, pending: 0 }), [actions]);
  const completedPercent = counts.total ? Math.round((counts.completed / counts.total) * 100) : 0;
  const upcomingActions = actions.filter((action) => action.status !== "completed" && !action.overdue).slice(0, 4);
  const nearestDeadline = upcomingActions[0];
  const visibleActions = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");
    return actions.filter((action) => !normalizedSearch || [action.title, action.description, action.responsible, action.role].some((value) => value.toLocaleLowerCase("pt-BR").includes(normalizedSearch)));
  }, [actions, search]);

  function moveAction(actionId: string, status: PlanActionStatus) {
    setActions((current) => current.map((item) => item.id === actionId ? { ...item, status, overdue: status === "pending" ? item.overdue : false } : item));
    setDraggedActionId(null);
    setDropTargetStatus(null);
    startTransition(() => setActionStatusAction(actionId, status));
  }

  function updateActionStatus(action: PlanAction, status: PlanActionStatus) {
    moveAction(action.id, status);
    setActiveAction(null);
  }

  function showAllActions() {
    setSearch("");
    window.setTimeout(() => actionBoardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  }

  function finishDrag() {
    setDraggedActionId(null);
    setDropTargetStatus(null);
  }

  return (
    <div className="action-plans-page">
      <header className="action-plans-header"><div className="action-plans-heading"><span className="restaurant-eyebrow">{restaurantName}</span><h1>Planos de ação</h1><p>Transforme insights em ações e acompanhe o progresso das suas melhorias.</p></div><ActionPlanHeaderActions /></header>
      <ActionPlanSummary counts={counts} nearestDeadline={nearestDeadline} onSelectDeadline={setActiveAction} />
      <div className="plans-main-grid">
        <ActionKanbanBoard actions={visibleActions} counts={counts} search={search} boardRef={actionBoardRef} draggedActionId={draggedActionId} dropTargetStatus={dropTargetStatus} onSearch={setSearch} onSelect={setActiveAction} onDragStart={setDraggedActionId} onDragEnd={finishDrag} onDropTarget={setDropTargetStatus} onDrop={(id, status) => moveAction(id || draggedActionId || "", status)} />
        <ActionPlanSidebar counts={counts} completedPercent={completedPercent} upcomingActions={upcomingActions} onShowAll={showAllActions} onOpenCalendar={() => setCalendarOpen(true)} onSelectAction={setActiveAction} />
      </div>
      <ActionDetailDialog action={activeAction} onClose={() => setActiveAction(null)} onStatusChange={updateActionStatus} />
      <ActionCalendarDialog open={calendarOpen} actions={upcomingActions} onOpenChange={setCalendarOpen} />
    </div>
  );
}
