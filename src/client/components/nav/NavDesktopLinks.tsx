import NavDropdown from './NavDropdown';
import { SCREENING_ITEMS, MY_SPACE_ITEMS } from '../../data/navItems';

interface NavDesktopLinksProps {
  currentPath: string;
}

export default function NavDesktopLinks({ currentPath }: NavDesktopLinksProps) {
  return (
    <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
      {/* Mood — direct tab */}
      <a
        href="/mood"
        className={`nav-tab ${currentPath.startsWith('/mood') ? 'active' : ''}`}
      >
        Mood
      </a>

      {/* Screening — direct external link */}
      <a
        href="https://screening.melo.com"
        className="nav-tab"
        target="_blank"
        rel="noopener noreferrer"
      >
        Screening
      </a>

      {/* Balance dropdown — opens balance.melo.com sub-sites */}
      <NavDropdown
        label="Balance"
        items={SCREENING_ITEMS}
        accentVar="var(--melo-lavender)"
        borderVar="var(--melo-lavender-lt)"
        iconColorVar="var(--melo-lavender)"
      />

      {/* My Space dropdown — melo.com/groupitemname routes */}
      <NavDropdown
        label="My Space"
        items={MY_SPACE_ITEMS}
        accentVar="var(--melo-sage)"
        borderVar="var(--melo-sage-light)"
        iconColorVar="var(--melo-sage)"
      />
    </div>
  );
}
