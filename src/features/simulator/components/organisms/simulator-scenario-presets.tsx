import { ArrowRight, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";

import type { ScenarioPreset } from "@/features/simulator/data";

import { presetIcons } from "../simulator.shared";

export function SimulatorScenarioPresets({ presets, activePreset, onChoose }: { presets: ScenarioPreset[]; activePreset: string; onChoose: (preset: ScenarioPreset) => void }) {
  return <Card id="simulator-scenarios" className="surface simulator-scenarios-card"><div className="simulator-scenarios-heading"><h2>Explore outros cenários</h2><p>Testes rápidos com base nos principais desafios da sua operação.</p><a href="#simulator-scenarios">Ver todos <ArrowRight size={16} aria-hidden="true" /></a></div>
    <div className="simulator-scenario-list">{presets.map((preset) => { const IconComponent = presetIcons[preset.id] ?? Sparkles; const selected = activePreset === preset.id; return <button key={preset.id} type="button" className={"simulator-scenario" + (selected ? " selected" : "")} aria-pressed={selected} onClick={() => onChoose(preset)}><span className="simulator-scenario-icon"><IconComponent size={23} aria-hidden="true" /></span><span className="simulator-scenario-copy"><strong>{preset.label}</strong><small>{preset.description}</small></span></button>; })}</div>
  </Card>;
}
