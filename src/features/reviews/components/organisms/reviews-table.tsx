import { ChevronDown, ChevronLeft, ChevronRight, Download, Search, Star, ThumbsDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { exportReviews, initials, pageSize, type ReviewFilter, type SortKey } from "@/features/reviews/components/review.shared";
import { ReviewSentiment } from "@/features/reviews/components/atoms/review-sentiment";
import { reviewsClassName } from "@/features/reviews/tailwind-styles";
import type { Review } from "@/features/reviews/data";

type ReviewCounts = { total: number; Positivo: number; Neutro: number; Negativo: number };
type ReviewSort = { key: SortKey; direction: "asc" | "desc" };

export function ReviewsTable({ filteredReviews, pageReviews, counts, filter, search, onlyUnanswered, sort, currentPage, pageCount, onSearch, onTogglePending, onChangeFilter, onSort, onPageChange, onSelectReview, onClearSearch }: {
  filteredReviews: Review[]; pageReviews: Review[]; counts: ReviewCounts; filter: ReviewFilter; search: string; onlyUnanswered: boolean; sort: ReviewSort; currentPage: number; pageCount: number;
  onSearch: (value: string) => void; onTogglePending: () => void; onChangeFilter: (filter: ReviewFilter) => void; onSort: (key: SortKey) => void; onPageChange: (page: number) => void; onSelectReview: (id: string) => void; onClearSearch: () => void;
}) {
  return (
    <Card className={reviewsClassName("reviews-table-card")}>
      <div className={reviewsClassName("reviews-table-heading")}><div><h2>Todos os feedbacks</h2><p>Comentários, notas e origem das avaliações recebidas.</p></div><span className={reviewsClassName("reviews-result-count")}>{filteredReviews.length} {filteredReviews.length === 1 ? "avaliação" : "avaliações"}</span></div>
      <div className={reviewsClassName("reviews-toolbar")}>
        <label className={reviewsClassName("reviews-search")}><Search size={17} aria-hidden="true" /><input type="search" value={search} onChange={(event) => onSearch(event.currentTarget.value)} placeholder="Buscar cliente, comentário ou prato..." aria-label="Buscar avaliações" />{search && <button type="button" onClick={onClearSearch} aria-label="Limpar busca"><X size={15} /></button>}</label>
        <Button className={reviewsClassName("reviews-export-button" + (onlyUnanswered ? " selected" : ""))} variant="outline" onClick={onTogglePending}><ThumbsDown size={15} aria-hidden="true" />Pendentes</Button>
        <Button className={reviewsClassName("reviews-export-button")} variant="outline" onClick={() => exportReviews(filteredReviews)} disabled={!filteredReviews.length}><Download size={15} aria-hidden="true" />Exportar CSV</Button>
      </div>
      <div className={reviewsClassName("reviews-filter-row")} role="group" aria-label="Filtrar por sentimento">
        {(["Todas", "Positivo", "Neutro", "Negativo"] as ReviewFilter[]).map((option) => <button key={option} type="button" className={reviewsClassName("reviews-filter" + (filter === option ? " active" : ""))} aria-pressed={filter === option} onClick={() => onChangeFilter(option)}>{option}<span>{option === "Todas" ? counts.total : counts[option]}</span></button>)}
      </div>
      <div className={reviewsClassName("reviews-table-wrap")}>
        <table className={reviewsClassName("reviews-table")}>
          <thead><tr>
            <th aria-sort={sort.key === "customer" ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}><button onClick={() => onSort("customer")}>Cliente{sort.key === "customer" && <ChevronDown className={reviewsClassName(sort.direction === "asc" ? "sort-up" : "")} size={13} />}</button></th>
            <th>Feedback</th>
            <th aria-sort={sort.key === "item" ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}><button onClick={() => onSort("item")}>Prato / experiência{sort.key === "item" && <ChevronDown className={reviewsClassName(sort.direction === "asc" ? "sort-up" : "")} size={13} />}</button></th>
            <th aria-sort={sort.key === "rating" ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}><button onClick={() => onSort("rating")}>Nota{sort.key === "rating" && <ChevronDown className={reviewsClassName(sort.direction === "asc" ? "sort-up" : "")} size={13} />}</button></th>
            <th aria-sort={sort.key === "sentiment" ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}><button onClick={() => onSort("sentiment")}>Sentimento{sort.key === "sentiment" && <ChevronDown className={reviewsClassName(sort.direction === "asc" ? "sort-up" : "")} size={13} />}</button></th>
            <th>Canal</th><th aria-sort={sort.key === "date" ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}><button onClick={() => onSort("date")}>Recebido{sort.key === "date" && <ChevronDown className={reviewsClassName(sort.direction === "asc" ? "sort-up" : "")} size={13} />}</button></th><th>Resposta</th><th><span className={reviewsClassName("sr-only")}>Detalhes</span></th>
          </tr></thead>
          <tbody>
            {pageReviews.map((review) => <tr key={review.id} onClick={() => onSelectReview(review.id)} onKeyDown={(event) => { if (event.key === "Enter") onSelectReview(review.id); }} tabIndex={0} aria-label={"Abrir avaliação de " + review.customer}>
              <td><span className={reviewsClassName("reviews-customer")}><i>{initials(review.customer)}</i><span><strong>{review.customer}</strong><small>Cliente</small></span></span></td>
              <td><span className={reviewsClassName("reviews-comment-cell")}>{review.comment}</span></td>
              <td><span className={reviewsClassName("reviews-item-cell")}>{review.item}</span></td>
              <td><span className={reviewsClassName("reviews-rating")}><Star size={14} fill="currentColor" aria-hidden="true" />{review.rating},0</span></td>
              <td><ReviewSentiment sentiment={review.sentiment} /></td><td><span className={reviewsClassName("reviews-channel")}>{review.channel}</span></td><td><time className={reviewsClassName("reviews-date")}>{review.date}</time></td>
              <td><span className={reviewsClassName("reviews-response-status" + (review.answered ? " answered" : ""))}><i />{review.answered ? "Respondida" : "Pendente"}</span></td>
              <td><button className={reviewsClassName("reviews-row-open")} type="button" aria-label={"Ver avaliação de " + review.customer} onClick={(event) => { event.stopPropagation(); onSelectReview(review.id); }}><ChevronRight size={17} aria-hidden="true" /></button></td>
            </tr>)}
            {pageReviews.length === 0 && <tr><td className={reviewsClassName("reviews-empty")} colSpan={9}><span><Search size={20} /></span><strong>Nenhuma avaliação encontrada</strong><small>Ajuste os filtros ou tente outra busca.</small></td></tr>}
          </tbody>
        </table>
      </div>
      <footer className={reviewsClassName("reviews-pagination")}><span>Mostrando <strong>{filteredReviews.length ? currentPage * pageSize + 1 : 0}–{Math.min((currentPage + 1) * pageSize, filteredReviews.length)}</strong> de <strong>{filteredReviews.length}</strong> avaliações</span><div><Button className={reviewsClassName("reviews-page-button")} variant="outline" size="icon" aria-label="Página anterior" disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)}><ChevronLeft size={16} /></Button><span className={reviewsClassName("reviews-page-number")}>{currentPage + 1} <i>/</i> {pageCount}</span><Button className={reviewsClassName("reviews-page-button")} variant="outline" size="icon" aria-label="Próxima página" disabled={currentPage >= pageCount - 1} onClick={() => onPageChange(currentPage + 1)}><ChevronRight size={16} /></Button></div></footer>
    </Card>
  );
}
