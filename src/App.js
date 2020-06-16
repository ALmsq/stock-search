import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import _ from 'lodash'

const Auto = () => {
  const [display, setDisplay] = useState(false) //show search
  const [options, setOptions] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    let stocks = []
    let term = 'btc'
    setSearch(term)
    axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=QZ4L2TSNZBWXXVTO`)
    .then(res => {
      console.log(res.data);
      let data = res.data
      console.log(data.bestMatches);
      // let stock = data.bestMatches.map((stock) =>[{symbol: stock['1. symbol'], name: stock['2. name'] }] )
      let stock = _.flattenDeep(Array.from(data.bestMatches.map((stock) =>[{symbol: stock['1. symbol'], name: stock['2. name'] }] )))

      stocks.push(stock)

    })

    setOptions(stocks)
    console.log(options);
    console.log(stocks);
    console.log(term);
    console.log(search);
  },[])

  return(
    <div>yo</div>
  )
}

function App() {
  return(
    <div>
      <Auto/>
    </div>
  )
}
export default App

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
//     console.log(options);
//     setOptions(pokemon);
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
