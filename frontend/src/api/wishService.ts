// src/api/wishService.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
//const API_BASE_URL = process.env.VITE_BACKEND_URL || 'http://localhost:3001';
export interface QueryResponse {
    status: string;
    response: string;
    reasoning: string;
    summary: string;
    processingDetails: any;
}

// Add more specific interfaces based on your backend response
export interface ProcessingDetail {
    iteration: number;
    supervisorState: {
        supervisor?: { next: string };
        researcher?: { messages: any[] };
        cart_manager?: { messages: any[] };
    };
}

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // Add timeout and other axios configurations
    timeout: 30000, // 30 seconds
});

export const sendQuery = async (query: string): Promise<QueryResponse> => {
    try {
        const response = await api.get(`/invoke`, {
            params: { query },
            // Add query encoding to handle special characters
            paramsSerializer: params => {
                return Object.entries(params)
                    .map(([key, value]) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                    )
                    .join('&');
            }
        });

        // Add response transformation if needed
        return {
            status: response.data.status,
            response: response.data.response,
            reasoning: response.data.reasoning,
            summary: response.data.summary,
            processingDetails: response.data.processingDetails
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle specific axios errors
            if (error.response) {
                // Server responded with error
                console.error('Server Error:', error.response.data);
                throw new Error(error.response.data.message || 'Server error');
            } else if (error.request) {
                // Request made but no response
                console.error('Network Error:', error.request);
                throw new Error('Network error - no response from server');
            } else {
                // Request setup error
                console.error('Request Error:', error.message);
                throw new Error('Error setting up the request');
            }
        }
        // Handle non-axios errors
        console.error('Unexpected Error:', error);
        throw new Error('An unexpected error occurred');
    }
};

// Add a function to test the connection
export const testConnection = async (): Promise<boolean> => {
    try {
        await api.get('/invoke', {
            params: { query: 'test' },
            timeout: 5000
        });
        return true;
    } catch (error) {
        console.error('Connection test failed:', error);
        return false;
    }
};

// Add a retry mechanism for failed requests
export const sendQueryWithRetry = async (
    query: string,
    maxRetries = 3
): Promise<QueryResponse> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await sendQuery(query);
        } catch (error) {
            if (attempt === maxRetries) throw error;
            // Wait before retrying (exponential backoff)
            await new Promise(resolve =>
                setTimeout(resolve, Math.pow(2, attempt) * 1000)
            );
        }
    }
    throw new Error('Max retries exceeded');
};

// Add a function to handle batch queries if needed
export const sendBatchQueries = async (
    queries: string[]
): Promise<QueryResponse[]> => {
    return Promise.all(queries.map(query => sendQuery(query)));
};