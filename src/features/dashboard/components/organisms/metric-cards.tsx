"use client";

import { Icon } from "@/components/ui/icon";

import { Card } from "@/components/ui/card";

import type { DashboardMetric } from "@server/application/read-models";

import { Sparkline } from "../atoms/sparkline";

export function MetricCards({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <section className="metrics-grid" aria-label="Indicadores da operação">
      {metrics.map((metric) => (
        <Card className="metric-card" key={metric.label}>
          <div className="metric-icon"><Icon name={metric.icon} size={21} /></div>
          <div className="metric-main">
            <div className="metric-topline"><span>{metric.label}</span></div>
            <div className="metric-value-line">
              <strong>{metric.value}</strong>
              <span className={`metric-change ${metric.direction === "down" ? "negative" : "positive"}`}>
                <Icon name={metric.direction === "down" ? "arrow-up-right" : "arrow-up"} size={14} />
                {metric.change}
              </span>
            </div>
            <span className="metric-context">{metric.context}</span>
          </div>
          <Sparkline label={metric.label} negative={metric.direction === "down"} />
        </Card>
      ))}
    </section>
  );
}
