import { Flame, Heart, NotebookPen } from "lucide-react";
import type { FeatureCard } from "../types";

export const MY_SPACE_FEATURES: FeatureCard[] = [
  {
    icon: Flame,
    title: "Daily Intentions",
    description:
      "Start each day with purpose. Set a gentle intention that guides your mindset and actions.",
    href: "/daily-intentions",
    color: "var(--melo-blush)",
    bg: "rgba(212,116,140,0.07)",
    border: "var(--melo-blush-light)",
    tag: "melo.com/daily-intentions",
  },
  {
    icon: Heart,
    title: "Gratitude Logs",
    description:
      "Cultivate appreciation for life's small joys. A few lines each day can shift your whole perspective.",
    href: "/gratitude-logs",
    color: "var(--melo-mauve)",
    bg: "rgba(184,96,138,0.07)",
    border: "rgba(184,96,138,0.3)",
    tag: "melo.com/gratitude-logs",
  },
  {
    icon: NotebookPen,
    title: "Journals",
    description:
      "Your private space to write freely — thoughts, feelings, dreams. Unfiltered and entirely yours.",
    href: "/journals",
    color: "var(--melo-lavender)",
    bg: "rgba(155,126,200,0.07)",
    border: "var(--melo-lavender-lt)",
    tag: "melo.com/journals",
  },
];
