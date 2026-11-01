import { CalendarDays, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import type { PlanAction } from "@/features/action-plans/data";

export function ActionCalendarDialog({ open, actions, onOpenChange }: { open: boolean; actions: PlanAction[]; onOpenChange: (open: boolean) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="dialog-card plans-calendar-dialog" overlayClassName="modal-backdrop" showCloseButton={false}><DialogClose render={<Button className="dialog-close icon-button" variant="ghost" size="icon" aria-label="Fechar" />}><X size={18} aria-hidden="true" /></DialogClose><span className="plans-detail-icon"><CalendarDays size={22} aria-hidden="true" /></span><p className="eyebrow">Agenda da semana</p><DialogTitle id="plans-calendar-title">Próximas ações</DialogTitle><DialogDescription className="dialog-copy">Prazos e responsáveis pelas melhorias em andamento.</DialogDescription><div className="plans-calendar-list">{actions.map((action) => <div key={action.id}><span><strong>{action.day}, {action.date}</strong><small>{action.time}</small></span><span><strong>{action.title}</strong><small>{action.responsible}</small></span></div>)}</div></DialogContent></Dialog>;
}
