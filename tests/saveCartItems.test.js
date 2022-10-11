const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
const cartItem = 'MLB1615760527';
localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('se passar cartItem como parâmetro, chama o método localStorage.setItem', () => {
    saveCartItems(cartItem);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
  test('se passar cartItem como parâmetro, executa localStorage.setItem com dois parãmetros corretos.', () => {
    saveCartItems(cartItem);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', cartItem)
  })
});
