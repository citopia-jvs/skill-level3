import { describe, expect, it } from 'vitest';
import { dataSlice } from '../redux/slices/dataSlice';

describe('dataSlice', () => {
  it('should return the initial state', () => {
    const initialState = dataSlice.getInitialState();
    expect(initialState).toEqual({ error: false, loading: false, url: '' });
  });

  it('should handle the ERROR_DATA action', () => {
    const action = { type: 'dummydata/fetchDataFailure', payload: true };
    const nextState = dataSlice.reducer(undefined, action);
    expect(nextState).toEqual({ error: true, loading: false, url: '' });
  });

  it('should handle the FETCH_DATA_LOADING action', () => {
    const action = { type: 'dummydata/fetchDataRequest' };
    const nextState = dataSlice.reducer(undefined, action);
    expect(nextState).toEqual({ error: false, loading: true, url: '' });
  });

  it('should handle the FETCH_DATA_SUCCESS action', () => {
    const action = { type: 'dummydata/fetchDataSuccess', payload: 'https://example.com' };
    const nextState = dataSlice.reducer(undefined, action);
    expect(nextState).toEqual({ error: false, loading: false, url: 'https://example.com' });
  });
});
