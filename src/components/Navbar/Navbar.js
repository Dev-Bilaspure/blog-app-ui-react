import React from 'react'
import {AppBar, Toolbar, Typography, Button, Hidden, Box } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './navbarStyles';
import './navbarStyle.css';


const Navbar = () => {
  const { navbar, logo, buttons, writeButton, signInButton, getStartedButton, reverseTxt } = useStyles();
  const {pathname} = useLocation();
  return (
    <Box className='navbarWrapper'>
      {
        pathname!=='/profile' &&
        <AppBar className={navbar}>
          <Toolbar>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Typography variant='h4' className={logo}>
                <Hidden>
                  <div className={reverseTxt}>
                    <i class="fab fa-medium" ></i>
                  </div>
                </Hidden> 
                {pathname==='/' && <Hidden mdDown xsDown>Maadhyam</Hidden>}
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
                pathname==='/' 
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
      }
      
    </Box>
    
  )
}

export default Navbar
