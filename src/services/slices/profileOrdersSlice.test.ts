/* eslint-disable prettier/prettier */
import profileOrdersReducer, { fetchProfileOrders } from './profileOrdersSlice';

const mockOrders = [
  {
    _id: '1',
    ingredients: ['ing1', 'ing2'],
    status: 'done',
    name: 'Бургер',
    number: 12345,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

const initialState = {
  orders: [],
  isLoading: false
};

describe('profileOrdersSlice', () => {
  test('fetchProfileOrders.pending — isLoading становится true', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('fetchProfileOrders.fulfilled — записывает заказы и isLoading становится false', () => {
    const action = { type: fetchProfileOrders.fulfilled.type, payload: mockOrders };
    const state = profileOrdersReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  test('fetchProfileOrders.rejected — isLoading становится false', () => {
    const action = { type: fetchProfileOrders.rejected.type };
    const state = profileOrdersReducer({ ...initialState, isLoading: true }, action);
    expect(state.isLoading).toBe(false);
  });
});