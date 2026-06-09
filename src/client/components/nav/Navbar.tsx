import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavLogo from './NavLogo';
import NavDesktopLinks from './NavDesktopLinks';
import NavActions from './NavActions';
import NavMobileMenu from './NavMobileMenu';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: 'rgba(249,246,241,0.88)',
        borderBottom: '1.5px solid var(--melo-border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <NavLogo />
        <NavDesktopLinks currentPath={currentPath} />
        <NavActions />

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl transition-colors"
          style={{ color: 'var(--melo-blush)' }}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <NavMobileMenu open={mobileOpen} />
    </header>
  );
}
