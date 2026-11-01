"use client";

import { useState } from "react";
import { Bell, CalendarDays, Check, ChevronDown, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const periods = ["Hoje", "Últimos 7 dias", "Esta semana", "Últimos 30 dias"];

export function ActionPlanHeaderActions() {
  const [period, setPeriod] = useState("Esta semana");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="header-actions action-plans-header-actions">
      <Popover open={periodOpen} onOpenChange={setPeriodOpen}>
        <PopoverTrigger render={<Button className="period-button" variant="outline" aria-label={`Período: ${period}`} />}>
          <CalendarDays size={18} aria-hidden="true" /><span>{period}</span><ChevronDown size={16} aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={9} className="popover period-menu">
          <span className="popover-eyebrow">Período de análise</span>
          {periods.map((option) => (
            <Button key={option} className={`period-option${period === option ? " selected" : ""}`} variant="ghost" onClick={() => { setPeriod(option); setPeriodOpen(false); }}>
              {option}{period === option && <Check size={15} aria-hidden="true" />}
            </Button>
          ))}
          <span className="popover-note">Dados do restaurante selecionado</span>
        </PopoverContent>
      </Popover>
      <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <PopoverTrigger render={<Button className="icon-button notification-button" variant="outline" size="icon" aria-label="Notificações" />}>
          <Bell size={20} aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={10} className="popover notifications-popover">
          <div className="notification-head"><strong>Notificações</strong></div>
          <p className="popover-note">Nenhuma notificação disponível.</p>
        </PopoverContent>
      </Popover>
      <Button className="avatar avatar-header" variant="ghost" aria-label="Espaço de trabalho" title="Espaço de trabalho"><UserRound size={19} aria-hidden="true" /></Button>
    </div>
  );
}
