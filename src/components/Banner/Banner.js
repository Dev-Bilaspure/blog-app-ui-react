import { Box, Button, Grid, Hidden, Typography } from '@material-ui/core';
import React from 'react'
import useStyle from './bannerStyles';
import './../../Pages/Home/homeStyle.css'
import {useNavigate, useLocation} from 'react-router-dom';

const Banner = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const location = useLocation();
  const handleStartWritingClick = () => {
    navigate('/write', {state: {from: location}});
  }
  return (
    <Box className={classes.image}>
      <Grid container className={classes.toGivePadding}>
        <Grid item lg={7} md={7}>
          {/* <Grid container> */}
            {/* <Grid item lg={1} md={1} sm={0} xs={0}>  */}
            
            {/* </Grid> */}
            {/* <Grid item lg={11} md={11} sm={0} xs={0}> */}
              <Typography className={classes.heading}>
                Maadhyam: A paltform to read, write and connect
              </Typography>
              {/* <Hidden xsDown smDown > */}
                <Typography className={classes.subHeading}>
                  If you have a story to tell, knowledge to share, or a perspective to offer — welcome home.
                </Typography>
              {/* </Hidden> */}
              <Button variant="outlined" size="large" className={classes.startWritingButton} onClick={handleStartWritingClick}>
                Start Writing
              </Button>
            {/* </Grid> */}
          {/* </Grid> */}
          
        </Grid>
      </Grid>
      
    </Box>
  )
}

export default Banner
