import React from 'react'
import {AppBar, Toolbar, Typography, Button, Hidden } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './navbarStyles';


const Navbar = () => {
  const { navbar, logo, buttons, writeButton, signInButton, getStartedButton, reverseTxt } = useStyles();
  const location = useLocation();
  console.log(location);
  return (
    <AppBar className={navbar}>
      <Toolbar>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Typography variant='h4' className={logo}>
            <Hidden><div className={reverseTxt}><i class="fab fa-medium" ></i></div></Hidden> {location.pathname==='/' && <Hidden mdDown xsDown>Maadhyam</Hidden>}
          </Typography>
        </Link>
        <div className={buttons}>
          <Link to='/signup'>
            <Button variant="contained" size="small" className={getStartedButton}>
              Get Started
            </Button>
          </Link>
          <Hidden smDown xsDown>
            <Link to='/signin' style={{ textDecoration: 'none' }}>
              <Typography className={signInButton}>
                Sign In
              </Typography>
            </Link>
          </Hidden>
          {
            location.pathname==='/' 
            && 
            <div>
              <Hidden xsDown smDown>
                <Link to='/write' style={{ textDecoration: 'none' }}>
                  <Typography className={writeButton}>
                    Write
                  </Typography>
                </Link>
              </Hidden>
              
              <Hidden xsDown smDown>
                <Link to='/contact' style={{ textDecoration: 'none' }}>
                  <Typography className={writeButton}>
                    Contact Us
                  </Typography>
                </Link>
            </Hidden>
            </div>
            
          }
          
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
