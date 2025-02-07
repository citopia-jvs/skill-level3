// src/services/api.service.ts
import axios from 'axios';
import { environment } from '../config/environment';
import { BackendResponse } from '../types/api.types';

const api = axios.create({
    baseURL: environment.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const wishesService = {
    async sendWish(query: string): Promise<BackendResponse> {
        try {
            const response = await api.get<BackendResponse>(`/invoke`, {
                params: { query }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    throw new Error('Please enter a valid wish.');
                }
                throw new Error(error.response?.data?.message || 'An error occurred while sending your wish.');
            }
            throw error;
        }
    }
};