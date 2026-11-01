import { Suspense } from "react";
import { connection } from "next/server";
import { operationalDataService } from "@server/container";
import { DataManagementScreen } from "@/features/data-management/data-management-screen";
import { DataLoadingState } from "@/components/data-loading-state";

export default function DadosPage() {
  return <Suspense fallback={<DataLoadingState />}><OperationalData /></Suspense>;
}

async function OperationalData() {
  await connection();
  const [restaurants, data] = await Promise.all([
    operationalDataService.getRestaurants(),
    operationalDataService.getOperationalData(),
  ]);
  const currentDate = new Date();
  const defaultDateTime = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 16);

  return <DataManagementScreen restaurants={restaurants} data={data} defaultDateTime={defaultDateTime} />;
}
