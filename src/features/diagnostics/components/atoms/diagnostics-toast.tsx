import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DiagnosticsToast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="diagnostics-toast" role="status" aria-live="polite"><span><Check size={16} aria-hidden="true" /></span>{message}<Button variant="ghost" size="icon-xs" aria-label="Fechar aviso" onClick={onClose}><span aria-hidden="true">×</span></Button></div>;
}
