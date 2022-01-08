import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
// import url from './../../utils/banner-image.jpeg'
import React from 'react'

const useStyle = makeStyles({
  image: {
    background: `url(${require('./../../utils/bannerImg.jpg')})  center/100% repeat-x #000`,
    height: '65vh',
    width: '100%',
    objectFit: 'cover',
    color: '#fff',
    position: 'sticky',
    paddingLeft: 80,
    paddingTop: 20
  }
})
const Banner = () => {
  const classes = useStyle();
  return (
    <Box className={classes.image}>
      <Grid container>
        <Grid item lg={6}>
          <Typography style={{fontSize: '4rem', lineHeight: 1.2, textShadow: '0px 0px 7px #000000', fontFamily: `'Roboto Slab', 'serif'`}}>
            Maadhyam: A paltform to read, write and connect
          </Typography>
          <Typography style={{width: '90%', fontSize: '1.3rem', paddingTop: 20, textShadow: '0px 0px 18px #000000'}}>
            If you have a story to tell, knowledge to share, or a perspective to offer — welcome home.
          </Typography>
          <Button variant="outlined" size="large" style={{background: '#fff', color: '#000000', marginTop: 20, borderRadius: 25, width: 120, paddingRight: 10, paddingLeft: 10, boxShadow: '0px 0px 8px #000000', textTransform: 'none'}}>
            Start Writing
          </Button>
        </Grid>
      </Grid>
      
    </Box>
  )
}

export default Banner
