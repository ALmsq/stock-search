import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useOnClickOutside } from './hooks'
import PulseLoader from 'react-spinners/PulseLoader'
import TradingViewWidget from 'react-tradingview-widget'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentStock } from './Redux/actions/searchActions'
import { useHistory } from 'react-router-dom'

import "./styles.css";

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #37474f;
  /* Change width of the form depending if the bar is opened or not */
  width: ${props => (props.barOpened ? "30rem" : "2rem")};
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */;
  cursor: ${props => (props.barOpened ? "auto" : "pointer")};
  padding: 2rem;
  height: 2rem;
  border-radius: 10rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

  const Result = styled.div`
  width: auto;
  display: ${props => (props.resultOpened ? 'block' : 'none')};

  margin-top: 300px;
  border-radius: 20px;
  background-color: ${props => (props.loading ? 'transparent' : '#36484F')};
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 3s;
  `;

  const OHLC = styled.div`
  position: absolute;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  `;

  const Load = styled.div`
    display: inline-block;
    align-content: center;
  `;

const Input = styled.input`
  font-size: 12px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${props => (props.barOpened ? "1rem" : "0rem")};
  border: none;
  color: white;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

const Button = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.barOpened ? "auto" : "none")};
  cursor: ${props => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`;

const Img = styled.img`
  height: 25px
`

const Auto = () => {
  const [input, setInput] = useState("");
  const [empty, setEmpty] = useState(true)
  const [barOpened, setBarOpened] = useState(false);
  const [resultOpened, setResultOpened] = useState(false)
  const formRef = useRef();
  const inputFocus = useRef();
  const spanFocus = useRef()
  // const node = useRef()
  const resultFocus = useRef()
  const node = useRef()
  useOnClickOutside(node, () => setResultOpened(false))
  //////////////////////////////
  const [display, setDisplay] = useState(false) //show search
  const [options, setOptions] = useState([])
  const [search, setSearch] = useState('ibm')
  const [loading, setLoading] = useState(false)

  const timeoutRef = useRef(null)

  const [searchedStock, setSearchedStock] = useState('aapl')
  const [stockDaily, setStockDaily] = useState([])
  const wrapperRef = useRef(null)


  useEffect(() => {
    let stocks = []
    let daily = []
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
      //////////////////
      fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=QZ4L2TSNZBWXXVTO`)
        .then(res => res.json())
        .then((data) =>{
          stocks = [...stocks, data]
          setOptions(stocks[0].bestMatches)
          setEmpty(false)
          console.log('options',options);
          console.log(loading);
        })
      /////////////////
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${searchedStock}&apikey=QZ4L2TSNZBWXXVTO`)
        .then(res => res.json())
        .then((data) =>{
          daily = [...daily, data]
          setStockDaily(daily)

          // console.log(daily);
        })
    }, 2000)

  }, [input, searchedStock])

  ////////////////////////////////////////
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

  // useEffect(() => {
  //   if(options === undefined || options.length === 0){
  //     setEmpty(true)
  //   }
  //   else{
  //     setEmpty(false)
  //     console.log(options.length);
  //   }
  //   console.log('empty: ', empty);
  //
  // },[options])
  const dispatch = useDispatch()
  const history = useHistory()

  const onStockClick = (symbol, name) =>{
    name = name.split(' ').shift()
    dispatch(setCurrentStock({stock: symbol}))
    // console.log(setCurrentStock(stock))
    console.log('symbol: ', symbol, 'name: ', name)
    history.push(`/chart/${name}`)
  }




  const onFormSubmit = e => {
    // When form submited, clear input, close the searchbar and do something with input
    e.preventDefault();
    // setInput("");
    setBarOpened(true);
    // setEmpty(true)
    // After form submit, do what you want with the input value
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
          // console.log(symbol, name);


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

        {/* <OHLC>
        { options ? (stockDaily.map((stock, i) =>{



      if(!stock.Note){
        let arr = stock['Time Series (Daily)']["2020-06-18"]
        console.log(arr);
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
          <div key = {i}>
            <h1> {(searchedStock)} </h1>
            <span>open: {o} </span>
            <span>high: {h} </span>
            <span>low: {l} </span>
            <span>close: {c} </span>
          </div>
        )


      }else{
        return(
          <div>
          <h1>{(searchedStock)}</h1>
          <div>API loading</div>
          <PulseLoader color={'#36484F'} />
          </div>
        )

        }


    })) : ( <div></div>) }
        </OHLC> */}

        </Result>
        {/* <TradingViewWidget
          symbol="NASDAQ:AAPL"
          locale="fr"
          
        /> */}



    </div>

  );
}

export default Auto
