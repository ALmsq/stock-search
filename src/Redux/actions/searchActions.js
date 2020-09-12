import axios from 'axios'
import { GET_STOCKS } from './types'

export const setCurrentStock = stock => {
    return {
        type: 'SET_CURRENT_STOCK',
        payload: stock
    }
}
