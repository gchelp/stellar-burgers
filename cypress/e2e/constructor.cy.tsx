/// <reference types="cypress" />

describe('Stellar Burgers — конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

    window.localStorage.setItem('refreshToken', 'mock-refresh-token');
    cy.setCookie('accessToken', 'mock-access-token');

    cy.visit('/');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearCookies();
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('добавление булки', () => {
      cy.contains('Краторная булка N-200i')
        .parent()
        .find('button')
        .click();

      cy.get('[data-cy=burger-constructor]').contains('Краторная булка N-200i (верх)').should('exist');
      cy.get('[data-cy=burger-constructor]').contains('Краторная булка N-200i (низ)').should('exist');
    });

    it('добавление начинки', () => {
      cy.contains('Биокотлета из марсианской Магнолии')
        .parent()
        .find('button')
        .click();

      cy.get('[data-cy=burger-constructor]').contains('Биокотлета из марсианской Магнолии').should('exist');
    });
  });

  describe('Модальные окна ингредиента', () => {
    it('открытие модального окна по клику на ингредиент с правильными данными', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy=modal]').should('exist');
      cy.get('[data-cy=modal]').contains('Краторная булка N-200i').should('exist');
    });

    it('закрытие модального окна по клику на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy=modal]').should('exist');

      cy.get('[data-cy=modal-close]').click();
      cy.get('[data-cy=modal]').should('not.exist');
    });

    it('закрытие модального окна по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy=modal]').should('exist');

      cy.get('[data-cy=modal-overlay]').click({ force: true });
      cy.get('[data-cy=modal]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('собирает бургер, оформляет заказ и проверяет модалку', () => {
      cy.contains('Краторная булка N-200i')
        .parent()
        .find('button')
        .click();

      cy.contains('Биокотлета из марсианской Магнолии')
        .parent()
        .find('button')
        .click();

      cy.contains('Оформить заказ').click();

      cy.wait('@createOrder');

      // Проверяем номер заказа именно в модалке
      cy.get('[data-cy=modal]').contains('12345').should('exist');

      // Закрываем модалку
      cy.get('[data-cy=modal-close]').click();
      cy.get('[data-cy=modal]').should('not.exist');

      // Проверяем что конструктор пуст
      cy.get('[data-cy=burger-constructor]').contains('Выберите булки').should('exist');
      cy.get('[data-cy=burger-constructor]').contains('Выберите начинку').should('exist');
    });
  });
});
