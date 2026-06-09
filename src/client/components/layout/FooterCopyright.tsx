import { Heart } from 'lucide-react';

export default function FooterCopyright() {
  const year = new Date().getFullYear();
  return (
    <p
      className="text-xs flex items-center gap-1"
      style={{ color: 'var(--melo-text-muted)' }}
    >
      © {year} Melo. Made with{' '}
      <Heart size={11} className="inline" style={{ color: 'var(--melo-blush)' }} />{' '}
      for your well-being.
    </p>
  );
}
