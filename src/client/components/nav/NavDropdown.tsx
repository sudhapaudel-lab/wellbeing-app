import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import type { DropdownItem } from '../../types';

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  accentVar: string;       // CSS var name e.g. 'var(--melo-lavender)'
  borderVar: string;       // CSS var name e.g. 'var(--melo-lavender-lt)'
  iconColorVar: string;
}

export default function NavDropdown({
  label,
  items,
  accentVar,
  borderVar,
  iconColorVar,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="nav-group-btn"
        style={
          open
            ? { background: 'var(--melo-parchment)', color: accentVar, borderColor: borderVar }
            : {}
        }
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl z-50 overflow-hidden"
          style={{ border: `1.5px solid var(--melo-border)`, animation: 'fadeSlideDown 0.15s ease' }}
        >
          {/* Group label */}
          <div className="px-4 pt-3 pb-1">
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--melo-text-muted)' }}
            >
              {label}
            </span>
          </div>

          <ul className="py-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : '_self'}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors"
                    style={{ color: 'var(--melo-text)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--melo-parchment)')
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    onClick={() => setOpen(false)}
                  >
                    <Icon size={15} style={{ color: iconColorVar }} />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
