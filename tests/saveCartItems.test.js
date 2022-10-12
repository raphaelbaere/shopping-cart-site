const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('se passar cartItem como parâmetro, chama o método localStorage.setItem', () => {
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  test('se passar cartItem como parâmetro, executa localStorage.setItem com dois parãmetros corretos.', () => {
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItem')
  })
});
