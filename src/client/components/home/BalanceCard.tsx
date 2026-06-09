import { ExternalLink } from 'lucide-react';
import type { FeatureCard } from '../../types';

export default function BalanceCard({ icon: Icon, title, description, href, color, bg, border, tag }: FeatureCard) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="melo-card p-5 flex flex-col gap-3 group"
      style={{ background: bg, borderColor: border }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: 'white', border: `1.5px solid ${border}` }}
      >
        <Icon size={20} style={{ color }} />
      </div>

      {/* Text */}
      <div>
        <h3
          className="font-semibold text-sm mb-1 flex items-center gap-1"
          style={{ color: 'var(--melo-text)' }}
        >
          {title}
          <ExternalLink
            size={11}
            className="opacity-0 group-hover:opacity-60 transition-opacity"
            style={{ color }}
          />
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--melo-text-muted)' }}>
          {description}
        </p>
      </div>

      {/* URL tag */}
      {tag && (
        <span
          className="text-[10px] font-mono mt-auto"
          style={{ color: 'var(--melo-text-muted)' }}
        >
          {tag}
        </span>
      )}
    </a>
  );
}
