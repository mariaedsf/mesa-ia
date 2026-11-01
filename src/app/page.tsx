import { Suspense } from "react";
import { connection } from "next/server";
import { appStateService, operationalDataService } from "@server/container";
import { DashboardScreen } from "@/features/dashboard/dashboard-screen";
import { DataLoadingState } from "@/components/data-loading-state";

export default function Home() {
  return <Suspense fallback={<DataLoadingState />}><DashboardData /></Suspense>;
}

async function DashboardData() {
  await connection();
  const data = await operationalDataService.getDashboardData();
  const state = await appStateService.getState(data.restaurantId);

  return <DashboardScreen key={data.restaurantId ?? "no-restaurant"} initialCompletedIds={state.completedRecommendationIds} data={data} />;
}
