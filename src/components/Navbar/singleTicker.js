import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const SingleTicker = (props) => {
    
    const stock = useSelector(state => state.stock.stock)
    const profileRef = useRef()
    // this._ref = React.createRef();
    useEffect(() =>{
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
        script.async = true;
        script.innerHTML = JSON.stringify(
        {
            "symbol": 'tsla',
            "width": 350,
            "colorTheme": "dark",
            "isTransparent": false,
            "locale": "en"
          })
          profileRef.current.appendChild(script);
    }, [props.stock])
    return(
        <div class="tradingview-widget-container" ref={profileRef}>
            {console.log(props.stock)}
                <div class="tradingview-widget-container__widget"></div>
            </div>
    )
}

export default SingleTicker
