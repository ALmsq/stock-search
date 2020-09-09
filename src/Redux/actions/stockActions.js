import axios from 'axios'
import { GET_STOCKS } from './types'

export const setCurrentStock = stock => {
    return {
        type: 'SET_CURRENT_STOCK',
        payload: stock
    }
}

export const updateStock = (stock) => dispatch => {
    console.log(stock)
    return {
        type: 'UPDATE_STOCK',
        payload: stock
    }
}

// export const getStocks = (userID) => dispatch => {
//     axios.get(`http://localhost:5000/api/users/stocks/${userID}`)
//     .then(res => res.json())
//     .then(stocks =>{
//         console.log(stocks)
//         dispatch({
//             type: GET_STOCKS,
//             payload: stocks
//         })
//     })
// }

export const getStocks = (userID) => dispatch => {
    axios.get(`http://localhost:5000/api/users/stocks/${userID}`)
    .then((res) =>{
        console.log(res)
    })
}