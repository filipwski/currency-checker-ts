import './css/App.css'
import './css/Selector.css'
import React, { Component } from 'react'
import { CurrencyDataProvider } from '../Provider/CurrencyDataProvider'
import Select from 'react-select'
import { ValueType } from 'react-select/src/types'

type OptionType = {label: string, value: string}

class App extends Component {

  state = {
    baseCurrencyName: '...',
    targetCurrencyName: '...',
    targetCurrencyValue: '...',
    date: '...'
  }

  readonly currencyProvider = new CurrencyDataProvider()
  
  currencySelectorOptions = [] as OptionType[]
  
  setCurrencySelectorOptions = () => this.currencyProvider.availableCurrencies.forEach(element => {
    this.currencySelectorOptions.push({
      value: element,
      label: element
    })
  })
  
  fetchCurrencyValue = async (baseCurrencyName: string, targetCurrencyName: string) => {
    let currencyData = await this.currencyProvider.fetchCurrencyData(baseCurrencyName, targetCurrencyName)
    let currencyValue = currencyData.targetCurrencyValue

    this.setState({
      baseCurrencyName: currencyData.baseCurrencyName, 
      targetCurrencyName: currencyData.targetCurrencyName,
      targetCurrencyValue: (currencyValue < 0.01) ? currencyValue.toFixed(4) : currencyValue.toFixed(2),
      date: currencyData.date
      })
  }

  render() {
    this.setCurrencySelectorOptions()

    const { baseCurrencyName, targetCurrencyName } = this.state

    if(baseCurrencyName != '...' && targetCurrencyName != '...') {
      this.fetchCurrencyValue(baseCurrencyName, targetCurrencyName)
    }

    return (
      <div className="App">
        <div>
          <Select
            className="Selector"
            onChange={(selected: ValueType<OptionType>) => {
              const value = (selected as OptionType).value
              this.setState({baseCurrencyName: value})
            }}
            placeholder='Select base value'
            options={this.currencySelectorOptions}
          />
          <Select
            className="Selector"
            onChange={(selected: ValueType<OptionType>) => {
              const value = (selected as OptionType).value
              this.setState({targetCurrencyName: value})
            }}
            placeholder='Select target value'
            options={this.currencySelectorOptions}
          />
        </div>
        <div>
          <p>Base currency: {this.state.baseCurrencyName}</p>
          <p>Target currency: {this.state.targetCurrencyName}</p>
          <p>Value: {this.state.targetCurrencyValue}</p>
          <p>Check date: {this.state.date}</p>
        </div>
      </div>
    )
  }
}

export default App;
