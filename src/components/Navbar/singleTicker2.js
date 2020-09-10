import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const SingleTicker2 = (props) => {
    
    const stock = useSelector(state => state.stock.stock)
    const profileRef = useRef()
    // this._ref = React.createRef();
    useEffect(() =>{
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
        script.async = false;
        script.innerHTML = JSON.stringify(
        {
            "symbol": 'aapl',
            "width": 350,
            "colorTheme": "dark",
            "isTransparent": false,
            "locale": "en"
          })
          profileRef.current.appendChild(script);
    }, [props.stock])
    return(
        <iframe>
            <div class="tradingview-widget-container" ref={profileRef}>
            {console.log(props.stock)}
                <div class="tradingview-widget-container__widget"></div>
            </div>
        </iframe>
    )
}

export default SingleTicker2