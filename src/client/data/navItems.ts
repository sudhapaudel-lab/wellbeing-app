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
    href: "https://breathing.melo.com",
    icon: Wind,
    external: true,
  },
  {
    label: "Focus Timer",
    href: "https://focustimer.melo.com",
    icon: Timer,
    external: true,
  },
  {
    label: "Ambient Sound",
    href: "https://ambientsound.melo.com",
    icon: Music,
    external: true,
  },
  {
    label: "AI Self Help",
    href: "https://aiselfhelp.melo.com",
    icon: BotMessageSquare,
    external: true,
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
