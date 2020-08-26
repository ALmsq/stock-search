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
import Chart from './components/Chart/chart'



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
        <Auto/>
      </div>
    }/>
    <Route exact path='/chart' render={() =>
      
      <div ref = {node}>
      <Burger open={open} setOpen={setOpen}/>
      <Menu open={open} setOpen={setOpen}/>
      <Ticker/> 
      <Chart /> 
      </div>
    }/>
  </Switch>
  </>
  </ThemeProvider>

  
)}
export default App
