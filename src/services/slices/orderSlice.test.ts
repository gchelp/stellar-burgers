/* eslint-disable prettier/prettier */
import orderReducer, { createOrder, clearOrderModalData } from './orderSlice';

const mockOrder = {
  _id: '1',
  ingredients: ['ing1', 'ing2'],
  status: 'done',
  name: 'Бургер',
  number: 12345,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01'
};

const initialState = {
  orderRequest: false,
  orderModalData: null
};

describe('orderSlice', () => {
  test('createOrder.pending — orderRequest становится true', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
  });

  test('createOrder.fulfilled — записывает заказ и orderRequest становится false', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  test('createOrder.rejected — orderRequest становится false', () => {
    const action = { type: createOrder.rejected.type };
    const state = orderReducer({ ...initialState, orderRequest: true }, action);
    expect(state.orderRequest).toBe(false);
  });

  test('clearOrderModalData — очищает данные заказа', () => {
    const stateWithOrder = { orderRequest: false, orderModalData: mockOrder as any };
    const state = orderReducer(stateWithOrder, clearOrderModalData());
    expect(state.orderModalData).toBeNull();
  });
});