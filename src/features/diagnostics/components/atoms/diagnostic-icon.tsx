import { type RootCauseIcon } from "@/features/diagnostics/data";

import { iconMap } from "../list.shared";

export function DiagnosticIcon({ name, size = 21 }: { name: RootCauseIcon; size?: number }) { const IconComponent = iconMap[name]; return <IconComponent aria-hidden="true" size={size} strokeWidth={1.8} />; }
