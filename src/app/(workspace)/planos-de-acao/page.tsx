import { Suspense } from "react";
import { connection } from "next/server";
import { appStateService, operationalDataService } from "@server/container";
import { ActionPlansScreen } from "@/features/action-plans/action-plans-screen";
import { DataLoadingState } from "@/components/data-loading-state";

export default function ActionPlansPage() {
  return <Suspense fallback={<DataLoadingState />}><ActionPlansData /></Suspense>;
}

async function ActionPlansData() {
  await connection();
  const restaurant = await operationalDataService.getSelectedRestaurant();
  const actions = await appStateService.getActionPlans(restaurant?.id ?? null);
  return <ActionPlansScreen key={restaurant?.id ?? "no-restaurant"} initialActions={actions} />;
}
