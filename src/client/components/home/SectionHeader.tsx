interface SectionHeaderProps {
  eyebrow: string;
  eyebrowColor: string;
  title: React.ReactNode;
  subtitle?: string;
}

export default function SectionHeader({
  eyebrow,
  eyebrowColor,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: eyebrowColor }}
      >
        {eyebrow}
      </span>
      <h2
        className="font-display text-3xl sm:text-4xl font-semibold mt-1"
        style={{ color: 'var(--melo-text)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm" style={{ color: 'var(--melo-text-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
