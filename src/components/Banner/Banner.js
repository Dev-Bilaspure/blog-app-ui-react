import { Box, Button, Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
// import url from './../../utils/banner-image.jpeg'
// import './bannerStyle.css'
import React from 'react'

const useStyle = makeStyles({
  image: {
    background: `url(${require('./../../utils/bannerImg.jpg')})  center/100% repeat-x #000`,
    height: '66vh',
    width: '100%',
    objectFit: 'cover',
    color: '#fff',
    paddingLeft: 70,
    paddingTop: 20,
    backgroundSize: 'cover'
  },
  heading: {
    fontSize: '4rem', 
    lineHeight: 1.1, 
    textShadow: '0px 0px 7px #000000', 
    fontFamily: `'Roboto Slab', 'serif'`
  },
  subHeading: {
    width: '90%', 
    fontSize: '1.3rem', 
    paddingTop: 20, 
    textShadow: '0px 0px 18px #000000'
  },
  startWritingButton: {
    background: '#fff', 
    color: '#000000', 
    marginTop: 20, 
    borderRadius: 25, 
    width: 120, 
    paddingRight: 10, 
    paddingLeft: 10, 
    boxShadow: '0px 0px 10px #000000', 
    textTransform: 'none'
  }
})
const Banner = () => {
  const classes = useStyle();
  return (
    <Box className={classes.image}>
      <Grid container>
        <Grid item lg={6}>
          <Typography className={classes.heading}>
            Maadhyam: A paltform to read, write and connect
          </Typography>
          <Hidden xsDown smDown mdDown>
            <Typography className={classes.subHeading}>
              If you have a story to tell, knowledge to share, or a perspective to offer — welcome home.
            </Typography>
          </Hidden>
          <Button variant="outlined" size="large" className={classes.startWritingButton}>
            Start Writing
          </Button>
        </Grid>
      </Grid>
      
    </Box>
  )
}

export default Banner
