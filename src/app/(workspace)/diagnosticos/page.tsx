import { Suspense } from "react";
import { connection } from "next/server";
import { appStateService, operationalDataService } from "@server/container";
import { DiagnosticsScreen } from "@/features/diagnostics/diagnostics-screen";
import { DataLoadingState } from "@/components/data-loading-state";

export default function DiagnosticsPage() {
  return <Suspense fallback={<DataLoadingState />}><DiagnosticsData /></Suspense>;
}

async function DiagnosticsData() {
  await connection();
  const data = await operationalDataService.getDiagnosticsData();
  const state = await appStateService.getState(data.restaurantId);
  return <DiagnosticsScreen key={data.restaurantId ?? "no-restaurant"} initialPlanIds={state.diagnosticPlanIds} data={data} />;
}
