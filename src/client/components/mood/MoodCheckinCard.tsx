import React, { useState } from 'react';
import { RefreshCw, Sun, Check } from 'lucide-react';
import {
  MOOD_SCORE_EMOJI,
  EMOTION_LIST,
  JOURNAL_PROMPTS,
} from '../../data/moodData';

const JOURNAL_MAX = 50;

function CheckinHeader() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--melo-text-muted)' }}>
        Today's Check-in
      </p>
      <p className="font-display text-2xl font-medium" style={{ color: 'var(--melo-text)' }}>{today}</p>
    </div>
  );
}

function SliderSection({ score, onChange }: { score: number; onChange: (v: number) => void }) {
  const pct = ((score - 1) / 9) * 100;
  const emoji = MOOD_SCORE_EMOJI[score] ?? '🙂';
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-base font-semibold" style={{ color: 'var(--melo-text)' }}>How are you feeling?</span>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', top: -14, left: -8, fontSize: 20 }}>{emoji}</div>
          <div className="flex items-baseline gap-1 ml-6">
            <span className="font-display font-medium" style={{ fontSize: '2.2rem', color: 'var(--melo-text)', lineHeight: 1 }}>{score}</span>
            <span className="text-sm" style={{ color: 'var(--melo-text-muted)' }}>/10</span>
          </div>
        </div>
      </div>

      <input
        type="range" min={1} max={10} step={1}
        value={score}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none h-2 rounded-full"
        style={{ background: `linear-gradient(90deg, #8AAF8E ${pct}%, var(--melo-border) ${pct}%)` }}
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-xs" style={{ color: 'var(--melo-text-muted)' }}>Struggling</span>
        <span className="text-xs" style={{ color: 'var(--melo-text-muted)' }}>Feeling great</span>
      </div>
    </div>
  );
}

function EmotionSection({ selected, onToggle, onReset }: { selected: string[]; onToggle: (e: string) => void; onReset: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-base font-semibold" style={{ color: 'var(--melo-text)' }}>How would you describe it?</span>
        <button type="button" onClick={onReset} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors" style={{ border: '1.5px solid var(--melo-border)', color: 'var(--melo-text-muted)', background: 'transparent' }}>
          <RefreshCw size={12} />
          Reset
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {EMOTION_LIST.map((emotion) => {
          const active = selected.includes(emotion);
          return (
            <button key={emotion} type="button" onClick={() => onToggle(emotion)} className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150"
              style={{ background: active ? 'var(--melo-sage)' : 'transparent', color: active ? '#fff' : 'var(--melo-text)', border: `1.5px solid ${active ? 'var(--melo-sage)' : 'var(--melo-border)'}` }}>
              {emotion}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function JournalSection({ promptIndex, entry, setEntry }: { promptIndex: number; entry: string; setEntry: (v: string) => void }) {
  const remaining = JOURNAL_MAX - entry.length;
  const prompt = JOURNAL_PROMPTS[promptIndex % JOURNAL_PROMPTS.length] ?? 'What would help you right now?';
  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-3" style={{ background: 'rgba(138,175,142,0.10)', border: '1.5px solid rgba(138,175,142,0.28)' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(138,175,142,0.22)' }}>
          <Sun size={15} style={{ color: 'var(--melo-sage)' }} />
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: 'var(--melo-text)' }}>Journal prompt</p>
          <p className="text-xs" style={{ color: 'var(--melo-text-muted)' }}>{prompt}</p>
        </div>
      </div>

      <textarea value={entry} onChange={(e) => setEntry(e.target.value.slice(0, JOURNAL_MAX))} maxLength={JOURNAL_MAX} placeholder="Write freely…" rows={4}
        className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-colors" style={{ background: 'var(--melo-parchment)', border: '1.5px solid var(--melo-border)', color: 'var(--melo-text)' }} />

      <p className="text-right text-xs mt-1 font-medium" style={{ color: remaining <= 5 ? 'var(--melo-blush)' : 'var(--melo-text-muted)' }}>{remaining} remaining</p>
    </div>
  );
}

export default function MoodCheckinCard() {
  const [score, setScore] = useState<number>(6);
  const [selected, setSelected] = useState<string[]>([]);
  const [entry, setEntry] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);
  const promptIndex = 0;

  function toggleEmotion(emotion: string) {
    setSaved(false);
    setSelected((prev) => (prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]));
  }
  function resetEmotions() { setSelected([]); setSaved(false); }
  function handleScoreChange(v: number) { setScore(v); setSaved(false); }
  function handleSave() { setSaved(true); /* TODO: send to API */ }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="rounded-3xl p-6 sm:p-8" style={{ background: '#ffffff', border: '1.5px solid var(--melo-border)', boxShadow: '0 8px 40px rgba(155,126,200,0.06)' }}>
        <CheckinHeader />

        <hr className="my-5" style={{ border: 'none', height: 1, background: 'var(--melo-border)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-5">
          <SliderSection score={score} onChange={handleScoreChange} />
          <EmotionSection selected={selected} onToggle={toggleEmotion} onReset={resetEmotions} />
          <JournalSection promptIndex={promptIndex} entry={entry} setEntry={setEntry} />
        </div>

        <button type="button" onClick={handleSave} disabled={saved} className="w-full py-3 rounded-2xl text-base font-bold transition-all duration-200 flex items-center justify-center gap-2"
          style={{ background: saved ? 'var(--melo-sage)' : '#fff', color: saved ? '#fff' : 'var(--melo-text)', border: saved ? 'none' : '1px solid var(--melo-border)' }}>
          {saved ? <><Check size={16} /> Saved</> : 'Save'}
        </button>
      </div>
    </div>
  );
}

