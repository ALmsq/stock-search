import {
    LOADING_UI,
    LOADING_DATA,
    GET_STOCKS,
    POST_STOCK
  } from './types';

  import axios from 'axios';

  export const postStock = (newStock) => (dispatch) {
      dispatch({ type: LOADING_UI })
      axios.post('/user', newStock)
      .then((res) => {
          dispatch({ 
              type: POST_STOCK,
              payload: res.data
          })
      })
  }
  