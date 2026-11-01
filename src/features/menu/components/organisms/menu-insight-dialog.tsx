import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { MenuInsight } from "../menu.shared";
import { menuClassName } from "../../tailwind-styles";

export function MenuInsightDialog({ insight, onClose }: { insight: MenuInsight | null; onClose: () => void }) {
  return (
    <Dialog open={Boolean(insight)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className={menuClassName("dialog-card menu-detail-dialog")} overlayClassName="modal-backdrop">
        {insight && (
          <>
            <span className={menuClassName("menu-dialog-sparkle")}><Sparkles size={21} /></span>
            <p className={menuClassName("eyebrow")}>Sugestão da MESA</p>
            <DialogTitle>{insight.title}</DialogTitle>
            <DialogDescription className={menuClassName("dialog-copy")}>
              {insight.description}
            </DialogDescription>
            <DialogClose render={<Button className={menuClassName("button button-primary dialog-action")} />}>Entendi</DialogClose>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
