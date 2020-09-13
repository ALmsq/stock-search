import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import searchReducer from './searchReducer'
import userReducer from './userReducer'
import uiReducer from './uiReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    search: searchReducer,
    ui: uiReducer,
    user: userReducer
})