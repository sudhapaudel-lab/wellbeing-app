import { ArrowRight } from 'lucide-react';

export default function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href="/join"
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-100"
        style={{
          background: 'linear-gradient(135deg, var(--melo-blush), var(--melo-lavender))',
          boxShadow: '0 4px 20px rgba(212,116,140,0.3)',
        }}
      >
        Begin your journey
        <ArrowRight size={17} />
      </a>

      <a
        href="/mood"
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all"
        style={{
          background: 'white',
          color: 'var(--melo-text)',
          border: '1.5px solid var(--melo-border)',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = 'var(--melo-parchment)')
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
      >
        Explore Mood
      </a>
    </div>
  );
}
