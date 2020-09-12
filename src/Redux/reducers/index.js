import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import searchActions from './searchActions'
import userReducer from './userReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    search: searchActions,
    user: userReducer
})