// moodData.ts — all mood page constants

export const MOOD_MIN_LABEL = 'Struggling';
export const MOOD_MAX_LABEL = 'Feeling great';

export const MOOD_SCORE_LABELS: Record<number, string> = {
  1: 'Really rough', 2: 'Pretty low',  3: 'Struggling', 4: 'Not great',
  5: 'Getting by',   6: 'Getting by',  7: 'Doing okay',  8: 'Pretty good',
  9: 'Really good',  10: 'Feeling great',
};

export const MOOD_SCORE_EMOJI: Record<number, string> = {
  1: '😞', 2: '😟', 3: '😕', 4: '😐', 5: '😶',
  6: '🙂', 7: '😊', 8: '😄', 9: '😁', 10: '🤩',
};

// Calming left-panel messages per step
export const STEP_MESSAGES: Record<number, { title: string; body: string }> = {
  1: {
    title: 'Every feeling is welcome here.',
    body:  'There\'s no right or wrong answer. Simply pause, breathe, and notice where you are right now.',
  },
  2: {
    title: 'Your emotions are valid.',
    body:  'Name what you\'re carrying today. Acknowledging feelings is the first gentle step toward easing them.',
  },
  3: {
    title: 'This space is yours.',
    body:  'No pressure, no judgement. Pour out whatever is on your mind — even a few words can bring relief.',
  },
  4: {
    title: 'You showed up for yourself.',
    body:  'That takes courage. Explore these gentle tools whenever you need a moment of calm.',
  },
};

export const EMOTION_LIST: string[] = [
  'Anxious',  'Calm',       'Tired',      'Focused',
  'Overwhelmed', 'Grateful', 'Lonely',   'Hopeful',
  'Stressed', 'Energized',  'Excited',    'Peaceful',
  'Sad',      'Motivated',  'Confused',   'Joyful',
  'Numb',     'Irritable',  'Content',    'Restless',
  'Tender',   'Proud',      'Drained',    'Grounded',
];

export const JOURNAL_PROMPTS: string[] = [
  'Capture this feeling in words',
  'What brought you here today?',
  'What does your mind need right now?',
  'Describe today in three words',
  'What are you grateful for?',
  'What would bring you a little relief?',
];

export interface WellbeingTool {
  emoji:       string;
  title:       string;
  description: string;
  href:        string;
  color:       string;
  bg:          string;
}

export const WELLBEING_TOOLS: WellbeingTool[] = [
  {
    emoji:       '🌬️',
    title:       'Breathing Exercises',
    description: 'A few slow breaths can shift everything. Try a guided session.',
    href:        'https://breathing.melo.com',
    color:       'var(--melo-sage)',
    bg:          'rgba(138,175,142,0.10)',
  },
  {
    emoji:       '⏱️',
    title:       'Focus Timer',
    description: 'Gentle Pomodoro sessions to ease you into the present moment.',
    href:        'https://focustimer.melo.com',
    color:       'var(--melo-gold)',
    bg:          'rgba(212,168,71,0.10)',
  },
  {
    emoji:       '🎵',
    title:       'Ambient Sound',
    description: 'Rain, forest, ocean — let calming sounds hold you for a while.',
    href:        'https://ambientsound.melo.com',
    color:       'var(--melo-lavender)',
    bg:          'rgba(155,126,200,0.10)',
  },
  {
    emoji:       '💬',
    title:       'AI Self Help',
    description: 'A compassionate companion ready to listen and reflect with you.',
    href:        'https://aiselfhelp.melo.com',
    color:       'var(--melo-blush)',
    bg:          'rgba(212,116,140,0.10)',
  },
];
