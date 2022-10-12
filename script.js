// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};
/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
 const cartItemsLiteral = '.cart__items';

 const removeChild = (event) => {
  const cartItemsContainer = document.querySelector(cartItemsLiteral);
  const productId = event.path[0].innerHTML.split('').slice(4, 17).join('');
  cartItemsContainer.removeChild(event.path[0]);
  if (getSavedCartItems()) {
    const cartItems = getSavedCartItems();
    const indexOfItem = cartItems.findIndex((item) => item === productId);
    const removedItemArray = cartItems.splice(indexOfItem, 0);
    localStorage.setItem('cartItems', JSON.stringify(removedItemArray));
  }
 };

 const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', removeChild);
  return li;
};

const createCustomElement = (element, className, innerText) => {
  const cartItemsContainer = document.querySelector(cartItemsLiteral);
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', async (event) => {
        const objetoDoProduto = await fetchItem(event.path[1].firstChild.innerHTML);
        cartItemsContainer.appendChild(createCartItemElement(objetoDoProduto));
        const { id } = objetoDoProduto;
        saveCartItems({ id });
    });
  }
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// eslint-disable-next-line no-unused-vars
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
// eslint-disable-next-line no-unused-vars

const createItems = async () => {
  const itemsContainer = document.querySelector('.items');
  const objetoRetornado = await fetchProducts('computador');
  const { results: products } = objetoRetornado;
  products.forEach((product) => {
    itemsContainer.appendChild(createProductItemElement(product));
  });
};

const getSavedItemsAndShow = async () => {
  const cartItemsContainer = document.querySelector('.cart__items');
  const cartItems = getSavedCartItems();
  if (cartItems.length > 0) {
  cartItems.forEach(async (item) => {
    const objRetornado = await fetchItem(item);
    cartItemsContainer.appendChild(createCartItemElement(objRetornado));
    });
  }
};

const emptyCartButton = document.querySelector('.empty-cart');
emptyCartButton.addEventListener('click', () => {
  const cartItemsContainer = document.querySelector(cartItemsLiteral);
  cartItemsContainer.innerHTML = '';
  localStorage.clear();
});

window.onload = () => { 
  createItems();
  if (getSavedCartItems()) {
    getSavedItemsAndShow();
  }
};
