"use client";

import { menuClassName } from "../../tailwind-styles";

import { Card } from "@/components/ui/card";
import type { MenuReadModel } from "@server/application/read-models";
import { metricIcons } from "../menu.shared";

export function MenuMetricCard({ metric }: { metric: MenuReadModel["menuMetrics"][number] }) {
  const MetricIcon = metricIcons[metric.icon];
  return (
    <Card className={menuClassName("menu-metric-card")}>
      <span className={menuClassName("menu-metric-icon")}><MetricIcon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
      <div className={menuClassName("menu-metric-copy")}>
        <span>{metric.label}</span>
        <strong>{metric.value}</strong>
        <small>{metric.change || "Dados insuficientes para comparar"}</small>
        <p>{metric.context}</p>
      </div>
    </Card>
  );
}
