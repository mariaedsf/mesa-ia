import { Suspense } from "react";
import { connection } from "next/server";
import { SimulatorScreen } from "@/features/simulator/simulator-screen";
import { operationalDataService } from "@server/container";
import { DataLoadingState } from "@/components/data-loading-state";

export default function SimulatorPage() {
  return <Suspense fallback={<DataLoadingState />}><SimulatorData /></Suspense>;
}

async function SimulatorData() {
  await connection();
  const data = await operationalDataService.getSimulationData();
  return <SimulatorScreen key={data.restaurantId ?? "no-restaurant"} data={data} />;
}
