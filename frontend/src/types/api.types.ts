// src/types/api.types.ts
export interface BackendResponse {
    status: 'success';
    response: string;
    reasoning: string;
    summary: string;
    processingDetails: ProcessingDetail[];
}

export interface ProcessingDetail {
    supervisorState: {
        [key: string]: {
            messages: Array<{
                kwargs: {
                    content: string;
                }
            }>;
        };
    };
}

export interface Message {
    content: string;
    isUser: boolean;
    timestamp: string;
}