export type PlatformType = 'web' | 'mobile';

export interface Question {
    text: string;
    answers: string[];
    suggestions: string[];
}
