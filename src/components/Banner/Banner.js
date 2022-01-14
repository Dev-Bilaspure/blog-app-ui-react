import { Box, Button, Grid, Hidden, Typography } from '@material-ui/core';
import React from 'react'
import useStyle from './bannerStyles';


const Banner = () => {
  const classes = useStyle();
  return (
    <Box className={classes.image}>
      <Grid container>
        <Grid item lg={7}>
          <Typography className={classes.heading}>
            Maadhyam: A paltform to read, write and connect
          </Typography>
          <Hidden xsDown smDown >
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
