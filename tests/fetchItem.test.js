require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  const parameter = 'MLB1615760527'
  test('se é uma função', () => {
    expect.assertions(1);
    const expected = 'function';
    expect(typeof fetchItem).toBe(expected);
  })
  test('se fetch é chamada dentro da função', () => {
    expect.assertions(1);
    fetchItem(parameter);
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  test('se utiliza o endpoint corretamente', () => {
    expect.assertions(1);
    fetchItem(parameter);
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/${parameter}`)
  })
  test('se o retorno é igual à item', async () => {
    expect.assertions(1);
    expect(await fetchItem(parameter)).toEqual(item);
  })
  test('ao ser chamada sem argumentos retorna erro', async () => {
    expect.assertions(1);
    await expect(fetchItem()).resolves.toThrow(new Error('You must provide an url'))
  })
});
