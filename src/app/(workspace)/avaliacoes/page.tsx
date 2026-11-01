import { Suspense } from "react";
import { connection } from "next/server";
import { operationalDataService } from "@server/container";
import { ReviewsScreen } from "@/features/reviews/reviews-screen";
import { DataLoadingState } from "@/components/data-loading-state";

export default function AvaliacoesPage() {
  return <Suspense fallback={<DataLoadingState />}><ReviewsData /></Suspense>;
}

async function ReviewsData() {
  await connection();
  const data = await operationalDataService.getOperationalData();
  return <ReviewsScreen key={data.restaurant?.id ?? "no-restaurant"} initialReviews={data.reviews} />;
}
