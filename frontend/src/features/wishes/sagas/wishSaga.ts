// src/features/wishes/sagas/wishSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { sendQuery } from '../../../api/wishService';
import {
    sendQueryRequest,
    sendQuerySuccess,
    sendQueryFailure
} from '../store/wishSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* sendQuerySaga(action: PayloadAction<string>) {
    try {
        const response = yield call(sendQuery, action.payload);
        yield put(sendQuerySuccess(response));
    } catch (error) {
        yield put(sendQueryFailure(
            error.response?.data?.message || 'Failed to send query'
        ));
    }
}

export function* wishSaga() {
    yield takeLatest(sendQueryRequest.type, sendQuerySaga);
}