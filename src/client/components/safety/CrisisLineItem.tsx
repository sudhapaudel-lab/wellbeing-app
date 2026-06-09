import type { CrisisLine } from '../../types';

export default function CrisisLineItem({ name, number, note }: CrisisLine) {
  return (
    <li className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold" style={{ color: 'var(--melo-text)' }}>
          {name}
        </p>
        <p className="text-[11px]" style={{ color: 'var(--melo-text-muted)' }}>
          {note}
        </p>
      </div>
      <a
        href={`tel:${number.replace(/-/g, '')}`}
        className="text-sm font-bold px-3 py-1 rounded-full transition-colors"
        style={{
          background: 'white',
          color: 'var(--melo-blush)',
          border: '1.5px solid var(--melo-blush-light)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {number}
      </a>
    </li>
  );
}
