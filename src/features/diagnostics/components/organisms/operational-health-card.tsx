import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import type { OperationalHealth } from "@/features/diagnostics/data";

import { OperationalFactorItem } from "../molecules/operational-factor-item";

export function OperationalHealthCard({ operationalHealth }: { operationalHealth: OperationalHealth }) {
  return (
    <Card className="surface diagnostics-card health-card">
      <div className="diagnostics-card-heading"><div className="diagnostics-title-with-info"><h2>Saúde operacional</h2><Tooltip><TooltipTrigger render={<Button variant="ghost" size="icon-xs" className="diagnostics-info" aria-label="Sobre a saúde operacional" />}><Info size={18} aria-hidden="true" /></TooltipTrigger><TooltipContent className="diagnostics-tooltip" arrowClassName="bg-white fill-white">Indicador demonstrativo baseado em fatores operacionais.</TooltipContent></Tooltip></div></div>
      <div className="health-overview"><div className="health-ring" role="img" aria-label={"Saúde operacional: " + operationalHealth.score + "%"}><svg viewBox="0 0 128 128" aria-hidden="true"><circle className="health-ring-track" cx="64" cy="64" r="54" /><circle className="health-ring-value" cx="64" cy="64" r="54" /></svg><div className="health-ring-copy"><strong>{operationalHealth.score}%</strong><span>{operationalHealth.change}</span></div></div><p className="health-summary">{operationalHealth.summary}</p></div>
      <div className="diagnostics-factor-heading"><span>Principais fatores</span><i /></div>
      <ul className="diagnostics-factor-list">{operationalHealth.factors.map((factor) => <OperationalFactorItem key={factor.id} factor={factor} />)}{operationalHealth.factors.length === 0 && <li className="diagnostics-empty">Cadastre pedidos e avaliações para ver os fatores.</li>}</ul>
    </Card>
  );
}
