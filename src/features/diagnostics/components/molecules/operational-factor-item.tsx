import { Icon } from "@/components/ui/icon";

import { type OperationalFactor } from "@/features/diagnostics/data";

import { DiagnosticIcon } from "../atoms/diagnostic-icon";

export function OperationalFactorItem({ factor }: { factor: OperationalFactor }) {
  return <li className="diagnostics-factor"><span className="diagnostics-factor-icon"><DiagnosticIcon name={factor.icon} size={21} /></span><span className="diagnostics-factor-name">{factor.label}</span><span className={"diagnostics-factor-badge " + factor.tone}>{factor.tone === "warning" && <Icon name="arrow-up-right" size={14} />}{factor.tone === "positive" && <Icon name="arrow-up" size={14} />}{factor.status}</span></li>;
}
