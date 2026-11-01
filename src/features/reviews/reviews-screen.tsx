"use client";

import { useMemo, useState, useTransition } from "react";
import { setReviewAnsweredAction } from "@server/actions";
import { useRestaurantName } from "@/components/workspace-shell";
import type { Review } from "@/features/reviews/data";
import { reviewsClassName } from "@/features/reviews/tailwind-styles";
import { pageSize, sentimentOrder, type ReviewFilter, type SortKey } from "@/features/reviews/components/review.shared";
import { ReviewDetailDialog } from "@/features/reviews/components/organisms/review-detail-dialog";
import { ReviewHeaderActions } from "@/features/reviews/components/organisms/review-header-actions";
import { ReviewsTable } from "@/features/reviews/components/organisms/reviews-table";

export function ReviewsScreen({ initialReviews }: { initialReviews: Review[] }) {
  const restaurantName = useRestaurantName();
  const [reviews, setReviews] = useState(() => initialReviews);
  const [, startTransition] = useTransition();
  const [filter, setFilter] = useState<ReviewFilter>("Todas");
  const [onlyUnanswered, setOnlyUnanswered] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; direction: "asc" | "desc" }>({ key: "date", direction: "desc" });
  const [page, setPage] = useState(0);
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);

  const counts = useMemo(() => reviews.reduce((result, review) => {
    result.total += 1;
    result[review.sentiment] += 1;
    if (review.answered) result.answered += 1;
    result.rating += review.rating;
    return result;
  }, { total: 0, Positivo: 0, Neutro: 0, Negativo: 0, answered: 0, rating: 0 }), [reviews]);

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pt-BR");
    const visible = reviews.filter((review) => {
      const matchesFilter = filter === "Todas" || review.sentiment === filter;
      const matchesSearch = !query || [review.customer, review.comment, review.item, review.channel].some((value) => value.toLocaleLowerCase("pt-BR").includes(query));
      return matchesFilter && matchesSearch && (!onlyUnanswered || !review.answered);
    });
    return visible.sort((a, b) => {
      let comparison = 0;
      if (sort.key === "sentiment") comparison = sentimentOrder[a.sentiment] - sentimentOrder[b.sentiment];
      else if (sort.key === "rating") comparison = a.rating - b.rating;
      else if (sort.key === "date") comparison = a.timestamp - b.timestamp;
      else comparison = a[sort.key].localeCompare(b[sort.key], "pt-BR");
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [reviews, filter, onlyUnanswered, search, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const pageReviews = filteredReviews.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  const activeReview = reviews.find((review) => review.id === activeReviewId) ?? null;

  function changeFilter(next: ReviewFilter) { setFilter(next); setPage(0); }
  function toggleSort(key: SortKey) {
    setSort((current) => current.key === key ? { key, direction: current.direction === "asc" ? "desc" : "asc" } : { key, direction: key === "date" ? "desc" : "asc" });
  }
  function toggleAnswered(id: string) {
    const answered = !(reviews.find((review) => review.id === id)?.answered ?? false);
    setReviews((current) => current.map((review) => review.id === id ? { ...review, answered } : review));
    startTransition(() => setReviewAnsweredAction(id, answered));
  }

  return (
    <main className={reviewsClassName("reviews-page")}>
      <header className={reviewsClassName("reviews-page-header")}>
        <div className={reviewsClassName("reviews-page-heading")}><span className={reviewsClassName("restaurant-eyebrow")}>{restaurantName}</span><h1>Avaliações</h1><p>Acompanhe os feedbacks recebidos e entenda a experiência dos seus clientes.</p></div>
        <ReviewHeaderActions />
      </header>

      <ReviewsTable
        filteredReviews={filteredReviews}
        pageReviews={pageReviews}
        counts={counts}
        filter={filter}
        search={search}
        onlyUnanswered={onlyUnanswered}
        sort={sort}
        currentPage={currentPage}
        pageCount={pageCount}
        onSearch={(value) => { setSearch(value); setPage(0); }}
        onTogglePending={() => { setOnlyUnanswered((value) => !value); setPage(0); }}
        onChangeFilter={changeFilter}
        onSort={toggleSort}
        onPageChange={setPage}
        onSelectReview={setActiveReviewId}
        onClearSearch={() => { setSearch(""); setPage(0); }}
      />
      <p className={reviewsClassName("reviews-demo-note")}><i />Avaliações cadastradas para {restaurantName}.</p>
      <ReviewDetailDialog review={activeReview} onClose={() => setActiveReviewId(null)} onToggleAnswered={toggleAnswered} />
    </main>
  );
}
