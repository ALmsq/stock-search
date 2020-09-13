import {
    LOADING_UI,
    LOADING_DATA,
    GET_STOCKS,
    POST_STOCK,
    LOADING_USER
  } from './types';

  import axios from 'axios';

  export const postStock = (newStock) => (dispatch) => {
      dispatch({ type: LOADING_UI })
      axios.post('/user', newStock)
      .then(() => {
          dispatch({ 
              type: POST_STOCK,
              payload: res.data
          })
      })
  }
  