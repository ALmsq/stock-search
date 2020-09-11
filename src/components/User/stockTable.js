import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const StockTable = (props) => {
    
    const stock = useSelector(state => state.stock.stock)
    const profileRef = useRef()
    // this._ref = React.createRef();
    useEffect(() =>{
        const script = document.createElement('script');
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
                "symbols": [
                    {
                    "name": "NASDAQ:AAPL",
                    "displayName": "Apple"
                    },
                    {
                    "name": "NASDAQ:TSLA",
                    "displayName": "Tesla"
                    },
                    {
                    "name": "NASDAQ:GOOG",
                    "displayName": "Google"
                    },
                    {
                    "name": "NASDAQ:FB",
                    "displayName": "Facebook"
                    }
                ]
                }
            ],
            "colorTheme": "dark",
            "isTransparent": false,
            "locale": "en"
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

