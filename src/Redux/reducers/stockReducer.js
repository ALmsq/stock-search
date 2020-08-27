import {
    SET_CURRENT_STOCK
} from '../actions/types'
import { setCurrentUser } from '../actions/authActions'

const isEmpty = require('is-empty')

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
            default:
                return state
    }
}