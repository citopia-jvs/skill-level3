// src/features/wishes/store/wishSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {QueryResponse} from "@/api/wishService.ts";

interface WishLog {
    message: string;
    timestamp: string;
    isUser: boolean;
}

interface WishState {
    logs: WishLog[];
    loading: boolean;
    error: string | null;
}

const initialState: WishState = {
    logs: [],
    loading: false,
    error: null
};

const wishSlice = createSlice({
    name: 'wishes',
    initialState,
    reducers: {
        sendQueryRequest: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
            state.logs.push({
                message: action.payload,
                timestamp: new Date().toISOString(),
                isUser: true
            });
        },
        sendQuerySuccess: (state, action: PayloadAction<QueryResponse>) => {
            state.loading = false;
            state.error = null;
            state.logs.push({
                message: action.payload.response,
                timestamp: new Date().toISOString(),
                isUser: false
            });
        },
        sendQueryFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearLogs: (state) => {
            state.logs = [];
        }
    }
});

export const {
    sendQueryRequest,
    sendQuerySuccess,
    sendQueryFailure,
    clearLogs
} = wishSlice.actions;

export default wishSlice.reducer;