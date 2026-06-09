const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use',   href: '/terms' },
  { label: 'Safety',         href: '/safety' },
  { label: 'Contact',        href: '/contact' },
];

export default function FooterLinks() {
  return (
    <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'var(--melo-text-muted)' }}>
      {FOOTER_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="hover:underline transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--melo-blush)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--melo-text-muted)')}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
