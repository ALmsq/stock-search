import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import stockReducer from './stockReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    stock: stockReducer
})