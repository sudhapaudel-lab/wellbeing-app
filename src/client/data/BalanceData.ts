import { Wind, Timer, Music, BotMessageSquare } from "lucide-react";
import type { FeatureCard } from "../types";

export const BALANCE_FEATURES: FeatureCard[] = [
  {
    icon: Wind,
    title: "Breathing Exercises",
    description:
      "Guided breathwork to calm your nervous system and reduce stress in minutes.",
    href: "https://breathing.melo.com",
    color: "var(--melo-sage)",
    bg: "rgba(138,175,142,0.10)",
    border: "var(--melo-sage-light)",
    tag: "breathing.melo.com",
  },
  {
    icon: Timer,
    title: "Focus Timer",
    description:
      "Pomodoro-style timer to help you stay present, productive, and grounded.",
    href: "https://focustimer.melo.com",
    color: "var(--melo-gold)",
    bg: "rgba(212,168,71,0.10)",
    border: "var(--melo-gold-light)",
    tag: "focustimer.melo.com",
  },
  {
    icon: Music,
    title: "Ambient Sound",
    description:
      "Curated soundscapes — rain, forest, ocean — to ease your mind and aid focus.",
    href: "https://ambientsound.melo.com",
    color: "var(--melo-lavender)",
    bg: "rgba(155,126,200,0.10)",
    border: "var(--melo-lavender-lt)",
    tag: "ambientsound.melo.com",
  },
  {
    icon: BotMessageSquare,
    title: "AI Self Help",
    description:
      "A compassionate AI companion for reflective conversations and self-discovery.",
    href: "https://aiselfhelp.melo.com",
    color: "var(--melo-blush)",
    bg: "rgba(212,116,140,0.10)",
    border: "var(--melo-blush-light)",
    tag: "aiselfhelp.melo.com",
  },
];
