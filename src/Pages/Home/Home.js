import React from 'react'
import Banner from '../../components/Banner/Banner'
import Navbar from '../../components/Navbar/Navbar'
import useStyles from './styles'

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Banner />
    </div>
  )
}

export default Home
