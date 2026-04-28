/* eslint-disable prettier/prettier */
import constructorReducer, {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: 'bun1',
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
};

const mockIngredient1: TConstructorIngredient = {
  _id: 'ing1',
  id: '1',
  name: 'Соус',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'image.png',
  image_mobile: 'image_mobile.png',
  image_large: 'image_large.png'
};

const mockIngredient2: TConstructorIngredient = {
  _id: 'ing2',
  id: '2',
  name: 'Мясо',
  type: 'main',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 300,
  image: 'image.png',
  image_mobile: 'image_mobile.png',
  image_large: 'image_large.png'
};

const initialState = {
  bun: null,
  ingredients: []
};

describe('constructorSlice', () => {
  test('добавление булки', () => {
    const newState = constructorReducer(initialState, addIngredient(mockBun));
    expect(newState.bun).toMatchObject({ _id: 'bun1', type: 'bun' });
  });

  test('добавление начинки', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient(mockIngredient1)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject({
      _id: 'ing1',
      type: 'sauce'
    });
  });

  test('удаление ингредиента', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [mockIngredient1, mockIngredient2]
    };
    const newState = constructorReducer(
      stateWithIngredients,
      removeIngredient('1')
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]._id).toBe('ing2');
  });

  test('очистка конструктора', () => {
    const stateWithItems = {
      bun: { ...mockBun, id: 'bun-id' } as TConstructorIngredient,
      ingredients: [mockIngredient1, mockIngredient2]
    };
    const newState = constructorReducer(stateWithItems, clearConstructor());
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });

  test('перемещение ингредиента вверх', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [mockIngredient1, mockIngredient2]
    };
    const newState = constructorReducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );
    expect(newState.ingredients[0]._id).toBe('ing2');
    expect(newState.ingredients[1]._id).toBe('ing1');
  });

  test('перемещение ингредиента вниз', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [mockIngredient1, mockIngredient2]
    };
    const newState = constructorReducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );
    expect(newState.ingredients[0]._id).toBe('ing2');
    expect(newState.ingredients[1]._id).toBe('ing1');
  });
});
