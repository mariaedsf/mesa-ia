import type { DiagnosticsReadModel } from "@server/application/read-models";

export type DiagnosticCategory = "operation" | "customer" | "menu";
export type DiagnosticPriority = "high" | "medium" | "low";
export type RootCauseIcon = "chart" | "team" | "clock" | "star" | "temperature" | "package" | "menu";
export type OperationalFactor = DiagnosticsReadModel["operationalHealth"]["factors"][number];
export type OperationalHealth = DiagnosticsReadModel["operationalHealth"];
export type RootCauseStep = DiagnosticsReadModel["diagnostics"][number]["rootCauseSteps"][number];
export type Recommendation = DiagnosticsReadModel["diagnostics"][number]["recommendations"][number];
export type Diagnostic = DiagnosticsReadModel["diagnostics"][number];

export const diagnosticCategories: { id: "all" | DiagnosticCategory; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "operation", label: "Operação" },
  { id: "customer", label: "Cliente" },
  { id: "menu", label: "Cardápio" },
];
