import React from 'react'
import {AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';


const Navbar = () => {
  const { navbar, logo, buttons, writeButton, signInButton, getStartedButton } = useStyles();

  return (
    <AppBar className={navbar}>
      <Toolbar>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Typography variant='h4' className={logo}>
            Maadhyam
          </Typography>
        </Link>
        <div className={buttons}>
          <Link to='/signup'>
            <Button variant="contained" size="small" className={getStartedButton}>
              Get Started
            </Button>
          </Link>
          <Link to='/signin' style={{ textDecoration: 'none' }}>
            <Typography className={signInButton}>
              Sign In
            </Typography>
          </Link>
          <Link to='/write' style={{ textDecoration: 'none' }}>
            <Typography className={writeButton}>
              Write
            </Typography>
          </Link>
          <Link to='/contact' style={{ textDecoration: 'none' }}>
            <Typography className={writeButton}>
              Contact Us
            </Typography>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
