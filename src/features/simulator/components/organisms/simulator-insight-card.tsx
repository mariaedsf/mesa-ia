import { Activity, ChartNoAxesColumnIncreasing, Clock3, Share2, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { formatSigned, formatSignedCurrency } from "../simulator.shared";

import type { ImpactBadge } from "../sections.shared";

export function SimulatorInsightCard({ insightText, peakDelta, satisfactionDelta, revenueDelta, preparationImpact, satisfactionImpact, revenueImpact, onApply, onShare }: { insightText: string; peakDelta: number; satisfactionDelta: number | null; revenueDelta: number | null; preparationImpact: ImpactBadge; satisfactionImpact: ImpactBadge; revenueImpact: ImpactBadge; onApply: () => void; onShare: () => void }) {
  return <Card className="surface simulator-card simulator-insight-card"><div className="simulator-insight-title"><span><Sparkles size={18} aria-hidden="true" /></span><h2>Insight da simulação</h2></div><p className="simulator-insight-copy">{insightText}</p>
    <div className="simulator-impact-section"><h3>Principais impactos</h3>
      <div className="simulator-impact-row"><span className="simulator-impact-icon"><Clock3 size={20} aria-hidden="true" /></span><div><strong>{formatSigned(peakDelta)} min</strong><small>no tempo de preparo</small></div><span className={"simulator-impact-badge" + (preparationImpact.favorable ? " favorable" : " caution")}>{preparationImpact.label}</span></div>
      <div className="simulator-impact-row"><span className="simulator-impact-icon"><Star size={20} aria-hidden="true" /></span><div><strong>{satisfactionDelta === null ? "—" : formatSigned(satisfactionDelta, 1)}</strong><small>na satisfação do cliente</small></div><span className={"simulator-impact-badge" + (satisfactionImpact.favorable ? " favorable" : " caution")}>{satisfactionImpact.label}</span></div>
      <div className="simulator-impact-row"><span className="simulator-impact-icon"><ChartNoAxesColumnIncreasing size={20} aria-hidden="true" /></span><div><strong>{revenueDelta === null ? "—" : formatSignedCurrency(revenueDelta)}</strong><small>na receita estimada</small></div><span className={"simulator-impact-badge" + (revenueImpact.favorable ? " favorable" : " caution")}>{revenueImpact.label}</span></div>
    </div>
    <div className="simulator-insight-actions"><Button className="simulator-apply-button" onClick={onApply}><Activity size={17} aria-hidden="true" /> Aplicar no plano de ação</Button><Button className="simulator-share-button" variant="outline" onClick={onShare}><Share2 size={17} aria-hidden="true" /> Compartilhar cenário</Button></div>
  </Card>;
}
