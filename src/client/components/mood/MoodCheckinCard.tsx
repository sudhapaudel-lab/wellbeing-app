// Multi-step mood check-in flow:
//   Step 1 — Mood slider
//   Step 2 — Emotion tags  (+ "own words" input)
//   Step 3 — Journal prompt (max 50 chars, countdown)
//   Step 4 — Well-being tools
//
// Layout per step:
//   mobile  → full-width card, stacked
//   lg+     → left calm-message panel | right interactive card
//
// Step 3: single-line input, no skip, Save disabled unless at least one field filled
// Step 4: Explore Well-being Tools + Back to Home buttons

import { useState } from 'react';
import {
  ArrowLeft, Sun, Check,
  ExternalLink, RotateCcw, Home, Compass,
} from 'lucide-react';
import {
  MOOD_SCORE_LABELS,
  MOOD_SCORE_EMOJI,
  EMOTION_LIST,
  JOURNAL_PROMPTS,
  STEP_MESSAGES,
  WELLBEING_TOOLS,
} from '../../data/moodData';

const JOURNAL_MAX = 50;
const TOTAL_STEPS = 4;

// ─── tiny helpers ────────────────────────────────────────────────────────────

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <span
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width:      i + 1 === step ? '20px' : '7px',
            height:     '7px',
            background: i + 1 <= step
              ? 'var(--melo-blush)'
              : 'var(--melo-border)',
          }}
        />
      ))}
    </div>
  );
}

interface StepNavProps {
  step:       number;
  onBack:     () => void;
  onNext:     () => void;
  onSkip:     () => void;
  nextLabel?: string;
  hideSkip?:  boolean;
}

function StepNav({ step, onBack, onNext, onSkip, nextLabel = 'Next', hideSkip }: StepNavProps) {
  return (
    <div className="flex items-center justify-between mt-7">
      {/* Back arrow */}
      <button
        type="button"
        onClick={onBack}
        disabled={step === 1}
        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all"
        style={{
          color:       step === 1 ? 'var(--melo-border)' : 'var(--melo-text-muted)',
          background:  'transparent',
          border:      `1.5px solid ${step === 1 ? 'var(--melo-border)' : 'var(--melo-border)'}`,
          cursor:      step === 1 ? 'not-allowed' : 'pointer',
        }}
        aria-label="Go back"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {/* Next + Skip */}
      <div className="flex items-center gap-2">
        {!hideSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-sm font-medium px-4 py-2 rounded-full transition-all"
            style={{
              color:      'var(--melo-text-muted)',
              background: 'transparent',
              border:     '1.5px solid var(--melo-border)',
            }}
          >
            Skip
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="text-sm font-semibold px-5 py-2 rounded-full transition-all"
          style={{
            background: 'linear-gradient(135deg, var(--melo-blush), var(--melo-lavender))',
            color:      '#fff',
            border:     'none',
            boxShadow:  '0 3px 14px rgba(212,116,140,.28)',
          }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

// ─── Left calm-message panel ─────────────────────────────────────────────────

function CalmPanel({ step }: { step: number }) {
  const msg = STEP_MESSAGES[step];
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <div
      className="hidden lg:flex flex-col justify-between rounded-3xl p-8 min-h-full"
      style={{
        background: 'linear-gradient(160deg, rgba(212,116,140,0.08) 0%, rgba(155,126,200,0.10) 60%, rgba(138,175,142,0.10) 100%)',
        border:     '1.5px solid var(--melo-border)',
      }}
    >
      <div>
        {/* Date + check-in label */}
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--melo-text-muted)' }}>
          Today's Check-in
        </p>
        <p className="font-display text-xl font-medium mb-8" style={{ color: 'var(--melo-text)' }}>
          {today}
        </p>

        {/* Calming message */}
        <h2
          className="font-display text-2xl font-semibold leading-snug mb-4"
          style={{ color: 'var(--melo-text)' }}
        >
          {msg.title}
        </h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--melo-text-muted)' }}>
          {msg.body}
        </p>
      </div>

      {/* Decorative floral blobs */}
      <div className="relative h-32 mt-8 overflow-hidden rounded-2xl opacity-50" aria-hidden="true">
        <div className="absolute top-0 left-0 w-20 h-20 rounded-full blur-2xl" style={{ background: 'var(--melo-blush-light)' }} />
        <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-2xl" style={{ background: 'var(--melo-lavender-lt)' }} />
        <div className="absolute top-4 right-8 w-16 h-16 rounded-full blur-2xl" style={{ background: 'var(--melo-sage-light)' }} />
      </div>
    </div>
  );
}

// ─── Step 1: Mood Slider ──────────────────────────────────────────────────────

interface Step1Props {
  score:    number;
  onChange: (v: number) => void;
  onNext:   () => void;
  onSkip:   () => void;
}

function Step1({ score, onChange, onNext, onSkip }: Step1Props) {
  const pct   = ((score - 1) / 9) * 100;
  const emoji = MOOD_SCORE_EMOJI[score];
  const label = MOOD_SCORE_LABELS[score];

  return (
    <div>
      <ProgressDots step={1} />

      {/* Mobile-only header */}
      <div className="lg:hidden mb-5">
        <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--melo-text-muted)' }}>
          Today's Check-in
        </p>
        <p className="font-display text-xl font-medium" style={{ color: 'var(--melo-text)' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
      </div>

      <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--melo-blush)' }}>
        Step 1 of 3
      </p>
      <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--melo-text)' }}>
        How are you feeling right now?
      </h3>

      {/* Score + emoji */}
      <div
        className="flex items-center justify-between px-5 py-4 rounded-2xl mb-6"
        style={{ background: 'var(--melo-parchment)', border: '1.5px solid var(--melo-border)' }}
      >
        <span className="text-3xl">{emoji}</span>
        <div className="text-right">
          <span className="font-display font-semibold" style={{ fontSize: '2.4rem', color: 'var(--melo-text)', lineHeight: 1 }}>
            {score}
          </span>
          <span className="text-sm ml-1" style={{ color: 'var(--melo-text-muted)' }}>/10</span>
          <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--melo-text-muted)' }}>{label}</p>
        </div>
      </div>

      {/* Slider */}
      <style>{`
        .melo-range::-webkit-slider-thumb {
          -webkit-appearance:none; width:20px; height:20px;
          border-radius:50%; background:#fff;
          border:2.5px solid #8AAF8E;
          box-shadow:0 1px 5px rgba(0,0,0,.14); cursor:pointer;
        }
        .melo-range::-moz-range-thumb {
          width:20px; height:20px; border-radius:50%; background:#fff;
          border:2.5px solid #8AAF8E; cursor:pointer;
        }
      `}</style>
      <input
        type="range" min={1} max={10} step={1} value={score}
        onChange={(e) => onChange(+e.target.value)}
        className="melo-range w-full appearance-none cursor-pointer mb-2"
        style={{
          height: '4px', borderRadius: '2px', border: 'none', outline: 'none',
          background: `linear-gradient(90deg,#8AAF8E ${pct}%,var(--melo-border) ${pct}%)`,
        }}
      />
      <div className="flex justify-between">
        <span className="text-xs" style={{ color: 'var(--melo-text-muted)' }}>Struggling</span>
        <span className="text-xs" style={{ color: 'var(--melo-text-muted)' }}>Feeling great</span>
      </div>

      <StepNav step={1} onBack={() => {}} onNext={onNext} onSkip={onSkip} nextLabel="Next →" />
    </div>
  );
}

// ─── Step 2: Emotion Tags ────────────────────────────────────────────────────

interface Step2Props {
  selected:    string[];
  ownWords:    string;
  onToggle:    (e: string) => void;
  onReset:     () => void;
  onOwnWords:  (v: string) => void;
  onBack:      () => void;
  onNext:      () => void;
  onSkip:      () => void;
}

function Step2({ selected, ownWords, onToggle, onReset, onOwnWords, onBack, onNext, onSkip }: Step2Props) {
  return (
    <div>
      <ProgressDots step={2} />

      <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--melo-lavender)' }}>
        Step 2 of 3
      </p>
      <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--melo-text)' }}>
        How would you describe your feeling?
      </h3>
      <p className="text-sm mb-5" style={{ color: 'var(--melo-text-muted)' }}>
        Pick as many as feel right — or write your own words below.
      </p>

      {/* Tag grid */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--melo-text-muted)' }}>
          Emotion tags
        </span>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all"
          style={{ border: '1.5px solid var(--melo-border)', color: 'var(--melo-text-muted)', background: 'transparent' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--melo-blush-light)'; e.currentTarget.style.color = 'var(--melo-blush)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--melo-border)'; e.currentTarget.style.color = 'var(--melo-text-muted)'; }}
          aria-label="Reset emotion tags"
        >
          <RotateCcw size={11} /> Reset
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {EMOTION_LIST.map((emotion) => {
          const active = selected.includes(emotion);
          return (
            <button
              key={emotion}
              type="button"
              onClick={() => onToggle(emotion)}
              className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150"
              style={{
                background:  active ? 'var(--melo-sage)' : 'transparent',
                color:       active ? '#fff' : 'var(--melo-text)',
                border:      `1.5px solid ${active ? 'var(--melo-sage)' : 'var(--melo-border)'}`,
                boxShadow:   active ? '0 2px 8px rgba(138,175,142,.28)' : 'none',
              }}
            >
              {emotion}
            </button>
          );
        })}
      </div>

      {/* Own words */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--melo-text-muted)' }}>
          Or in your own words
        </p>
        <input
          type="text"
          value={ownWords}
          onChange={(e) => onOwnWords(e.target.value)}
          placeholder="e.g. scattered, tender, numb…"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
          style={{
            background: 'var(--melo-parchment)',
            border: '1.5px solid var(--melo-border)',
            color: 'var(--melo-text)',
            fontFamily: 'var(--font-body)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--melo-sage-light)')}
          onBlur={(e)  => (e.target.style.borderColor = 'var(--melo-border)')}
        />
      </div>

      <StepNav step={2} onBack={onBack} onNext={onNext} onSkip={onSkip} nextLabel="Next →" />
    </div>
  );
}

// ─── Step 3: Journal Prompt ──────────────────────────────────────────────────

interface Step3Props {
  entry:        string;
  onChange:     (v: string) => void;
  onBack:       () => void;
  onSave:       () => void;
  canSave:      boolean;
}

function Step3({ entry, onChange, onBack, onSave, canSave }: Step3Props) {
  const remaining = JOURNAL_MAX - entry.length;
  const prompt = JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
  const [currentPrompt] = useState(prompt);

  return (
    <div>
      <ProgressDots step={3} />

      <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--melo-sage)' }}>
        Step 3 of 3
      </p>
      <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--melo-text)' }}>
        What's on your mind?
      </h3>
      <p className="text-sm mb-5" style={{ color: 'var(--melo-text-muted)' }}>
        No pressure — pour it out.
      </p>

      {/* Prompt banner */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-4"
        style={{ background: 'rgba(138,175,142,0.10)', border: '1.5px solid rgba(138,175,142,0.28)' }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(138,175,142,0.22)' }}
        >
          <Sun size={14} style={{ color: 'var(--melo-sage)' }} />
        </div>
        <div>
          <p className="text-xs font-bold" style={{ color: 'var(--melo-text)' }}>Journal prompt</p>
          <p className="text-xs" style={{ color: 'var(--melo-text-muted)' }}>{currentPrompt}</p>
        </div>
      </div>

      {/* Single-line input */}
      <input
        type="text"
        value={entry}
        onChange={(e) => onChange(e.target.value.slice(0, JOURNAL_MAX))}
        maxLength={JOURNAL_MAX}
        placeholder="Write freely…"
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
        style={{
          background:  'var(--melo-parchment)',
          border:      '1.5px solid var(--melo-border)',
          color:       'var(--melo-text)',
          fontFamily:  'var(--font-body)',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--melo-sage-light)')}
        onBlur={(e)  => (e.target.style.borderColor = 'var(--melo-border)')}
      />
      <p
        className="text-right text-xs mt-1 font-medium"
        style={{ color: remaining <= 10 ? 'var(--melo-blush)' : 'var(--melo-text-muted)' }}
      >
        {remaining} / {JOURNAL_MAX}
      </p>

      {/* Step 3 nav: Back on left, Save on right — no Skip */}
      <div className="flex items-center justify-between mt-7">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all"
          style={{ color: 'var(--melo-text-muted)', border: '1.5px solid var(--melo-border)', background: 'transparent' }}
        >
          <ArrowLeft size={15} /> Back
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={!canSave}
          className="flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full transition-all"
          style={{
            background: canSave
              ? 'linear-gradient(135deg, var(--melo-blush), var(--melo-lavender))'
              : 'var(--melo-border)',
            color:     canSave ? '#fff' : 'var(--melo-text-muted)',
            border:    'none',
            boxShadow: canSave ? '0 3px 14px rgba(212,116,140,.28)' : 'none',
            cursor:    canSave ? 'pointer' : 'not-allowed',
          }}
          title={!canSave ? 'Please fill in at least one field above to save' : ''}
        >
          <Check size={15} /> Save
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Well-being Tools ────────────────────────────────────────────────

interface Step4Props {
  onBack: () => void;
}

function Step4({ onBack }: Step4Props) {
  return (
    <div>
      <ProgressDots step={4} />

      {/* Success badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
        style={{ background: 'rgba(138,175,142,0.15)', color: 'var(--melo-sage)', border: '1.5px solid var(--melo-sage-light)' }}
      >
        <Check size={13} />
        Check-in saved
      </div>

      <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--melo-text)' }}>
        Explore Well-being Tools
      </h3>
      <p className="text-sm mb-6" style={{ color: 'var(--melo-text-muted)' }}>
        These gentle tools are here whenever you need a moment of calm.
      </p>

      {/* Tool grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {WELLBEING_TOOLS.map((tool) => (
          <a
            key={tool.title}
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-4 rounded-2xl transition-all group"
            style={{
              background:   tool.bg,
              border:       '1.5px solid var(--melo-border)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <span className="text-2xl">{tool.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold flex items-center gap-1" style={{ color: 'var(--melo-text)' }}>
                {tool.title}
                <ExternalLink size={11} className="opacity-0 group-hover:opacity-50 transition-opacity" style={{ color: tool.color }} />
              </p>
              <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--melo-text-muted)' }}>
                {tool.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Step 4 nav: Back on left | Explore + Home on right */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        {/* Explore Well-being Tools — primary CTA */}
        <a
          href="/screening"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all"
          style={{
            background: 'linear-gradient(135deg, var(--melo-blush), var(--melo-lavender))',
            color: '#fff',
            border: 'none',
            boxShadow: '0 3px 14px rgba(212,116,140,.25)',
            textDecoration: 'none',
          }}
        >
          <Compass size={16} /> Explore Well-being Tools
        </a>
        {/* Back to Home */}
        <a
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium px-5 py-3 rounded-2xl transition-all"
          style={{
            color: 'var(--melo-text-muted)',
            border: '1.5px solid var(--melo-border)',
            background: 'transparent',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--melo-blush-light)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--melo-blush)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--melo-border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--melo-text-muted)'; }}
        >
          <Home size={15} /> Back to Home
        </a>
      </div>
    </div>
  );
}

// ─── Root: MoodCheckinCard ────────────────────────────────────────────────────

export default function MoodCheckinCard() {
  const [step,      setStep]      = useState(1);
  const [score,     setScore]     = useState(6);
  const [selected,  setSelected]  = useState<string[]>([]);
  const [ownWords,  setOwnWords]  = useState('');
  const [entry,     setEntry]     = useState('');

  const goNext  = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goBack  = () => setStep((s) => Math.max(s - 1, 1));
  const goSkip  = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));

  // Save is enabled if at least one of: emotion selected, own words filled, journal entry filled
  const canSave = selected.length > 0 || ownWords.trim().length > 0 || entry.trim().length > 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Two-panel layout: calm message (lg left) | step card (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">

        {/* LEFT — calm message, desktop only */}
        <div className="lg:col-span-2">
          <CalmPanel step={step} />
        </div>

        {/* RIGHT — interactive step card */}
        <div className="lg:col-span-3">
          {/* Mobile top: date + calm message */}
          <div
            className="lg:hidden rounded-2xl px-5 py-4 mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(212,116,140,0.07), rgba(155,126,200,0.07))',
              border: '1.5px solid var(--melo-border)',
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--melo-text-muted)' }}>
              Today's Check-in
            </p>
            <p className="font-display text-base font-medium mb-2" style={{ color: 'var(--melo-text)' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <p className="text-sm leading-relaxed italic" style={{ color: 'var(--melo-text-muted)' }}>
              {STEP_MESSAGES[step].title}
            </p>
          </div>

          {/* Step card */}
          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{
              background: '#ffffff',
              border:     '1.5px solid var(--melo-border)',
              boxShadow:  '0 8px 40px rgba(155,126,200,0.08)',
            }}
          >
            {step === 1 && (
              <Step1
                score={score}
                onChange={(v) => setScore(v)}
                onNext={goNext}
                onSkip={goSkip}
              />
            )}
            {step === 2 && (
              <Step2
                selected={selected}
                ownWords={ownWords}
                onToggle={(e) => setSelected((prev) =>
                  prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
                )}
                onReset={() => { setSelected([]); setOwnWords(''); }}
                onOwnWords={setOwnWords}
                onBack={goBack}
                onNext={goNext}
                onSkip={goSkip}
              />
            )}
            {step === 3 && (
              <Step3
                entry={entry}
                onChange={setEntry}
                onBack={goBack}
                onSave={goNext}
                canSave={canSave}
              />
            )}
            {step === 4 && (
              <Step4 onBack={goBack} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
