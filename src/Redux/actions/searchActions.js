import axios from 'axios'
import { GET_STOCKS, LOADING_UI, SET_CURRENT_STOCK } from './types'

export const setCurrentStock = stock => (dispatch) => {
    dispatch({ type: LOADING_UI })
    dispatch ({
        type: SET_CURRENT_STOCK,
        payload: stock
    })
}
