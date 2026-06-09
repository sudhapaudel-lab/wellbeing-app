// moodData.ts — all mood page constants

export const MOOD_MIN_LABEL = "Struggling";
export const MOOD_MAX_LABEL = "Feeling great";

export const MOOD_SCORE_LABELS: Record<number, string> = {
  1: "Really rough",
  2: "Pretty low",
  3: "Struggling",
  4: "Not great",
  5: "Getting by",
  6: "Getting by",
  7: "Doing okay",
  8: "Pretty good",
  9: "Really good",
  10: "Feeling great",
};

export const MOOD_SCORE_EMOJI: Record<number, string> = {
  1: "😞",
  2: "😟",
  3: "😕",
  4: "😐",
  5: "😶",
  6: "🙂",
  7: "😊",
  8: "😄",
  9: "😁",
  10: "🤩",
};

export const EMOTION_LIST: string[] = [
  "Anxious",
  "Calm",
  "Tired",
  "Focused",
  "Overwhelmed",
  "Grateful",
  "Lonely",
  "Hopeful",
  "Stressed",
  "Energized",
  "Excited",
  "Peaceful",
  "Sad",
  "Motivated",
  "Confused",
  "Joyful",
  "Numb",
  "Irritable",
  "Content",
  "Restless",
  "Curious",
  "Bored",
  "Frustrated",
  "Optimistic",
  "Proud",
  "Embarrassed",
  "Resentful",
  "Surprised",
  "Apathetic",
  "Peaceful",
  "Inspired",
  "Relieved",
];

export const JOURNAL_PROMPTS: string[] = [
  "Capture this feeling in a sentence",
  "What brought you here today?",
  "What does your mind need?",
  "Describe today in three words",
  "What would help you right now?",
];
