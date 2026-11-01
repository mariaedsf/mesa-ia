import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { MenuItem } from "../menu.shared";
import { menuClassName } from "../../tailwind-styles";
import { MenuItemThumbnail } from "../atoms/menu-item-thumbnail";

export function MenuItemDetailDialog({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  return (
    <Dialog open={Boolean(item)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className={menuClassName("dialog-card menu-detail-dialog")} overlayClassName="modal-backdrop">
        {item && (
          <>
            <span className={menuClassName("menu-detail-thumbnail")}><MenuItemThumbnail item={item} /></span>
            <p className={menuClassName("eyebrow")}>{item.category}</p>
            <DialogTitle>{item.name}</DialogTitle>
            <DialogDescription className={menuClassName("dialog-copy")}>
              Este prato teve {item.orders} pedidos nesta semana, avaliação média de {item.rating} e margem atual de {item.margin}.
            </DialogDescription>
            <div className={menuClassName("menu-detail-stats")}>
              <span><strong>{item.orders}</strong><small>pedidos</small></span>
              <span><strong>{item.rating}</strong><small>nota média</small></span>
              <span><strong>{item.margin}</strong><small>margem</small></span>
            </div>
            <DialogClose render={<Button className={menuClassName("button button-secondary dialog-action")} variant="outline" />}>Fechar</DialogClose>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
