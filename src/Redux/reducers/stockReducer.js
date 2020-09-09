import {
    SET_CURRENT_STOCK,
    UPDATE_STOCK,
    GET_STOCKS
} from '../actions/types'


const initialState = {
    stock: 'AMD'
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_STOCK:
            return {
                ...state, 
                stock: action.payload
            }
        case GET_STOCKS:
            return {
                stocks: action.payload
            }
            default:
                return state
    }
}

// export default function(state = initialState, action){
//     switch(action.type){
//         case UPDATE_STOCK:
//             return {
//                 ...state, 
//                 stock: action.payload
//             }
//             default:
//                 return state
//     }
// }

// export default function(state = [], action){
//     switch(action.type){
//         case GET_STOCKS:
//             return {
//                 stocks: action.payload
//             }
//             default:
//                 return state
//     }
// }
