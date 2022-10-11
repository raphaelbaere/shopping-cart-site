const saveCartItems = (cartItem) => {
  if (JSON.parse(localStorage.getItem('cartItems'))) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  cartItems.push(cartItem);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  return;
  }
  localStorage.setItem('cartItems', JSON.stringify([cartItem]));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
