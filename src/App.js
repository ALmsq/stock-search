import React, { useState, useRef } from 'react'
import Auto from './Auto'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components'
import { useOnClickOutside } from './hooks'



function App() {
  const [open, setOpen] = useState(false)
  const inputFocus = useRef()
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))
return(
  <ThemeProvider theme={theme}>
  <>
  <GlobalStyles/>
  <div ref = {node}
  >
    <Burger open={open} setOpen={setOpen}/>
    <Menu open={open} setOpen={setOpen}/>
    <Auto/>
  </div>
  </>
  </ThemeProvider>
)}
export default App
