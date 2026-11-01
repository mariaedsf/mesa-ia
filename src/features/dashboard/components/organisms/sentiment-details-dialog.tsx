"use client";

import { useMemo, useState } from "react";
import { MessageSquareText, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SentimentWordCloud, type SentimentCloudTone } from "@/features/dashboard/components/molecules/sentiment-word-cloud";
import { getReviewsForSentimentKeyword, getSentimentKeywords, type SentimentLabel } from "@/features/dashboard/sentiment-feedback";
import type { Review } from "@/features/reviews/data";

const sentimentDetails: Record<SentimentLabel, { title: string; description: string; tone: SentimentCloudTone }> = {
  Negativo: {
    title: "O que merece atenção",
    description: "Veja os termos mais recorrentes nas avaliações negativas e os comentários relacionados.",
    tone: "negative",
  },
  Neutro: {
    title: "O que os clientes observam",
    description: "Explore os assuntos citados nas avaliações neutras e leia os comentários relacionados.",
    tone: "neutral",
  },
  Positivo: {
    title: "O que os clientes elogiam",
    description: "Explore os assuntos citados nas avaliações positivas e leia os comentários relacionados.",
    tone: "positive",
  },
};

export function SentimentDetailsDialog({
  sentiment,
  reviews: sourceReviews,
  onOpenChange,
}: {
  sentiment: SentimentLabel | null;
  reviews: Review[];
  onOpenChange: (open: boolean) => void;
}) {
  const [selection, setSelection] = useState<{ sentiment: SentimentLabel; word: string } | null>(null);
  const selectedWord = selection?.sentiment === sentiment ? selection.word : null;
  const keywords = useMemo(
    () => sentiment ? getSentimentKeywords(sourceReviews, sentiment) : [],
    [sentiment, sourceReviews],
  );
  const selectedKeyword = keywords.find((keyword) => keyword.word === selectedWord);
  const reviews = sentiment && selectedWord
    ? getReviewsForSentimentKeyword(sourceReviews, sentiment, selectedWord)
    : [];
  const details = sentiment ? sentimentDetails[sentiment] : null;

  return (
    <Dialog
      open={Boolean(sentiment)}
      onOpenChange={(open) => {
        if (!open) onOpenChange(false);
      }}
    >
      <DialogContent className={`dialog-card sentiment-detail-dialog${selectedWord ? " sentiment-detail-dialog-expanded" : ""}`}>
        {sentiment && details && (
          <>
            <div className="sentiment-dialog-heading">
              <span className={`sentiment-dialog-mark sentiment-dialog-mark-${details.tone}`}>
                <MessageSquareText size={19} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Voz do cliente · {sentiment}</p>
                <DialogTitle>{details.title}</DialogTitle>
                <DialogDescription className="dialog-copy">{details.description}</DialogDescription>
              </div>
            </div>

            <div className={`sentiment-detail-grid${selectedWord ? " has-selection" : ""}`}>
              <section className="sentiment-word-panel" aria-label="Nuvem de palavras">
                <div className="sentiment-panel-heading">
                  <div>
                    <h3>Palavras frequentes</h3>
                    <p>Selecione um termo para ver os comentários.</p>
                  </div>
                  <span>{keywords.length} termos</span>
                </div>
                <div className="sentiment-word-cloud">
                  <SentimentWordCloud
                    words={keywords}
                    selectedWord={selectedWord}
                    sentiment={details.tone}
                    width={selectedWord ? 370 : 620}
                    height={selectedWord ? 300 : 370}
                    onWordClick={(word) => setSelection((current) => current?.sentiment === sentiment && current.word === word ? null : { sentiment, word })}
                  />
                </div>
                {selectedWord ? (
                  <button className="sentiment-clear-selection" type="button" onClick={() => setSelection(null)}>
                    Limpar seleção
                  </button>
                ) : (
                  <p className="sentiment-dialog-note">O tamanho de cada palavra representa a frequência nas avaliações.</p>
                )}
              </section>

              {selectedKeyword && (
                <section className="sentiment-comments-panel" aria-live="polite">
                  <div className="sentiment-panel-heading sentiment-comments-heading">
                    <div>
                      <h3>Comentários com “{selectedKeyword.word}”</h3>
                      <p>{reviews.length} {reviews.length === 1 ? "comentário" : "comentários"} encontrados</p>
                    </div>
                    <span className="sentiment-comment-count">{reviews.length}</span>
                  </div>
                  <div className="sentiment-comments-list">
                    {reviews.map((review) => (
                      <article className="sentiment-review" key={review.id}>
                        <div className="sentiment-review-meta">
                          <span>{review.customer}</span>
                          <time>{review.date}</time>
                        </div>
                        <p>{review.comment}</p>
                        <span className={`sentiment-review-rating sentiment-review-rating-${details.tone}`}>
                          <Star size={12} fill="currentColor" aria-hidden="true" />
                          {review.rating}/5
                        </span>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
            <p className="sentiment-sample-note">{reviews.length} feedback(s) com esse termo</p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
