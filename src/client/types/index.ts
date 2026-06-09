// ── Shared Types for Melo ─────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface DropdownItem extends NavItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface MoodStop {
  value: number;
  label: string;
  emoji: string;
  color: string;
}

export interface CrisisLine {
  name: string;
  number: string;
  note: string;
}

export interface FeatureCard {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  href: string;
  color: string;
  bg: string;
  border: string;
  tag?: string;
}
