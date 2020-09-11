import React, { useState, useRef, useEffect } from 'react'
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
import {getStocks} from './Redux/actions/stockActions'
import Chart from './components/Chart/chart'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './components/Navbar/navbar'
import Login from './components/Login/login'
import Register from './components/Login/register'
import UserPage from './components/User/userPage'
import axios from 'axios'

axios.defaults.baseURL = 'https://stock-tracker-be252.web.app/'


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
  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()

  // useEffect( () => {
  //   // dispatch(getStocks(user.id))
  //   // // console.log(user.id)
  //   // const res = await axios.get(`http://localhost:5000/api/users/stocks/${user.id}`)
  //   // console.log(res.data)
  //   if(localStorage.jwtToken){
  //     //set auth token as header auth
  //     const token = localStorage.jwtToken
  //     setAuthToken(token)
  //     //decode token and get user info and token expiration
  //     const decoded = jwt_decode(token)
  //     //set user and isauthenticated
  //     store.dispatch(setCurrentUser(decoded))
    
  //     //check for expired token
  //     const currentTime = Date.now() / 1000 //in ms
  //     if(decoded.exp < currentTime) {
  //       //logout if expired
  //       store.dispatch(logoutUser())
  //       //redirect to login
  //       window.location.href = './login'
  //     }
  //   }
  // },[])
  
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
      <UserPage/>
      </div>
    }/>
  </Switch>
  </>
  </ThemeProvider>

  
)}
export default App
