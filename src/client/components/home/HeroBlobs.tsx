export default function HeroBlobs() {
  return (
    <>
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: 'var(--melo-lavender-lt)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: 'var(--melo-blush-light)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'var(--melo-gold-light)' }}
        aria-hidden="true"
      />
    </>
  );
}
