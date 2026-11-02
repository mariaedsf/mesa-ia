"use client";

import { reviewsClassName } from "../../tailwind-styles";

import { Check, CheckCircle2, Copy, LoaderCircle, MessageSquareText, Sparkles, Star, X } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import type { Review } from "@/features/reviews/data";

import { ReviewSentiment } from "../atoms/review-sentiment";

export function ReviewDetailDialog({
  review,
  onClose,
  onToggleAnswered,
  onGenerateResponse,
  responseDraft,
  isGenerating,
  responseError,
}: {
  review: Review | null;
  onClose: () => void;
  onToggleAnswered: (id: string) => void;
  onGenerateResponse: (id: string) => void;
  responseDraft: string | null;
  isGenerating: boolean;
  responseError: string | null;
}) {
  const [copyStatus, setCopyStatus] = useState<{ text: string; status: "copied" | "error" } | null>(null);
  const currentCopyStatus = copyStatus?.text === responseDraft ? copyStatus.status : null;

  async function copyDraft() {
    if (!responseDraft) return;
    try {
      await navigator.clipboard.writeText(responseDraft);
      setCopyStatus({ text: responseDraft, status: "copied" });
    } catch {
      setCopyStatus({ text: responseDraft, status: "error" });
    }
  }

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
          <Button
            className={reviewsClassName("reviews-ai-generate")}
            variant="outline"
            disabled={isGenerating || Boolean(responseDraft)}
            onClick={() => onGenerateResponse(review.id)}
          >
            {isGenerating ? <LoaderCircle className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {isGenerating ? "Gerando resposta..." : responseDraft ? "Resposta gerada" : "Gerar resposta com IA"}
          </Button>
          {responseError && <p className={reviewsClassName("reviews-ai-error")} role="alert">{responseError}</p>}
          {responseDraft && (
            <section className={reviewsClassName("reviews-ai-panel")} aria-live="polite">
              <div className={reviewsClassName("reviews-ai-heading")}>
                <Sparkles size={15} aria-hidden="true" />
                <strong>Rascunho sugerido</strong>
              </div>
              <p className={reviewsClassName("reviews-ai-draft")}>{responseDraft}</p>
              <div className={reviewsClassName("reviews-ai-copy-row")}>
                <Button className={reviewsClassName("reviews-ai-copy")} variant="outline" onClick={() => void copyDraft()}>
                  {currentCopyStatus === "copied" ? <Check size={14} /> : <Copy size={14} />}
                  {currentCopyStatus === "copied" ? "Copiado" : "Copiar resposta"}
                </Button>
                {currentCopyStatus === "error" && <small role="status">Não foi possível copiar. Selecione e copie o texto manualmente.</small>}
              </div>
            </section>
          )}
          <div className={reviewsClassName("reviews-detail-footer")}><span className={reviewsClassName(`reviews-response-status${review.answered ? " answered" : ""}`)}><i />{review.answered ? "Respondida" : "Aguardando resposta"}</span>
            <Button className={reviewsClassName(`reviews-response-button${review.answered ? " done" : ""}`)} onClick={() => onToggleAnswered(review.id)}>{review.answered ? <CheckCircle2 size={16} /> : <MessageSquareText size={16} />}{review.answered ? "Marcar como pendente" : "Marcar como respondida"}</Button>
          </div>
        </>}
      </DialogContent>
    </Dialog>
  );
}
