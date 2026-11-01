import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import type { RootCauseStep } from "@/features/diagnostics/data";

import { DiagnosticIcon } from "../atoms/diagnostic-icon";

export function RootCauseStepCard({ step, emphasized, index }: { step: RootCauseStep; emphasized: boolean; index: number }) {
  return <Tooltip><TooltipTrigger render={<button type="button" className={"diagnostics-step-card" + (emphasized ? " emphasized" : "")} aria-label={"Etapa " + (index + 1) + ": " + step.label + ", " + step.value + ", " + step.description} />}><><span className="diagnostics-step-icon"><DiagnosticIcon name={step.icon} size={23} /></span><span className="diagnostics-step-label">{step.label}</span><strong className="diagnostics-step-value">{step.value}</strong><span className="diagnostics-step-description">{step.description}</span></></TooltipTrigger><TooltipContent className="diagnostics-tooltip" arrowClassName="bg-white fill-white">{step.hint}</TooltipContent></Tooltip>;
}
