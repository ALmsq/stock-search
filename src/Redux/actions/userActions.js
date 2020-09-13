import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
  } from '../actions/types';

  import axios from 'axios'

  export const loginUser = (userData, history) => (dispatch) => {
      dispatch({ type: LOADING_UI })
      axios.post('/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            history.push('/')
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
  }

  export const signupUser = (newUserData, history) => (dispatch) => {
      dispatch({ type: LOADING_UI })
      axios.post('/signup', newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            history.push('/')
      })
      .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
  }

  export const logoutUser = () => (dispatch) => {
      localStorage.removeItem('FBIdToken')
      delete axios.defaults.headers.common['Authorization']
      dispatch({ type: SET_UNAUTHENTICATED })
  }

  export const getUserData = () => (dispatch) => {
      dispatch({ type: LOADING_USER })
      axios.get('/user')
      .then((res) => {
          dispatch({
              type: SET_USER,
              payload: res.data
          })
      })
      .catch((err) => console.log(err))
  }

  export const addStock = (userDetails) => (dispatch) => {
      dispatch({ type: LOADING_USER })
      axios.post('/user', userDetails)
      .then(() => {
          dispatch(getUserData())
          console.log(userDetails)
      })
      .catch((err) => console.log(err))
  }

  export const removeStock = (userDetails) => (dispatch) => {
      dispatch({ type: LOADING_USER })
      axios.post('/user/rm', userDetails)
      .then(() => {
          dispatch(getUserData())
      })
      .catch((err) => console.log(err))
  }

  
  
  const setAuthorizationHeader = (token) => {
      const FBIdToken = `Bearer ${token}`
      localStorage.setItem('FBIdToken', FBIdToken)
      axios.defaults.headers.common['Authorization'] = FBIdToken
  }
  
