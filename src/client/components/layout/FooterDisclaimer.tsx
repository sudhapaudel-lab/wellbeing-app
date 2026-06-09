import { ShieldCheck } from 'lucide-react';

export default function FooterDisclaimer() {
  return (
    <div className="safety-banner p-4 flex gap-3 items-start mb-6">
      <ShieldCheck size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--melo-lavender)' }} />
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-1"
          style={{ color: 'var(--melo-lavender)' }}
        >
          Health &amp; Safety Notice
        </p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--melo-text-muted)' }}>
          Melo is a self-help wellness tool and is{' '}
          <strong>not a substitute for professional medical advice, diagnosis, or treatment.</strong>{' '}
          If you are experiencing a mental health crisis or emergency, please contact a qualified
          healthcare professional or your local emergency services immediately.
        </p>
      </div>
    </div>
  );
}
