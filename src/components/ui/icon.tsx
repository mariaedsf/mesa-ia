import {
  ArrowRight,
  ArrowUp,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  Clock3,
  ClockArrowUp,
  Coins,
  ChevronDown,
  ChevronRight,
  Download,
  Ellipsis,
  FileText,
  House,
  Info,
  Layers3,
  Menu,
  MessageCircle,
  Plus,
  ShoppingCart,
  SlidersHorizontal,
  Sparkle,
  Sparkles,
  SquareCheckBig,
  Star,
  Utensils,
  X,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

export type IconName =
  | "home"
  | "chart"
  | "sliders"
  | "check-square"
  | "utensils"
  | "star"
  | "file"
  | "sparkles"
  | "cart"
  | "clock"
  | "coins"
  | "bell"
  | "calendar"
  | "chevron-down"
  | "chevron-right"
  | "arrow-up"
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-down-right"
  | "layers"
  | "more"
  | "info"
  | "close"
  | "check"
  | "plus"
  | "menu"
  | "sparkle"
  | "download"
  | "clock-refresh"
  | "message";

const icons: Record<IconName, LucideIcon> = {
  home: House,
  chart: ChartNoAxesColumnIncreasing,
  sliders: SlidersHorizontal,
  "check-square": SquareCheckBig,
  utensils: Utensils,
  star: Star,
  file: FileText,
  sparkles: Sparkles,
  cart: ShoppingCart,
  clock: Clock3,
  coins: Coins,
  bell: Bell,
  calendar: CalendarDays,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "arrow-up": ArrowUp,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "arrow-down-right": ArrowDownRight,
  layers: Layers3,
  more: Ellipsis,
  info: Info,
  close: X,
  check: Check,
  plus: Plus,
  menu: Menu,
  sparkle: Sparkle,
  download: Download,
  "clock-refresh": ClockArrowUp,
  message: MessageCircle,
};

type IconProps = LucideProps & { name: IconName; size?: number };

export function Icon({ name, size = 20, strokeWidth = 1.7, ...props }: IconProps) {
  const IconComponent = icons[name];

  return (
    <IconComponent
      aria-hidden="true"
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}
