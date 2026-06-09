export default function HeroHeadline() {
  return (
    <h1
      className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-6"
      style={{ color: 'var(--melo-text)' }}
    >
      Welcome to{' '}
      <span
        className="italic"
        style={{
          background: 'linear-gradient(135deg, var(--melo-blush), var(--melo-lavender))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        melo
      </span>
    </h1>
  );
}
