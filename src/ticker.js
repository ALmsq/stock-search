import React from 'react'
import TradingViewWidget from 'react-tradingview-widget'
import {Helmet} from 'react-helmet'
import "./styles.css";

export default class Ticker extends React.Component {

  constructor(props) {
    super(props);
    this._ref = React.createRef();
}
render() {
    return(
    <div style={{zIndex: '2'}} class="tradingview-widget-container" ref={this._ref}>
        <div class="tradingview-widget-container__widget"></div>

    </div>
    );
}
componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true;
    script.innerHTML = {
  "symbols": [
    {
      "proName": "FOREXCOM:SPXUSD",
      "title": "S&P 500"
    },
    {
      "proName": "FOREXCOM:NSXUSD",
      "title": "Nasdaq 100"
    },
    {
      "proName": "FX_IDC:EURUSD",
      "title": "EUR/USD"
    },
    {
      "proName": "BITSTAMP:BTCUSD",
      "title": "BTC/USD"
    },
    {
      "proName": "BITSTAMP:ETHUSD",
      "title": "ETH/USD"
    }
  ],
  "colorTheme": "light",
  "isTransparent": false,
  "displayMode": "regular",
  "locale": "en"
}
    this._ref.current.appendChild(script);
}
}
