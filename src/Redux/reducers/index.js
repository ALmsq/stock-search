import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import stockReducer from './stockReducer'
import userReducer from './userReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    stock: stockReducer,
    user: userReducer
})