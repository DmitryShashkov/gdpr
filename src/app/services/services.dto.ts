export interface DisplayLoadingDTO {
    displayTime?: number;
    displayText?: string;
}

export interface QuoteRequestDTO {
    firstCameFrom?: string;
    lastCameFrom?: string;
    suggestedCountry?: string;
    name: string;
    email: string;
    projectDetails: string;
    conversionPage?: string;
}

export interface CommonResponse {
    status: string;
    payload: any;
}

export interface AnswersSet {
    platform: string;
    answers: string[];
}
