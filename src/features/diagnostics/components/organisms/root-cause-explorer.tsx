import { Activity } from "lucide-react";

import { Card } from "@/components/ui/card";

import { Icon } from "@/components/ui/icon";

import type { Diagnostic } from "@/features/diagnostics/data";

import { RootCauseStepCard } from "../molecules/root-cause-step-card";

export function RootCauseExplorer({ diagnostic }: { diagnostic: Diagnostic }) {
  return <Card className="surface diagnostics-card root-cause-card"><div className="root-cause-heading"><div><h2>Explorador de causa raiz</h2><p>Entenda a cadeia de fatores por trás do problema.</p></div><span className="root-cause-hypothesis"><Activity size={14} aria-hidden="true" /> Possível relação entre fatores</span></div><p className="root-cause-context">Hipótese operacional para <strong>{diagnostic.title}</strong></p><div className="diagnostics-chain" aria-label="Hipóteses relacionadas a este diagnóstico">{diagnostic.rootCauseSteps.map((step, index) => <div className="diagnostics-chain-part" key={step.id}><RootCauseStepCard step={step} index={index} emphasized={index === 1} />{index < diagnostic.rootCauseSteps.length - 1 && <Icon name="arrow-right" className="diagnostics-chain-arrow" size={20} />}</div>)}</div><p className="root-cause-disclaimer">Relações demonstrativas para investigação; não representam causalidade comprovada.</p></Card>;
}
