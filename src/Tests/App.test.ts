import { Currency } from './../Model/Currency';
import { CurrencyDataProviding } from './../Provider/CurrencyDataProvider';
import { CurrencyDataProvider } from "../Provider/CurrencyDataProvider"

describe("Data provider unit tests", () => {
  let provider: CurrencyDataProviding
  beforeEach(() => {
    provider = new CurrencyDataProvider()
  })
  afterEach(()=>{
    provider = null
  })
  it('Provider can fetch data', () => {
    expect.assertions(1)
    return expect(provider.fetchCurrencyData('USD', 'PLN')).resolves.toBeDefined()
  })
  it('Provider returns object', () => {
    expect.assertions(1)
    return expect(
      provider.fetchCurrencyData('USD', 'PLN')
      .then(data => typeof data)
    ).resolves.toBe('object')
  })
  it('Console.error is called when an error occurs', async () => {
    expect.assertions(1)
    console.error = jest.fn()

    await provider.fetchCurrencyData('ABC', 'DEF')

    return expect(console.error).toBeCalled()
  })
})