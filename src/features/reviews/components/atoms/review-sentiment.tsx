"use client";

import { reviewsClassName } from "../../tailwind-styles";

import type { SentimentLabel } from "@/features/dashboard/sentiment-feedback";

export function ReviewSentiment({ sentiment }: { sentiment: SentimentLabel }) {
  return <span className={reviewsClassName(`reviews-sentiment ${sentiment.toLowerCase()}`)}><i />{sentiment}</span>;
}
