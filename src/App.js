
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import _ from 'lodash'
import fetchTimeout from 'fetch-timeout'

const Auto = () => {
  const [display, setDisplay] = useState(false) //show search
  const [options, setOptions] = useState([])
  const [search, setSearch] = useState('btc')
  const [data, setData] = useState()
  const timeoutRef = useRef(null)
  // const [value, setValue] = useState('')
  const [searchedStock, setSearchedStock] = useState('ibm')
  const [stockDaily, setStockDaily] = useState([])

  function validate() {
    console.log('validating after 5ms..');
  }

  useEffect(() => {
    let stocks = []
    let daily = []
    let d = new Date()
    let day = d.getDate()
    let month = d.getMonth()+1
    let year = d.getFullYear()
    // console.log(year+'-'+day+'-'+month);
    let currentDate = `${year}-${month}-${day}`
    console.log(currentDate);
    if(timeoutRef.current !== null){
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      //////////////////
      fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=QZ4L2TSNZBWXXVTO`)
        .then(res => res.json())
        .then((data) =>{
          stocks = [...stocks, data]
          setOptions(stocks[0].bestMatches)
        })
      /////////////////
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${searchedStock}&apikey=QZ4L2TSNZBWXXVTO`)
        .then(res => res.json())
        .then((data) =>{
          daily = [...daily, data]
          console.log(daily[0]['Time Series (Daily)']["2020-06-18"])
// daily[0]['Time Series (Daily)']["2020-06-18"]
console.log(daily);
          setStockDaily(daily)
        })
    }, 1000)

      // fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=QZ4L2TSNZBWXXVTO`)
      //   .then(res => res.json())
      //   .then((data) =>{
      //     stocks = [...stocks, data]
      //     setOptions(stocks[0].bestMatches)
      //   })

  }, [search, searchedStock])



let handleChange = (e) => {
  setTimeout(setSearch(e.target.value || 'btc'), 2000)
  // setTimeout(console.log('yo'), 20000)
  // console.log('yo');
}

let returnResults = (stock) => {
  return(
    <div onClick ={(e) => console.log(e)}>
      <span>{stock['1. symbol']} - {stock['2. name']}</span>
    </div>
  )
}

  return(
    <div>
      <input
        placeholder='type to search'
        onChange={(e) => setSearch(e.target.value || 'btc')}
        // value = {value}
      />

      {console.log('search: ',search)}
      {console.log('options: ',options)}
      {options.map((stock, i) => {
        // console.log('test', stock, i);
          let symbol = stock['1. symbol']
          let name = stock['2. name']
        return(
          <div onClick ={(e) => setSearchedStock(symbol)}
          key = {i}
          >
          {console.log('click',searchedStock)}
            <span>{symbol} - {name}</span>
          </div>
        )
      })}

      {stockDaily.map((stock, i) =>{
        console.log(stock['Time Series (Daily)']["2020-06-18"]);
        let arr = stock['Time Series (Daily)']["2020-06-18"]
        // 1. open: "123.0000"
        // 2. high: "124.4000"
        // 3. low: "122.3300"
        // 4. close: "124.1600"
        // 5. volume: "2860286"
        let o = arr['1. open']
        let h = arr['2. high']
        let l = arr['3. low']
        let c = arr['4. close']
        console.log(o, h, l, c);
        return(
          <div>
            <h1> {searchedStock} </h1>
            <span>open: {o} </span>
            <span>high: {h} </span>
            <span>low: {l} </span>
            <span>close: {c} </span>
          </div>
        )
      })}

    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Custom AutoComplete React</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto />
      </div>
    </div>
  );
}

export default App;
