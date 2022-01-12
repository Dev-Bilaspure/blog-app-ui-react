import { Box } from '@material-ui/core'
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from './Pages/Blog/Blog';
import Write from './Pages/Write/Write';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/write' element={<Write />} />
          <Route exact path='/blog/:id' element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
