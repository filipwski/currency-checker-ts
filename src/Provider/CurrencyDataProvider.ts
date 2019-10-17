import Axios from 'axios'
import { Currency } from '../Model/Currency'

export interface CurrencyData {
    base: string
    rates: {
        [key: string]: number
    }
    date: string
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
        let currencyData: CurrencyData
        let targetCurrencyValue: number
        let date: string

        const url = `https://api.exchangeratesapi.io/latest?base=${baseCurrencyName}`
        
        try {
            currencyData = await Axios.get(url).then(
                response => {
                    return response.data
                }
            )
            targetCurrencyValue = currencyData.rates[targetCurrencyName]
            date = currencyData.date
        } catch(error) {
            console.error(error)
        }
        
        return {
            baseCurrencyName: baseCurrencyName,
            targetCurrencyName: targetCurrencyName,
            targetCurrencyValue: targetCurrencyValue,
            date: date
        }
    }
}