"use client";

import { reviewsClassName } from "../../tailwind-styles";

import { useState } from "react";

import { Bell, CalendarDays, Check, ChevronDown, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { periods } from "../review.shared";

export function ReviewHeaderActions() {
  const [period, setPeriod] = useState("Esta semana");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className={reviewsClassName("header-actions reviews-header-actions")}>
      <Popover open={periodOpen} onOpenChange={setPeriodOpen}>
        <PopoverTrigger render={<Button className={reviewsClassName("period-button")} variant="outline" aria-label={`Período: ${period}`} />}>
          <CalendarDays size={18} aria-hidden="true" /><span>{period}</span><ChevronDown size={16} aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={9} className={reviewsClassName("popover period-menu")}>
          <span className={reviewsClassName("popover-eyebrow")}>Período de análise</span>
          {periods.map((option) => <Button key={option} className={reviewsClassName(`period-option${period === option ? " selected" : ""}`)} variant="ghost" onClick={() => { setPeriod(option); setPeriodOpen(false); }}>{option}{period === option && <Check size={15} aria-hidden="true" />}</Button>)}
          <span className={reviewsClassName("popover-note")}>Avaliações cadastradas</span>
        </PopoverContent>
      </Popover>
      <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <PopoverTrigger render={<Button className={reviewsClassName("icon-button notification-button")} variant="outline" size="icon" aria-label="Notificações" />}>
          <Bell size={20} aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={10} className={reviewsClassName("popover notifications-popover")}>
          <div className={reviewsClassName("notification-head")}><strong>Notificações</strong></div>
          <p className={reviewsClassName("popover-note")}>Nenhuma notificação disponível.</p>
        </PopoverContent>
      </Popover>
      <Button className={reviewsClassName("avatar avatar-header")} variant="ghost" aria-label="Espaço de trabalho" title="Espaço de trabalho"><UserRound size={19} aria-hidden="true" /></Button>
    </div>
  );
}
