const createUrl = (name) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${name}`;
  return url;
};

const validUrl = (name) => {
    if (name === 'computador') {
      return true;
  }
  throw new Error('You must provide an url');
};

const fetchProducts = async (name) => {
  try {
    validUrl(name);
    const url = createUrl(name);
    const response = await fetch(url);
    const objetoRetornado = await response.json(); 
    return objetoRetornado;
  } catch (erroraa) {
    return erroraa;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
