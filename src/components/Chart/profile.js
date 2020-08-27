import React, { Component, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

// import '../../styles.css'

// export default class Profile extends Component {
//     constructor(props) {
//         super(props);
//         this._ref = React.createRef();
//     }
//     componentDidMount() {
//         const script = document.createElement('script');
//         script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
//         script.async = true;
//         script.innerHTML = JSON.stringify(
//         {
//             "symbol": "NASDAQ:TSLA",
//             "width": '100%',
//             "height": '100%',
//             "colorTheme": "light",
//             "isTransparent": false,
//             "locale": "en"
//           })
//           this._ref.current.appendChild(script);
//     }
//     render() {
//         return (
//             <div class="tradingview-widget-container" ref={this._ref}>
//                 <div class="tradingview-widget-container__widget"></div>
//             </div>
//         )
//     }

   
// }

const Profile = () => {

    const stock = useSelector(state => state.stock.stock)
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

