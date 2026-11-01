import { Suspense } from "react";
import { connection } from "next/server";
import { operationalDataService } from "@server/container";
import { MenuScreen } from "@/features/menu/menu-screen";
import { DataLoadingState } from "@/components/data-loading-state";

export default function CardapioPage() {
  return <Suspense fallback={<DataLoadingState />}><MenuData /></Suspense>;
}

async function MenuData() {
  await connection();
  const data = await operationalDataService.getMenuData();
  return <MenuScreen key={data.restaurantId ?? "no-restaurant"} data={data} />;
}
