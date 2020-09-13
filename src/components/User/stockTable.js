import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserData } from '../../Redux/actions/userActions'
import { useGlobal } from 'reactn'
import axios from 'axios'


const StockTable = (props) => {
    
    const user = useSelector(state => state.user)
   let [ global, setGlobal ] = useGlobal()
    
    const profileRef = useRef()
    // this._ref = React.createRef();
    const dispatch = useDispatch()
    // const [allSymbols, setAllSymbols] = useState([])
    useEffect(() =>{
        
        let stocks = []
        const script = document.createElement('script');
        axios.get('/user')
        .then((res) => {
            // allSymbols.push(res.data.credentials.symbols)
            console.log(res.data.credentials.symbols.forEach(element => {
                stocks.push(element)
            }))
            
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
        script.async = true;
        script.innerHTML = JSON.stringify(
        {
            "width": "100%",
            "height": "100%",
            "symbolsGroups": [
                {
                "name": "Stocks",
                "originalName": "Indices",
                "symbols": stocks
                }
            ],
            "colorTheme": "dark",
            "isTransparent": false,
            "locale": "en"
          })
          return script
        })

          profileRef.current.appendChild(script);
    }, [])
    return(
        <div class="tradingview-widget-container" ref={profileRef}>
                <div class="tradingview-widget-container__widget"></div>
            </div>
    )
}

export default StockTable

