export interface Mood {
    id?: number;
    user_id: number;
    score: number;
    emotions: string[];
    journal?: string;
    created_at?: string;
}

export interface MoodInput {
    score: number;
    emotions: string[];
    journal?: string;
}