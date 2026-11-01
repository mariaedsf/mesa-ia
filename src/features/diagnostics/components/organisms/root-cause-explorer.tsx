import { Activity } from "lucide-react";

import { Card } from "@/components/ui/card";

import { Icon } from "@/components/ui/icon";

import type { Diagnostic } from "@/features/diagnostics/data";

import { RootCauseStepCard } from "../molecules/root-cause-step-card";

export function RootCauseExplorer({ diagnostic }: { diagnostic: Diagnostic }) {
  return <Card className="surface diagnostics-card root-cause-card"><div className="root-cause-heading"><div><h2>Explorador de fatores</h2><p>Valores registrados relacionados ao indicador.</p></div><span className="root-cause-hypothesis"><Activity size={14} aria-hidden="true" /> Relação observada</span></div><p className="root-cause-context">Dados relacionados a <strong>{diagnostic.title}</strong></p><div className="diagnostics-chain" aria-label="Valores registrados para este diagnóstico">{diagnostic.rootCauseSteps.map((step, index) => <div className="diagnostics-chain-part" key={step.id}><RootCauseStepCard step={step} index={index} emphasized={index === 1} />{index < diagnostic.rootCauseSteps.length - 1 && <Icon name="arrow-right" className="diagnostics-chain-arrow" size={20} />}</div>)}</div><p className="root-cause-disclaimer">Esta leitura usa somente os registros cadastrados e não afirma causalidade.</p></Card>;
}
