/* eslint-disable prettier/prettier */
import userReducer, {
  loginUser,
  registerUser,
  getUser,
  updateUser,
  logoutUser,
  authChecked
} from './userSlice';

const mockUser = {
  email: 'test@test.com',
  name: 'Test User'
};

const initialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

describe('userSlice', () => {
  test('authChecked — устанавливает isAuthChecked в true', () => {
    const state = userReducer(initialState, authChecked());
    expect(state.isAuthChecked).toBe(true);
  });

  test('loginUser.pending — loginUserRequest становится true', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(true);
    expect(state.loginUserError).toBeNull();
  });

  test('loginUser.fulfilled — записывает пользователя и устанавливает флаги', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.data).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserRequest).toBe(false);
  });

  test('loginUser.rejected — записывает ошибку', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Неверный логин' }
    };
    const state = userReducer(initialState, action);
    expect(state.loginUserError).toBe('Неверный логин');
    expect(state.loginUserRequest).toBe(false);
  });

  test('registerUser.fulfilled — записывает пользователя', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.data).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  test('getUser.fulfilled — записывает пользователя', () => {
    const action = { type: getUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.data).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  test('updateUser.fulfilled — обновляет пользователя', () => {
    const updatedUser = { email: 'new@test.com', name: 'New Name' };
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const state = userReducer(initialState, action);
    expect(state.data).toEqual(updatedUser);
  });

  test('logoutUser.fulfilled — очищает пользователя', () => {
    const stateWithUser = {
      ...initialState,
      data: mockUser as any,
      isAuthenticated: true
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(stateWithUser, action);
    expect(state.data).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});