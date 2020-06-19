
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
  const [clickedStock, setClickedStock] = useState('')

  function validate() {
    console.log('validating after 5ms..');
  }

  useEffect(() => {
    let stocks = []
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

    }, 1000)

      // fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=QZ4L2TSNZBWXXVTO`)
      //   .then(res => res.json())
      //   .then((data) =>{
      //     stocks = [...stocks, data]
      //     setOptions(stocks[0].bestMatches)
      //   })

  }, [search])



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
          <div onClick ={(e) => setClickedStock(symbol)}
          key = {i}
          >
          {console.log('click',clickedStock)}
            <span>{symbol} - {name}</span>
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
