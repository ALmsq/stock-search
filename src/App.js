import React, { useState, useRef } from 'react'
import { Route, Switch } from 'react-router'
import Auto from './Auto'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components'
import { useOnClickOutside } from './hooks'
import Ticker from './ticker'
import jwtDecode from 'jwt-decode'
import store from './Redux/store'


import Chart from './components/Chart/chart'
import { useSelector} from 'react-redux'
import Navbar from './components/Navbar/navbar'
import Login from './components/Login/login'
import Register from './components/Login/register'
import UserPage from './components/User/userPage'

import { SET_AUTHENTICATED } from './Redux/actions/types'
import { logoutUser, getUserData } from './Redux/actions/userActions'
import axios from 'axios'

axios.defaults.baseURL = 'https://us-central1-stock-tracker-be252.cloudfunctions.net/api'

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


function App() {
  const [open, setOpen] = useState(false)
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))
  const allSymbols = useSelector(state => state.user.credentials)

  

return(
  
  <ThemeProvider theme={theme}>
  <>
  <GlobalStyles/>
  <Switch>
    <Route exact path='/' render={() =>
      <div ref = {node}
      >
        <Burger open={open} setOpen={setOpen}/>
        <Menu open={open} setOpen={setOpen}/>
        <Ticker/>
        <Navbar/>
        <Auto/>
      </div>
    }/>
    <Route path='/chart' render={() =>
      
      <div ref = {node}>
      <Burger open={open} setOpen={setOpen}/>
      <Menu open={open} setOpen={setOpen}/>
      <Ticker/>
      <Navbar/> 
      <Chart /> 
      </div>
    }/>
    <Route path='/login' render={() =>
      <div ref = {node}>
      <Burger open={open} setOpen={setOpen}/>
      <Menu open={open} setOpen={setOpen}/>
      <Ticker/>
      <Login/> 
      </div>
    }/>
    <Route path='/register' render={() =>
      <div ref = {node}>
      <Burger open={open} setOpen={setOpen}/>
      <Menu open={open} setOpen={setOpen}/>
      <Ticker/>
      <Register/> 
      </div>
    }/>
    <Route path='/userpage' render={() =>
      <div ref = {node}>
      <Burger open={open} setOpen={setOpen}/>
      <Menu open={open} setOpen={setOpen}/>
      <Ticker/>
      <Navbar/>
      <UserPage symbols={allSymbols.symbols} />
      </div>
    }/>
  </Switch>
  </>
  </ThemeProvider>

  
)}
export default App
