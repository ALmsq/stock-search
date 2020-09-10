import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const SymbolOverview = (props) => {
    
    const stock = useSelector(state => state.stock.stock)
    const profileRef = useRef()
    // this._ref = React.createRef();
    useEffect(() =>{
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript"
        script.async = true;
        script.dangerouslySetInnerHTML = 
        
        {
            "symbols": [
                [
                  "Apple",
                  "AAPL"
                ],
                [
                  "Google",
                  "GOOGL"
                ],
                [
                  "Microsoft",
                  "MSFT"
                ]
              ],
              "chartOnly": false,
                "width": "100%",
                "height": "100%",
                "locale": "en",
                "colorTheme": "dark",
                "gridLineColor": "#2A2E39",
                "trendLineColor": "#1976D2",
                "fontColor": "#787B86",
                "underLineColor": "rgba(55, 166, 239, 0.15)",
                "isTransparent": false,
                "autosize": true,
                "container_id": "tradingview_cfec3"
            }
          profileRef.current.appendChild(script);
    }, [])
    return(
    <div id='mediumwidgetembed' style={{width:'100%', height: "100%"}}>
        <div class="tradingview-widget-container" ref={profileRef}>
        <div id="tradingview_beb3b"></div>
        <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/AAPL/" rel="noopener" target="_blank"><span class="blue-text">Apple</span></a> by TradingView</div>
    </div>
    </div>
    )
}

export default SymbolOverview


