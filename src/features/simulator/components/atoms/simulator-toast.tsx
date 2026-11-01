import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SimulatorToast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="simulator-toast" role="status" aria-live="polite"><span><Check size={16} aria-hidden="true" /></span>{message}<Button variant="ghost" size="icon-xs" aria-label="Fechar aviso" onClick={onClose}>×</Button></div>;
}
