"use client";

import { reviewsClassName } from "../../tailwind-styles";

import { CheckCircle2, MessageSquareText, Star, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import type { Review } from "@/features/reviews/data";

import { ReviewSentiment } from "../atoms/review-sentiment";

export function ReviewDetailDialog({
  review,
  onClose,
  onToggleAnswered,
}: {
  review: Review | null;
  onClose: () => void;
  onToggleAnswered: (id: string) => void;
}) {
  return (
    <Dialog open={Boolean(review)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className={reviewsClassName("dialog-card reviews-detail-dialog")} overlayClassName="modal-backdrop" showCloseButton={false}>
        <DialogClose render={<Button className={reviewsClassName("dialog-close icon-button")} variant="ghost" size="icon" aria-label="Fechar detalhes" />}><X size={18} aria-hidden="true" /></DialogClose>
        {review && <>
          <span className={reviewsClassName(`reviews-detail-mark ${review.sentiment.toLowerCase()}`)}><MessageSquareText size={21} aria-hidden="true" /></span>
          <p className={reviewsClassName("eyebrow")}>Feedback recebido · {review.date}</p>
          <DialogTitle id="review-detail-title">Avaliação de {review.customer}</DialogTitle>
          <DialogDescription className={reviewsClassName("dialog-copy")}>Enviado pelo {review.channel} sobre {review.item}.</DialogDescription>
          <div className={reviewsClassName("reviews-detail-rating")} aria-label={`Nota ${review.rating} de 5`}>
            {Array.from({ length: 5 }, (_, index) => <Star key={index} size={18} fill={index < review.rating ? "currentColor" : "none"} aria-hidden="true" />)}
            <strong>{review.rating},0</strong><ReviewSentiment sentiment={review.sentiment} />
          </div>
          <blockquote className={reviewsClassName("reviews-detail-comment")}>“{review.comment}”</blockquote>
          <div className={reviewsClassName("reviews-detail-footer")}><span className={reviewsClassName(`reviews-response-status${review.answered ? " answered" : ""}`)}><i />{review.answered ? "Respondida" : "Aguardando resposta"}</span>
            <Button className={reviewsClassName(`reviews-response-button${review.answered ? " done" : ""}`)} onClick={() => onToggleAnswered(review.id)}>{review.answered ? <CheckCircle2 size={16} /> : <MessageSquareText size={16} />}{review.answered ? "Marcar como pendente" : "Marcar como respondida"}</Button>
          </div>
        </>}
      </DialogContent>
    </Dialog>
  );
}
