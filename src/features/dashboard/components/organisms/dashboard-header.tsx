"use client";

import { useState } from "react";
import { UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Icon } from "@/components/ui/icon";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { dashboardPeriods } from "@/features/dashboard/data";

export function DashboardHeader({ restaurantName, period, onPeriodChange }: { restaurantName: string; period: string; onPeriodChange: (period: string) => void }) {
  const [periodOpen, setPeriodOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  return (
    <header className="dashboard-header">
      <div className="greeting"><span className="restaurant-eyebrow">{restaurantName} <span className="demo-dot" /></span><h1>Panorama da operação</h1><p>Acompanhe os dados registrados do restaurante.</p></div>
      <div className="header-actions">
        <Popover open={periodOpen} onOpenChange={setPeriodOpen}><PopoverTrigger render={<Button className="period-button" variant="outline" aria-label={"Período: " + period} />}><Icon name="calendar" size={18} /><span>{period}</span><Icon name="chevron-down" size={16} /></PopoverTrigger>
          <PopoverContent align="end" sideOffset={9} className="popover period-menu"><span className="popover-eyebrow">Período de análise</span>{dashboardPeriods.map((option) => <Button key={option} className={"period-option" + (period === option ? " selected" : "")} variant="ghost" onClick={() => { onPeriodChange(option); setPeriodOpen(false); }}>{option}{period === option && <Icon name="check" size={15} />}</Button>)}<span className="popover-note">Métricas calculadas a partir dos registros</span></PopoverContent>
        </Popover>
        <Popover open={notificationOpen} onOpenChange={setNotificationOpen}><PopoverTrigger render={<Button className={"icon-button notification-button" + (notificationOpen ? " pressed" : "")} variant="outline" size="icon" aria-label="Notificações" />}><Icon name="bell" size={20} /></PopoverTrigger>
          <PopoverContent align="end" sideOffset={10} className="popover notifications-popover"><div className="notification-head"><strong>Notificações</strong></div><p className="popover-note">Nenhuma notificação disponível.</p></PopoverContent>
        </Popover>
        <Button className="avatar avatar-header" variant="ghost" aria-label="Espaço de trabalho" title="Espaço de trabalho"><UserRound size={19} aria-hidden="true" /></Button>
      </div>
    </header>
  );
}
