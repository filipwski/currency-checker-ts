import Axios from 'axios'
import { Currency } from '../Model/Currency'

interface CurrencyData {
    base: string
    rates: {
        [key: string]: number
    }
    date: Date
}

export interface CurrencyDataProviding {
    fetchCurrencyData(baseCurrencyName: string, targetCurrencyName: string): Promise <Currency>
}

export class CurrencyDataProvider implements CurrencyDataProviding {

    readonly availableCurrencies = [
        'CAD', 'HKD', 'ISK', 'PHP', 'DKK', 'HUF', 'CZK',
        'GBP', 'RON', 'SEK', 'IDR', 'INR', 'BRL', 'RUB',
        'HRK', 'JPY', 'THB', 'CHF', 'EUR', 'MYR', 'BGN',
        'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN',
        'SGD', 'AUD', 'ILS', 'KRW', 'PLN'
    ]

    async fetchCurrencyData(baseCurrencyName: string, targetCurrencyName: string): Promise <Currency> {
        const url = `https://api.exchangeratesapi.io/latest?base=${baseCurrencyName}`
        
        const currencyData: CurrencyData = await Axios.get(url).then(
            response => {
                return response.data
            }
        )

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