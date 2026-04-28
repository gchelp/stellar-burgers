/* eslint-disable prettier/prettier */
import feedReducer, { fetchFeeds } from './feedSlice';

const mockFeeds = {
  orders: [
    {
      _id: '1',
      ingredients: ['ing1', 'ing2'],
      status: 'done',
      name: 'Бургер',
      number: 12345,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ],
  total: 100,
  totalToday: 10
};

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

describe('feedSlice', () => {
  test('fetchFeeds.pending — isLoading становится true', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('fetchFeeds.fulfilled — записывает данные и isLoading становится false', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockFeeds };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockFeeds.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  test('fetchFeeds.rejected — isLoading становится false', () => {
    const action = { type: fetchFeeds.rejected.type };
    const state = feedReducer({ ...initialState, isLoading: true }, action);
    expect(state.isLoading).toBe(false);
  });
});