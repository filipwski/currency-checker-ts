import Axios from 'axios'
import { Currency } from '../Model/Currency'

interface CurrencyData {
    base: string
    rates: {
        [key: string]: number
    }
    date: Date
}

export interface CurrencyProviding {
    fetchCurrencyData(targetCurrencyName: string): Promise <Currency>
}

export class CurrencyProvider implements CurrencyProviding {

    readonly availableCurrencies = [
        'CAD', 'HKD', 'ISK', 'PHP', 'DKK', 'HUF', 'CZK',
        'GBP', 'RON', 'SEK', 'IDR', 'INR', 'BRL', 'RUB',
        'HRK', 'JPY', 'THB', 'CHF', 'EUR', 'MYR', 'BGN',
        'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN',
        'SGD', 'AUD', 'ILS', 'KRW', 'PLN'
    ]

    async fetchCurrencyData(targetCurrencyName: string): Promise <Currency> {
        const currencyData: CurrencyData = await Axios.get(
            'https://api.exchangeratesapi.io/latest?base=USD'
        ).then(
            response => {
                return response.data
            }
        )
        const baseCurrencyName = currencyData.base
        const targetCurrencyValue = currencyData.rates[targetCurrencyName]
        const date = currencyData.date
        return {
            baseCurrencyName: baseCurrencyName,
            targetCurrencyName: targetCurrencyName,
            targetCurrencyValue: targetCurrencyValue,
            date: date
        }
    }

}

(async () => {
    const provider = new CurrencyProvider()
    const data = await provider.fetchCurrencyData(provider.availableCurrencies[32])
    console.log(data)
})()