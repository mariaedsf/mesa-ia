"use client";

import { ArrowRight, type LucideIcon } from "lucide-react";

import { percentChange } from "../simulator.shared";

export function MetricComparison({
  icon: IconComponent,
  label,
  current,
  projected,
  currentValue,
  projectedValue,
  lowerIsBetter = false,
  decimals = 0,
}: {
  icon: LucideIcon;
  label: string;
  current: string;
  projected: string;
  currentValue: number | null;
  projectedValue: number | null;
  lowerIsBetter?: boolean;
  decimals?: number;
}) {
  const direction = currentValue === null || projectedValue === null ? null : projectedValue - currentValue;
  const favorable = direction === null ? false : lowerIsBetter ? direction <= 0 : direction >= 0;

  return (
    <article className="simulator-metric">
      <div className="simulator-metric-title">
        <span><IconComponent size={19} aria-hidden="true" /></span>
        <strong>{label}</strong>
      </div>
      <div className="simulator-metric-values">
        <strong>{current}</strong>
        <ArrowRight size={16} aria-hidden="true" />
        <strong className="simulator-projected-value">{projected}</strong>
      </div>
      <span className={"simulator-metric-delta" + (favorable ? " favorable" : " caution")}>
        {currentValue === null || projectedValue === null ? "Sem dados" : percentChange(currentValue, projectedValue, decimals)}
      </span>
    </article>
  );
}
