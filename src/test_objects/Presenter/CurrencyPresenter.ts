import { CurrencyProviding, CurrencyProvider } from "../Provider/CurrencyDataProvider"

class SamplePresenter {

    readonly currencyProvider: CurrencyProviding

    constructor(currencyProvider: CurrencyProviding) {
        this.currencyProvider = currencyProvider
    }
}