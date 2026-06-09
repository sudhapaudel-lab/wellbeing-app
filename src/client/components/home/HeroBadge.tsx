import { Sparkles } from 'lucide-react';

export default function HeroBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
      style={{
        background: 'rgba(155,126,200,0.12)',
        color: 'var(--melo-lavender)',
        border: '1.5px solid var(--melo-lavender-lt)',
      }}
    >
      <Sparkles size={13} />
      Your gentle space for mental well-being
    </div>
  );
}
