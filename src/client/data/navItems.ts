import {
  Wind,
  Timer,
  Music,
  BotMessageSquare,
  Flame,
  Heart,
  NotebookPen,
} from "lucide-react";
import type { DropdownItem } from "../types";

export const SCREENING_ITEMS: DropdownItem[] = [
  {
    label: "Breathing Exercises",
    href: "/breathing-exercise",
    icon: Wind,
    external: false,
  },
  {
    label: "Focus Timer",
    href: "/focus-timer",
    icon: Timer,
    external: false,
  },
  {
    label: "Ambient Sound",
    href: "/ambient-sound",
    icon: Music,
    external: false,
  },
  {
    label: "AI Self Help",
    href: "/ai-self-help",
    icon: BotMessageSquare,
    external: false,
  },
];

export const MY_SPACE_ITEMS: DropdownItem[] = [
  {
    label: "Daily Intentions",
    href: "/daily-intentions",
    icon: Flame,
  },
  {
    label: "Gratitude Logs",
    href: "/gratitude-logs",
    icon: Heart,
  },
  {
    label: "Journals",
    href: "/journals",
    icon: NotebookPen,
  },
];
