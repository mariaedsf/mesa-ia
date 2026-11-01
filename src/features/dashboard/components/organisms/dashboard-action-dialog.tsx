"use client";

import { Button } from "@/components/ui/button";

import { Icon } from "@/components/ui/icon";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import { Recommendation } from "../page-sections.shared";

export function DashboardActionDialog({ recommendation, popularItems, itemsOpen, completed, onClose, onToggle }: { recommendation: Recommendation | undefined; popularItems: { name: string; change: string; itemId: string }[]; itemsOpen: boolean; completed: Set<string>; onClose: () => void; onToggle: (id: string) => void }) {
  return (
    <Dialog open={Boolean(recommendation) || itemsOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="dialog-card action-dialog" showCloseButton={false}>
        <DialogClose render={<Button className="dialog-close icon-button" variant="ghost" size="icon" aria-label="Fechar" />} onClick={onClose}><Icon name="close" /></DialogClose>
        {itemsOpen ? <><p className="eyebrow">Cardápio · esta semana</p><DialogTitle id="action-dialog-title">Itens mais vendidos</DialogTitle><DialogDescription className="dialog-copy">Ranking calculado a partir dos pedidos cadastrados.</DialogDescription><div className="modal-popular-list">{popularItems.map((item, index) => <div className="modal-popular-item" key={item.itemId}><span className={"dish-thumbnail dish-" + index} /><span><strong>{item.name}</strong><small>{item.change} em unidades vendidas</small></span><Icon name="arrow-up-right" size={18} /></div>)}{popularItems.length === 0 && <p className="card-empty">Cadastre pedidos vinculados aos itens do cardápio.</p>}</div></> : recommendation ? <><span className="dialog-mark"><Icon name="sparkle" size={20} /></span><p className="eyebrow">Recomendação operacional</p><DialogTitle id="action-dialog-title">{recommendation.title}</DialogTitle><DialogDescription className="dialog-copy">{recommendation.detail}</DialogDescription><div className="impact-box"><Icon name="chart" size={18} /><span>{recommendation.impact}<small>Calculado a partir dos registros atuais</small></span></div><Button className={"button " + (completed.has(recommendation.id) ? "button-secondary" : "button-primary") + " dialog-action"} onClick={() => onToggle(recommendation.id)}>{completed.has(recommendation.id) ? <><Icon name="check" size={17} /> Concluída</> : <>Marcar como concluída <Icon name="arrow-right" size={17} /></>}</Button></> : null}
      </DialogContent>
    </Dialog>
  );
}
