import type { ScenarioArea } from "@/features/simulator/data";

import { areas } from "../simulator.shared";

export function SimulatorAreaTabs({ activeArea, onChange }: { activeArea: ScenarioArea; onChange: (area: ScenarioArea) => void }) {
  return <div className="simulator-tabs-wrap"><div className="simulator-tabs" role="tablist" aria-label="Área da simulação">{areas.map((area) => { const IconComponent = area.icon; const selected = activeArea === area.id; return <button key={area.id} id={"simulator-tab-" + area.id} type="button" role="tab" aria-selected={selected} aria-controls="simulator-controls-panel" className={"simulator-tab" + (selected ? " active" : "")} onClick={() => onChange(area.id)}><IconComponent size={20} aria-hidden="true" /><span>{area.label}</span></button>; })}</div></div>;
}
