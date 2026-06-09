import { ArrowRight } from 'lucide-react';
import type { FeatureCard } from '../../types';

export default function MySpaceCard({
  icon: Icon,
  title,
  description,
  href,
  color,
  bg,
  border,
  tag,
}: FeatureCard) {
  return (
    <a
      href={href}
      className="melo-card p-6 flex flex-col gap-4 group"
      style={{ background: bg, borderColor: border }}
    >
      {/* Icon + URL tag row */}
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: 'white', border: `1.5px solid ${border}` }}
        >
          <Icon size={21} style={{ color }} />
        </div>

        {tag && (
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.6)',
              color: 'var(--melo-text-muted)',
              border: '1px solid var(--melo-border)',
            }}
          >
            {tag}
          </span>
        )}
      </div>

      {/* Body text */}
      <div className="flex-1">
        <h3
          className="font-display text-lg font-semibold mb-2"
          style={{ color: 'var(--melo-text)' }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--melo-text-muted)' }}>
          {description}
        </p>
      </div>

      {/* Arrow link */}
      <div
        className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
        style={{ color }}
      >
        Open {title}
        <ArrowRight size={13} />
      </div>
    </a>
  );
}
