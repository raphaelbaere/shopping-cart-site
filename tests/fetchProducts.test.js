require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  const parameter = 'computador';
  test('é uma função', () => {
    expect.assertions(1);
    const expected = 'function';
    expect(typeof fetchProducts).toBe(expected);
    })
    test('se fetch é chamado', async () => {
      expect.assertions(1);
      await fetchProducts(parameter);
      expect(fetch).toHaveBeenCalledTimes(1);
    })
    test('utiliza o endpoint correto', async () => {
      expect.assertions(1);
      await fetchProducts(parameter);
      expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/sites/MLB/search?q=${parameter}`);
    })
    test('se retorna o objeto correto', async () => {
      expect.assertions(1);
      expect(await fetchProducts(parameter)).toEqual(computadorSearch);
    })
    test('se retorna um erro ao chamar sem parâmetros', async () => {
      expect.assertions(1);
      await expect(fetchProducts()).resolves.toThrow(new Error('You must provide an url'))
    })
});
