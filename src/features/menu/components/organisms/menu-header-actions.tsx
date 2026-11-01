"use client";

import { menuClassName } from "../../tailwind-styles";

import { useState } from "react";

import { Bell, CalendarDays, Check, ChevronDown, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { periods } from "../menu.shared";

export function MenuHeaderActions() {
  const [period, setPeriod] = useState("Esta semana");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <div className={menuClassName("header-actions menu-header-actions")}>
      <Popover open={periodOpen} onOpenChange={setPeriodOpen}>
        <PopoverTrigger render={<Button className={menuClassName("period-button")} variant="outline" aria-label={`Período: ${period}`} />}>
          <CalendarDays size={18} aria-hidden="true" />
          <span>{period}</span>
          <ChevronDown size={16} aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={9} className={menuClassName("popover period-menu")}>
          <span className={menuClassName("popover-eyebrow")}>Período de análise</span>
          {periods.map((option) => (
            <Button key={option} className={menuClassName(`period-option${period === option ? " selected" : ""}`)} variant="ghost" onClick={() => { setPeriod(option); setPeriodOpen(false); }}>
              {option}{period === option && <Check size={15} aria-hidden="true" />}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
      <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
        <PopoverTrigger render={<Button className={menuClassName(`icon-button notification-button${notificationOpen ? " pressed" : ""}`)} variant="outline" size="icon" aria-label="Notificações" />}>
          <Bell size={20} aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={10} className={menuClassName("popover notifications-popover")}>
          <div className={menuClassName("notification-head")}><strong>Notificações</strong></div>
          <p className={menuClassName("popover-note")}>Nenhuma notificação disponível.</p>
        </PopoverContent>
      </Popover>
      <Button className={menuClassName("avatar avatar-header")} variant="ghost" aria-label="Espaço de trabalho" title="Espaço de trabalho"><UserRound size={19} aria-hidden="true" /></Button>
    </div>
  );
}
