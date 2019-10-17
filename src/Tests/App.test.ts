import { CurrencyDataProviding } from './../Provider/CurrencyDataProvider';
import { CurrencyDataProvider } from "../Provider/CurrencyDataProvider"
import { element } from 'prop-types';

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

describe('App E2E tests', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000')
  })
  it('App has proper name', async () => {
    await expect(page.title()).resolves.toMatch('Currency checker')
  })
  it('All values should be initially equal \'...\'', async () => {
    const initialValues = [
      'Base currency: ...',
      'Target currency: ...',
      'Value: ...',
      'Check date: ...'
    ]

    await expect(page).toMatch(initialValues[0])
    await expect(page).toMatch(initialValues[1])
    await expect(page).toMatch(initialValues[2])
    await expect(page).toMatch(initialValues[3])
  })
})