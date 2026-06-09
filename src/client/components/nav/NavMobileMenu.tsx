import { SCREENING_ITEMS, MY_SPACE_ITEMS } from '../../data/navItems';

interface NavMobileMenuProps {
  open: boolean;
}

export default function NavMobileMenu({ open }: NavMobileMenuProps) {
  if (!open) return null;

  return (
    <div
      className="md:hidden border-t px-4 py-4 flex flex-col gap-2"
      style={{
        borderColor: 'var(--melo-border)',
        background: 'var(--melo-cream)',
      }}
    >
      <a href="/mood" className="nav-tab w-fit">
        Mood
      </a>

      <a
        href="https://screening.melo.com"
        className="nav-tab w-fit"
        target="_blank"
        rel="noopener noreferrer"
      >
        Screening
      </a>

      <p
        className="text-[10px] font-bold uppercase tracking-widest mt-3 mb-1"
        style={{ color: 'var(--melo-text-muted)' }}
      >
        Balance
      </p>
      {SCREENING_ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="nav-tab w-fit"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </a>
      ))}

      <p
        className="text-[10px] font-bold uppercase tracking-widest mt-3 mb-1"
        style={{ color: 'var(--melo-text-muted)' }}
      >
        My Space
      </p>
      {MY_SPACE_ITEMS.map((item) => (
        <a key={item.label} href={item.href} className="nav-tab w-fit">
          {item.label}
        </a>
      ))}

      <hr className="my-2" style={{ borderColor: 'var(--melo-border)' }} />
      <a href="/safety" className="nav-tab w-fit">
        Safety
      </a>
      <a
        href="/join"
        className="nav-tab w-fit"
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
