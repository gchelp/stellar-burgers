/* eslint-disable prettier/prettier */
import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image.png',
    image_mobile: 'image_mobile.png',
    image_large: 'image_large.png'
  }
];

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null
};

describe('ingredientsSlice', () => {
  test('fetchIngredients.pending — isLoading становится true', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchIngredients.fulfilled — записывает данные и isLoading становится false', () => {
    const action = { type: fetchIngredients.fulfilled.type, payload: mockIngredients };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('fetchIngredients.rejected — записывает ошибку и isLoading становится false', () => {
    const action = { 
      type: fetchIngredients.rejected.type, 
      error: { message: 'Ошибка загрузки' } 
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});