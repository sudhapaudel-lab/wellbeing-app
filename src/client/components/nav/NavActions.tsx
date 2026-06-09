import { ShieldCheck } from 'lucide-react';

export default function NavActions() {
  return (
    <div className="hidden md:flex items-center gap-2 shrink-0">
      <a
        href="/safety"
        className="nav-tab flex items-center gap-1.5"
        style={{ color: 'var(--melo-blush)' }}
      >
        <ShieldCheck size={15} />
        Safety
      </a>

      <a
        href="/join"
        className="nav-tab"
        style={{
          background: 'var(--melo-lavender)',
          color: 'white',
          borderColor: 'var(--melo-lavender)',
        }}
      >
        Join Melo
      </a>
    </div>
  );
}
