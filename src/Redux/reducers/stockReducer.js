import {
    LOADING_DATA,
    GET_STOCKS,
    POST_STOCK,
    DELETE_STOCK
} from '../actions/types'

const initialState = {
    stocks: [],
    loading: true
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            }
        case GET_STOCKS:
            return {
                ...state,
                stocks: action.payload,
                loading: false
            }
        case POST_STOCK:
            return {
                ...state,
                stocks: [action.payload, ...state.stocks]
            }
        default: 
            return state
    }
}