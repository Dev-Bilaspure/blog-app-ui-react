import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, Typography, Button } from '@material-ui/core';
import './navbarStyle.css';
import { Hidden } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useStyle from './navbarStyles';
import BasicMenu from '../BasicMenu/BasicMenu';


const Navbar = ({user}) => {
  const classes = useStyle();
  const location = useLocation();
  const navigate = useNavigate();
  const handleClickSignIn = () => {
    navigate('/signin', {state: {from: location}});
  }
  const handleClickGetStarted = () => {
    navigate('/signup', {state: {from: location}});
  }
  return (
    (location.pathname!=='/profile' && location.pathname!=='/signin' && location.pathname!=='/signup') &&
    <AppBar className={classes.navbar}>
      <Toolbar className='navbarWrapper'>
        <div className={classes.logoAndLogoText}>
          <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
            <i className="fab fa-medium reverseText"></i>
          </Link>
          <Hidden smDown>
            <Typography className={classes.logoText}>
              <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
                Maadhyam
              </Link>
            </Typography>
          </Hidden>
        </div>
        <div style={{marginLeft: 'auto', marginRight: 0}}>
          <Grid container>
            <Hidden mdDown>
            <Grid item>
              <Link to='/write' style={{color: 'inherit', textDecoration: 'none'}}>
                <Typography className={classes.writeBtn}>
                  Contact us
                </Typography>
              </Link>
            </Grid>
            </Hidden>
            <Hidden smDown>
              <Grid item>
                <Link to='/write' style={{color: 'inherit', textDecoration: 'none'}}>
                  <Typography className={classes.writeBtn}>
                    Write
                  </Typography>
                </Link>
              </Grid>
            </Hidden>
            {
              user ?
              <Grid item style={{marginRight: 20}} >
                <BasicMenu />
              </Grid> :
              <>
                <Grid item>
                  <Typography className={classes.signInBtn} style={{color: '#000000', paddingRight: 35, paddingTop: 9}} onClick={handleClickSignIn}>
                    Sign In
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant='contained' className={classes.getStartedBnt} onClick={handleClickGetStarted}>
                    Get Started
                  </Button>
                </Grid>
              </>
            }
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;