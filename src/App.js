import React, { useState, useRef } from 'react'
import { Route, Switch } from 'react-router'
import Auto from './Auto'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components'
import { useOnClickOutside } from './hooks'
import Ticker from './ticker'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import store from './Redux/store'
import { setCurrentUser, logoutUser } from './Redux/actions/authActions'
import Chart from './components/Chart/chart'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar/navbar'
import Login from './components/Login/login'
import Register from './components/Login/register'


if(localStorage.jwtToken){
  //set auth token as header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  //decode token and get user info and token expiration
  const decoded = jwt_decode(token)
  //set user and isauthenticated
  store.dispatch(setCurrentUser(decoded))

  //check for expired token
  const currentTime = Date.now() / 1000 //in ms
  if(decoded.exp < currentTime) {
    //logout if expired
    store.dispatch(logoutUser())
    //redirect to login
    window.location.href = './login'
  }
}


function App() {
  const [open, setOpen] = useState(false)
  const inputFocus = useRef()
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))
  
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
  </Switch>
  </>
  </ThemeProvider>

  
)}
export default App
