import type { Review } from "@/features/reviews/data";
import type { SentimentLabel } from "@/features/dashboard/sentiment-feedback";


export const periods = ["Hoje", "Esta semana", "Este mês"];
export const pageSize = 8;
export type ReviewFilter = "Todas" | SentimentLabel;
export type SortKey = "customer" | "item" | "rating" | "sentiment" | "date";

export const sentimentOrder: Record<SentimentLabel, number> = { Negativo: 0, Neutro: 1, Positivo: 2 };

export function initials(name: string) {
  return name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function exportReviews(reviews: Review[]) {
  const headings = ["Cliente", "Comentário", "Prato", "Nota", "Sentimento", "Canal", "Recebido", "Status"];
  const rows = reviews.map((review) => [review.customer, review.comment, review.item, review.rating, review.sentiment, review.channel, review.date, review.answered ? "Respondida" : "Pendente"]);
  const csv = [headings, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "avaliacoes-mesa.csv";
  link.click();
  URL.revokeObjectURL(url);
}
