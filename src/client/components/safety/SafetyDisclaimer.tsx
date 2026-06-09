import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function SafetyDisclaimer() {
  return (
    <div className="safety-banner p-6 rounded-2xl flex flex-col gap-4">
      {/* Label */}
      <div className="flex items-center gap-2">
        <ShieldCheck size={20} style={{ color: 'var(--melo-lavender)' }} />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--melo-lavender)' }}
        >
          Health Standards Notice
        </span>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--melo-text)' }}>
        Melo is a <strong>wellness and self-help platform</strong> — not a medical service. The
        content, tools, and AI interactions on Melo are designed to support emotional well-being
        and healthy habits.
      </p>

      {/* Warning box */}
      <div
        className="flex items-start gap-2 p-3 rounded-xl text-xs"
        style={{ background: 'rgba(212,116,140,0.08)', color: 'var(--melo-text-muted)' }}
      >
        <AlertTriangle
          size={14}
          className="shrink-0 mt-0.5"
          style={{ color: 'var(--melo-blush)' }}
        />
        <span>
          <strong style={{ color: 'var(--melo-text)' }}>This is not professional advice.</strong>{' '}
          Melo does not provide clinical diagnosis, therapy, or medical treatment. Always consult
          a qualified mental health professional for clinical concerns.
        </span>
      </div>
    </div>
  );
}
