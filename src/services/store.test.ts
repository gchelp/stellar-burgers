/* eslint-disable prettier/prettier */
import { rootReducer } from './store';

describe('rootReducer', () => {
  test('правильно инициализирует начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      user: {
        isAuthChecked: false,
        isAuthenticated: false,
        data: null,
        loginUserError: null,
        loginUserRequest: false
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false
      },
      profileOrders: {
        orders: [],
        isLoading: false
      },
      order: {
        orderRequest: false,
        orderModalData: null
      }
    });
  });
});