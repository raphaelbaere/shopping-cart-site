// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */

 const removeLoadText = (parentNode, loadNode) => {
  parentNode.removeChild(loadNode);
};

const createLoadText = () => {
  const p = document.createElement('p');
  p.classList.add('loading');
  p.innerHTML = 'carregando...';
  return p;
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};
const arrayObjectCartAPIMaker = (array) => array.reduce((acc, curr) => acc + curr.price, 0);
/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
 const cartItemsLiteral = '.cart__items';

 const removeChild = (event) => {
  const p = document.querySelector('.total-price');
  const cartItemsContainer = document.querySelector(cartItemsLiteral);
  const productId = event.target.textContent.slice(4, 17);
  const cartItemArray = getSavedCartItems();
  const cartItemArrayFiltered = cartItemArray.filter((item) => item.id !== productId);
  localStorage.setItem('cartItems', JSON.stringify(cartItemArrayFiltered));
  p.innerHTML = arrayObjectCartAPIMaker(getSavedCartItems())
  .toString().match(/^\d+(?:\.\d{0,2})?/);
  cartItemsContainer.removeChild(event.path[0]);
 };

 const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', removeChild);
  return li;
};
const cartItemsContainer = document.querySelector(cartItemsLiteral);

const validSave = (objeto) => {
  const p = document.querySelector('.total-price');
  if (getSavedCartItems()) {
    const cartItems = getSavedCartItems();
    cartItems.push(objeto);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    p.innerHTML = arrayObjectCartAPIMaker(getSavedCartItems())
    .toString().match(/^\d+(?:\.\d{0,2})?/);
    } else {
      saveCartItems(objeto); 
      p.innerHTML = arrayObjectCartAPIMaker(getSavedCartItems())
      .toString().match(/^\d+(?:\.\d{0,2})?/);
    }
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', async (event) => {
        const objetoDoProduto = await fetchItem(event.path[1].firstChild.innerHTML);
        cartItemsContainer.appendChild(createCartItemElement(objetoDoProduto));
        const { id, title, price } = objetoDoProduto;
        validSave({ id, title, price });
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
  const p = createLoadText();
  itemsContainer.appendChild(p);
  const objetoRetornado = await fetchProducts('computador');
  const { results: products } = objetoRetornado;
  removeLoadText(itemsContainer, p);
  products.forEach((product) => {
    itemsContainer.appendChild(createProductItemElement(product));
  });
};

const getSavedItemsAndShow = async () => {
  const cartItems = getSavedCartItems();
  if (cartItems.length > 0) {
  cartItems.forEach(async (objItem) => {
    cartItemsContainer.appendChild(createCartItemElement(objItem));
    });
  }
};

const emptyCartButton = document.querySelector('.empty-cart');
emptyCartButton.addEventListener('click', () => {
  cartItemsContainer.innerHTML = '';
  localStorage.clear();
});

window.onload = async () => { 
  createItems();
  if (getSavedCartItems()) {
    getSavedItemsAndShow();
  }
};
