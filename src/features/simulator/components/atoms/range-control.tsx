"use client";

import { type CSSProperties } from "react";

import { SliderDefinition, formatControlValue } from "../simulator.shared";

export function RangeControl({
  id,
  definition,
  value,
  onChange,
}: {
  id: string;
  definition: SliderDefinition;
  value: number;
  onChange: (value: number) => void;
}) {
  const IconComponent = definition.icon;
  const progress = ((value - definition.min) / (definition.max - definition.min)) * 100;

  return (
    <div className="simulator-control">
      <div className="simulator-control-heading">
        <span className="simulator-control-icon"><IconComponent size={20} aria-hidden="true" /></span>
        <label htmlFor={id}>{definition.label}</label>
        <output htmlFor={id}>{formatControlValue(definition.key, value)}</output>
      </div>
      <input
        id={id}
        className="simulator-control-slider"
        type="range"
        min={definition.min}
        max={definition.max}
        step={definition.step ?? 1}
        value={value}
        aria-valuetext={formatControlValue(definition.key, value)}
        style={{ "--range-progress": progress + "%" } as CSSProperties}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
    </div>
  );
}
