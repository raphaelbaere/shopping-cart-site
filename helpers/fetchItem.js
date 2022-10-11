const createUrlItem = (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
  return url;
};

const validUrlItem = (item) => {
  if (typeof item === 'string') {
    return true;
}
throw new Error('You must provide an url');
};

const fetchItem = async (item) => {
  try {
    validUrlItem(item);
    const url = createUrlItem(item);
    const response = await fetch(url);
    const objetoRetornado = await response.json(); 
    return objetoRetornado;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
