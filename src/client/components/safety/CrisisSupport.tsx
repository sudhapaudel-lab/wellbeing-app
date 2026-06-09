import { Phone } from 'lucide-react';
import CrisisLineItem from './CrisisLineItem';
import { CRISIS_LINES } from '../../data/safetyData';

export default function CrisisSupport() {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        background: 'rgba(212,116,140,0.07)',
        border: '1.5px solid var(--melo-blush-light)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Phone size={18} style={{ color: 'var(--melo-blush)' }} />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--melo-blush)' }}
        >
          Crisis &amp; Support Lines
        </span>
      </div>

      <p className="text-xs mb-4" style={{ color: 'var(--melo-text-muted)' }}>
        If you or someone you know is in crisis, please reach out immediately.
      </p>

      <ul className="space-y-3">
        {CRISIS_LINES.map((line) => (
          <CrisisLineItem key={line.name} {...line} />
        ))}
      </ul>

      <p className="text-[10px] mt-4 italic" style={{ color: 'var(--melo-text-muted)' }}>
        For immediate danger, call emergency services:{' '}
        <strong style={{ color: 'var(--melo-text)' }}>100 / 112</strong>
      </p>
    </div>
  );
}
