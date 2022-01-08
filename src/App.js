import { Box } from '@material-ui/core'
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './Pages/Home/Home'

const App = () => {
  return (
    <>
      <Navbar />
      <Box>
        <Home />
      </Box>
    </>
  )
}

export default App
