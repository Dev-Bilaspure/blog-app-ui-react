import React, {useState} from 'react'
import { Grid,Paper, TextField, Button, Typography } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import {Link} from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';

const useStyle = makeStyles({
  forgotPassword: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: 'rgb(61,61,61)',
      cursor: 'pointer'
    },
    color: 'inherit',
    float: 'right'
  },
})
const SignIn = ({handleTabChange}) => {
  const classes = useStyle();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("form submitted");
    
  }
  const handleSignInClick = () => {
    setUsernameError(false);
    setPasswordError(false);
    if(username==='')
      setUsernameError(true);
    if(password==='')
      setPasswordError(true);
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <TextField label='Username'  placeholder='Enter username' value={username} onChange={handleUsername} fullWidth style={{marginTop: 17}}
          error={usernameError}
          helperText={usernameError && 'Username is required'}
          required
        />
        <TextField label='Password'  placeholder='Enter password' value={password} onChange={handlePassword} fullWidth  style={{marginTop: 17}} 
          type={showPassword ? 'text' : 'password'}
          InputProps={{ // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
          error={passwordError}
          helperText={passwordError && 'Password is required'}
          required
        />
        <Link to='/forgotpassword' className={classes.forgotPassword}>
          <Typography style={{lineHeight: 2.5}}>Forgot password</Typography>
        </Link>

        <Button type='submit' style={{background: 'rgb(51,51,51)', color: '#fff', marginTop: 30}} variant="contained"  onClick={handleSignInClick} fullWidth>Sign In</Button>
      </form>  

      <Typography style={{width: 234, margin: 'auto', paddingTop: 10, paddingBottom: 30}} onClick={e => {
          handleTabChange(e, 1);
        }}>
        Don't have an account? <Link to='/signup' style={{color: 'rgb(61,61,61)'}}>Sign Up</Link>
      </Typography>
    </div>
  );
}

export default SignIn;


