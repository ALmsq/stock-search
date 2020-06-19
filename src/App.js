// import React, { useEffect, useState, useRef } from 'react'
// import axios from 'axios'
// import _ from 'lodash'
//
// const Auto = () => {
//   const [display, setDisplay] = useState(false) //show search
//   const [options, setOptions] = useState([])
//   const [search, setSearch] = useState('btc')
//
//   let stocks = []
//   useEffect(() => {
//
//     let term = 'btc'
//     setSearch(term)
//     axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=QZ4L2TSNZBWXXVTO`)
//     .then(res => {
//       console.log(res.data);
//       let data = res.data
//       console.log(data.bestMatches);
//       // let stock = data.bestMatches.map((stock) =>[{symbol: stock['1. symbol'], name: stock['2. name'] }] )
//       let stock = _.flattenDeep(Array.from(data.bestMatches.map((stock) =>[{symbol: stock['1. symbol'], name: stock['2. name'] }] )))
//       console.log(stock);
//       stocks.push(stock)
//
//     })
//     setOptions(...options, stocks)
//
//     // console.log('options: ',options);
//     // console.log('stocks: ',stocks);
//     // console.log(term);
//     // console.log('search: ',search);
//   },[])
//
//
//   // console.log('options: ',options);
//
//
//
//
//   const updateSearch = e =>{
//     // setSearch((e.target.value))
//     console.log(e);
//     console.log(e);
//     console.log(options);
//     console.log(search);
//   }
//
//
//   return(
//     <div>
//       <input
//         id='auto'
//         onClick={()=> setDisplay(!display)}
//         placeholder='type to search'
//         value={search}
//         onChange={event => setSearch(event.target.value)}
//       />
//       // {console.log(display)}
//       {display && (
//         <div>
//           {options.map((value, i) => {
//             return(
//               <div
//                 onClick={() => updateSearch(value)}
//                 key={i}
//                 tabIndex='0'
//               >
//               {console.log(value)}
//               <span>{value[0]['symbol']}</span>
//               // {console.log(value)}
//               </div>
//             )
//           })
//
//           }
//         </div>
//       )}
//     </div>
//   )
// }
//
// function App() {
//   return(
//     <div>
//       <Auto/>
//     </div>
//   )
// }
// export default App

///////////////////////////////////////

// import React, { useEffect, useState, useRef } from "react";
// import logo from "./logo.svg";
// import "./App.css";
//
// const Auto = () => {
//   const [display, setDisplay] = useState(false);
//   const [options, setOptions] = useState([]);
//   const [search, setSearch] = useState("");
//   const wrapperRef = useRef(null);
//
//   useEffect(() => {
//     const pokemon = [];
//     const promises = new Array(20)
//       .fill()
//       .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
//     Promise.all(promises).then(pokemonArr => {
//       return pokemonArr.map(value =>
//         value
//           .json()
//           .then(({ name, sprites: { front_default: sprite } }) =>
//             pokemon.push({ name, sprite })
//
//           )
//       );
//     });
//
//     console.log(pokemon);
//     console.log('options', options);
//     setOptions(pokemon);
//     console.log(options);
//   }, []);
//
//   useEffect(() => {
//     window.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       window.removeEventListener("mousedown", handleClickOutside);
//     };
//   });
//
//   const handleClickOutside = event => {
//     const { current: wrap } = wrapperRef;
//     if (wrap && !wrap.contains(event.target)) {
//       setDisplay(false);
//     }
//   };
//
//   const updatePokeDex = poke => {
//     setSearch(poke);
//     console.log(search);
//     console.log(options);
//     setDisplay(false);
//   };
//
//   return (
//     <div ref={wrapperRef} className="flex-container flex-column pos-rel">
//       <input
//         id="auto"
//         onClick={() => setDisplay(!display)}
//         placeholder="Type to search"
//         value={search}
//         onChange={event => setSearch(event.target.value)}
//
//
//       />
//       {display && (
//         <div className="autoContainer">
//           {options
//             .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
//             .map((value, i) => {
//               return (
//                 <div
//                   onClick={() => updatePokeDex(value.name)}
//                   className="option"
//                   key={i}
//                   tabIndex="0"
//                 >
//                   <span>{value.name}</span>
//                   <img src={value.sprite} alt="pokemon" />
//                 </div>
//               );
//             })}
//         </div>
//       )}
//     </div>
//   );
// };
//
// function App() {
//   return (
//     <div className="App">
//       <h1>Custom AutoComplete React</h1>
//       <div className="logo"></div>
//       <div className="auto-container">
//         <Auto />
//       </div>
//     </div>
//   );
// }
//
// export default App;
////////////////////////////////

import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import _ from 'lodash'
import fetchTimeout from 'fetch-timeout'

const Auto = () => {
  const [display, setDisplay] = useState(false) //show search
  const [options, setOptions] = useState([])
  const [search, setSearch] = useState('btc')
  const [data, setData] = useState()
  const timeoutRef = useRef(null)
  const [value, setValue] = useState('')

  function validate() {
    console.log('validating after 5ms..');
  }


  useEffect(() => {
    let stocks = []
    if(timeoutRef.current !== null){
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      //////////////////
      fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=QZ4L2TSNZBWXXVTO`)
        .then(res => res.json())
        .then((data) =>{
          stocks = [...stocks, data]
          setOptions(stocks[0].bestMatches)
        })
      /////////////////

    }, 1000)

      // fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=QZ4L2TSNZBWXXVTO`)
      //   .then(res => res.json())
      //   .then((data) =>{
      //     stocks = [...stocks, data]
      //     setOptions(stocks[0].bestMatches)
      //   })

  }, [search])



let handleChange = (e) => {
  setTimeout(setSearch(e.target.value || 'btc'), 2000)
  // setTimeout(console.log('yo'), 20000)
  // console.log('yo');
}

let returnResults = (stock) => {
  return(
    <div onClick ={(e) => console.log(e)}>
      <span>{stock['1. symbol']} - {stock['2. name']}</span>
    </div>
  )
}

  return(
    <div>
      <input
        placeholder='type to search'
        onChange={(e) => setSearch(e.target.value || 'btc')}
        // value = {search}
      />
      {console.log('search: ',search)}
      {console.log('options: ',options)}
      {options.map((stock, i) => {
        // console.log('test', stock, i);
        return(
          <div onClick ={(e) => console.log(i)}
          key = {i}
          >
            <span>{stock['1. symbol']} - {stock['2. name']}</span>
          </div>
        )
      })}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Custom AutoComplete React</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto />
      </div>
    </div>
  );
}

export default App;
