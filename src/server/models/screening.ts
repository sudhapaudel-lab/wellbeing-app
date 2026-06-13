export interface ScreeningInput {
    phq9_score: number;
    gad7_score: number;
    phq9_severity: string;
    gad7_severity: string;
    answers: number[];
}

export interface Screening {
    id?: number;
    user_id: number;
    phq9_score: number;
    gad7_score: number;
    phq9_severity: string;
    gad7_severity: string;
    answers: number[];
    created_at?: string;
}