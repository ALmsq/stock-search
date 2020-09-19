import React, { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from './hooks'
import PulseLoader from 'react-spinners/PulseLoader'
import { useDispatch } from 'react-redux'
import { setCurrentStock } from './Redux/actions/searchActions'
import { useHistory } from 'react-router-dom'
import { Form, Result, Load, Input, Button, Img } from './Auto.styled'

import "./styles.css";

const Auto = () => {
  const [input, setInput] = useState("");
  const [barOpened, setBarOpened] = useState(false);
  const [resultOpened, setResultOpened] = useState(false)
  const formRef = useRef();
  const inputFocus = useRef();
  const spanFocus = useRef()
  const node = useRef()
  useOnClickOutside(node, () => setResultOpened(false))
  //////////////////////////////
  const [display, setDisplay] = useState(false) //show search
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const timeoutRef = useRef(null)

  const [searchedStock, setSearchedStock] = useState('aapl')
  
  const wrapperRef = useRef(null)


  useEffect(() => {
    let stocks = []
    let d = new Date()
    let day = d.getDate()
    let month = d.getMonth()+1
    let year = d.getFullYear()

    let currentDate = `${year}-${month}-${day}`
    console.log(currentDate);
    if(timeoutRef.current !== null){
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=QZ4L2TSNZBWXXVTO`)
        .then(res => res.json())
        .then((data) =>{
          stocks = [...stocks, data]
          setOptions(stocks[0].bestMatches)
          console.log('options',options);
          console.log(loading);
        })
    }, 2000)

  }, [input, searchedStock])

  
  //temp display closed
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside)
    return() => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  })

  const handleClickOutside = e => {
    const { current: wrap } = wrapperRef
    if(wrap && !wrap.contains(e.target)){
      setDisplay(false)
    }
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const onStockClick = (symbol, name) =>{
    name = name.split(' ').shift()
    dispatch(setCurrentStock({symbol: symbol, name: name}))
    console.log('symbol: ', symbol, 'name: ', name)
    history.push(`/chart/${name}`)
  }




  const onFormSubmit = e => {
    e.preventDefault();
    setBarOpened(true);
    console.log(`Form was submited with input: ${input}`);
  };

  return (
    <div className="App">
      <div className="Search">
      <Form
        barOpened={barOpened}
        onClick={() => {
          // When form clicked, set state of baropened to true and focus the input
          setBarOpened(true);
          setResultOpened(true)
          inputFocus.current.focus();
          setDisplay(!display)
        }}
        // on focus open search bar
        onFocus={() => {
          setBarOpened(true);
          setLoading(true)
          inputFocus.current.focus();
        }}
        // on blur close search bar
        onBlur={() => {
          setBarOpened(false);

        }}
        // On submit, call the onFormSubmit function
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <Button type="submit" barOpened={barOpened}>
          <Img src='https://image.flaticon.com/icons/svg/2919/2919722.svg' alt='search icon'/>
        </Button>
        <Input
          onChange={e => setInput(e.target.value)}
          ref={inputFocus}
          value={input}
          barOpened={barOpened}
          placeholder="Search for a stock..."

        />
      </Form>
      </div>

        <Result ref = {node}

        resultOpened={resultOpened}

        >
          { options ? ( options.map((stock, i) => {

          let symbol = stock[`1. symbol`]
          let name = stock['2. name']
          


          return(
            <div ref = {spanFocus}
            onClick = {(e) =>{
              setSearchedStock(symbol)
              onStockClick(symbol, name)
                }}
            key = {i}
            >
            <span style={{cursor: 'pointer'}} >{symbol} - {name}</span>

            </div>

          )
        }) ) : ( <Load className='yo'><PulseLoader loading={true} setLoading={true} margin={5} color={'#2dc5e8b5'}/></Load> )}


        </Result>



    </div>

  );
}

export default Auto
