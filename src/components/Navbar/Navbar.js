import React from 'react'
import {AppBar, Toolbar, Typography, Button, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './navbarStyles';


const Navbar = () => {
  const { navbar, logo, buttons, writeButton, signInButton, getStartedButton, reverseTxt } = useStyles();

  return (
    <AppBar className={navbar}>
      <Toolbar>
        {/* <Link to='/' style={{ textDecoration: 'none' }}> */}
          <Typography variant='h4' className={logo}>
            <Hidden><div className={reverseTxt}><i class="fab fa-medium" ></i></div></Hidden> <Hidden mdDown xsDown>Maadhyam</Hidden>
          </Typography>
        {/* </Link> */}
        <div className={buttons}>
          {/* <Link to='/signup'> */}
            <Button variant="contained" size="small" className={getStartedButton}>
              Get Started
            </Button>
          {/* </Link> */}
          <Hidden smDown xsDown>
            {/* <Link to='/signin' style={{ textDecoration: 'none' }}> */}
              <Typography className={signInButton}>
                Sign In
              </Typography>
            {/* </Link> */}
          </Hidden>
          
          <Hidden xsDown smDown>
            {/* <Link to='/write' style={{ textDecoration: 'none' }}> */}
              <Typography className={writeButton}>
                Write
              </Typography>
            {/* </Link> */}
          </Hidden>
          
          <Hidden xsDown smDown>
            {/* <Link to='/contact' style={{ textDecoration: 'none' }}> */}
              <Typography className={writeButton}>
                Contact Us
              </Typography>
            {/* </Link> */}
          </Hidden>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
