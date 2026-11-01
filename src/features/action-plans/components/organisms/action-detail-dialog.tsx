import { Activity, CheckCircle2, Circle, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import { ActionStatus } from "../atoms/action-status";

import type { PlanAction, PlanActionStatus } from "@/features/action-plans/data";

import { actionIcons } from "../action-icons";

export function ActionDetailDialog({ action, onClose, onStatusChange }: { action: PlanAction | null; onClose: () => void; onStatusChange: (action: PlanAction, status: PlanActionStatus) => void }) {
  const Icon = action ? actionIcons[action.icon] : Activity;
  const nextStatus: PlanActionStatus = action?.status === "pending" ? "active" : action?.status === "active" ? "completed" : "active";
  const actionButtonLabel = action?.status === "pending" ? "Iniciar ação" : nextStatus === "completed" ? "Marcar como concluída" : "Reabrir ação";
  return <Dialog open={Boolean(action)} onOpenChange={(open) => { if (!open) onClose(); }}><DialogContent className="dialog-card plans-detail-dialog" overlayClassName="modal-backdrop" showCloseButton={false}><DialogClose render={<Button className="dialog-close icon-button" variant="ghost" size="icon" aria-label="Fechar" />}><X size={18} aria-hidden="true" /></DialogClose>{action && <><span className="plans-detail-icon"><Icon size={22} aria-hidden="true" /></span><p className="eyebrow">Plano de ação</p><DialogTitle id="plan-action-title">{action.title}</DialogTitle><DialogDescription className="dialog-copy">{action.description}</DialogDescription><div className="plans-detail-meta"><span><strong>Responsável</strong>{action.responsible}<small>{action.role}</small></span><span><strong>Prazo</strong>{action.due}<small>{action.time}</small></span><span><strong>Status</strong><ActionStatus action={action} /></span></div><Button className={"button " + (nextStatus === "completed" ? "button-primary" : "button-secondary") + " dialog-action"} onClick={() => onStatusChange(action, nextStatus)}>{nextStatus === "completed" ? <CheckCircle2 size={17} aria-hidden="true" /> : <Circle size={17} aria-hidden="true" />}{actionButtonLabel}</Button></>}</DialogContent></Dialog>;
}
