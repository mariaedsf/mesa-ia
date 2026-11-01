import { RotateCcw, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import type { ScenarioArea, SimulationInputs } from "@/features/simulator/data";

import { areaControls, joinPhrases, type InputKey } from "@/features/simulator/components/simulator.shared";
import { RangeControl } from "../atoms/range-control";

export function SimulatorControlsCard({ activeArea, inputs, changes, teamDelta, prepAdjustment, onChange, onReset }: { activeArea: ScenarioArea; inputs: SimulationInputs; changes: string[]; teamDelta: number; prepAdjustment: number; onChange: (key: InputKey, value: number) => void; onReset: () => void }) {
  const contextText = teamDelta === 1 && prepAdjustment === 5 && changes.length === 2
    ? "Você aumentou a equipe em +1 pessoa e reduziu o pré-preparo em 5 min."
    : changes.length ? "Ajustes ativos: " + joinPhrases(changes) + "." : "Nenhuma alteração em relação à operação atual.";
  return <Card id="simulator-controls-panel" role="tabpanel" aria-labelledby={"simulator-tab-" + activeArea} className="surface simulator-card simulator-controls">
    <div className="simulator-card-header"><div><h2>Configure o cenário</h2><p>Ajuste as variáveis e veja o impacto nos resultados.</p></div></div>
    <div className="simulator-controls-list">{areaControls[activeArea].map((definition) => <RangeControl key={definition.key} id={"simulator-" + activeArea + "-" + definition.key} definition={definition} value={inputs[definition.key]} onChange={(value) => onChange(definition.key, value)} />)}</div>
    <div className="simulator-context-note"><span className="simulator-context-icon"><Zap size={19} aria-hidden="true" /></span><div><strong>Cenário atual vs. simulado</strong><p>{contextText}</p></div></div>
    <Button className="simulator-reset" variant="outline" onClick={onReset}><RotateCcw size={17} aria-hidden="true" /> Reverter ajustes</Button>
  </Card>;
}
