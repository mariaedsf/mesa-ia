import { Clock3, MessageSquareText, Star, ThumbsUp } from "lucide-react";
import { SummaryCard } from "../molecules/review-summary-card";

type ReviewSummaryProps = {
  total: number;
  positive: number;
  answered: number;
  averageRating: string;
};

export function ReviewSummary({ total, positive, answered, averageRating }: ReviewSummaryProps) {
  return (
    <section className="reviews-summary-grid" aria-label="Resumo das avaliações">
      <SummaryCard icon={MessageSquareText} label="Total de avaliações" value={String(total)} detail="feedbacks recebidos nesta amostra" tone="orange" />
      <SummaryCard icon={Star} label="Nota média" value={averageRating} detail="de 5,0 estrelas" tone="gold" />
      <SummaryCard icon={ThumbsUp} label="Avaliações positivas" value={String(positive)} detail={`${Math.round((positive / total) * 100)}% do total`} tone="green" />
      <SummaryCard icon={Clock3} label="Aguardando resposta" value={String(total - answered)} detail={`${answered} já respondidas`} tone="violet" />
    </section>
  );
}
