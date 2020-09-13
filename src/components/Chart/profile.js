import React, { Component, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'


const Profile = () => {

    const stock = useSelector(state => state.search.stock.symbol)
    const user = useSelector(state => state.user)
    
    const profileRef = useRef()
    // this._ref = React.createRef();
    useEffect(() =>{
        
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
        script.async = true;
        console.log(stock)
        script.innerHTML = JSON.stringify(
        {
            "symbol": stock,
            "width": '100%',
            "height": '100%',
            "colorTheme": "light",
            "isTransparent": false,
            "locale": "en"
          })
          profileRef.current.appendChild(script);
    }, [stock])
    return(
        <div class="tradingview-widget-container" ref={profileRef}>
                <div class="tradingview-widget-container__widget"></div>
            </div>
    )
}

export default Profile

