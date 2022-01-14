import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import Banner from '../../components/Banner/Banner';
import Categories from '../../components/Categories/Categories';
import Posts from '../../components/Posts/Posts';
// import useStyles from './homeStyles'
import './homeStyle.css'

const useStyles  = makeStyles({
  banner: {
    
  },
  categories: {
    
  },
  belowBanner: {
    paddingTop: 20,
    paddingRight: 15,
    paddingLeft: 15
  }
})
const Home = () => {
  const classes = useStyles();
  return (
    <Box style={{overflowX: 'hidden'}} className='homePageWrapper'> 
      <Banner className={classes.banner}/>
      <Grid container className={classes.belowBanner}>
        <Grid item lg={3} md={3} xs={12} sm={12}>
          <Categories className={classes.categories} />
        </Grid>
        <Grid item lg={9} md={9} xs={12} sm={12}>
          <Box style={{paddingLeft: 20, marginBottom: 15}}>
            <Typography variant='h5' style={{fontFamily: `'Roboto Slab', 'serif'`}} >All Categories:</Typography>
          </Box>
          <Posts />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
