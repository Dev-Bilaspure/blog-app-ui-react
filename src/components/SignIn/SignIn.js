import React, {useState, useContext} from 'react'
import { Grid,Paper, TextField, Button, Typography } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import {Link, useLocation, useNavigate, Navigate} from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { UserContext } from './../../context/UserContext'
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';

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
const SignIn = ({handleTabChange, setUser}) => {
  const classes = useStyle();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [serverError, setServerError] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const {loginStart, loginSuccess, loginFailure, isFetching, user} = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleShowErrorMsg();
    setServerError(false);
    loginStart();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {email, password}
      ).then(res => { 
        const obj = res.data;
        // res.data && 
        if(res.data) {
          loginSuccess(obj);
          setServerError(false);
          navigate(location.state.from || '/');
        }
        console.log(res.data);
      }).catch(err => {
        console.log(err);
        setServerError(true);
        setEmail('');
        setPassword('');
        loginFailure();
      })
    } catch(error) {
      console.log(error);
      setServerError(true);
      setEmail('');
      setPassword('');
      loginFailure();
    }
    console.log("form submitted");
  }
 
  const handleShowErrorMsg = () => {
    setEmailError(false);
    setPasswordError(false);
    if(email==='')
      setEmailError(true);
    if(password==='')
      setPasswordError(true);
  }

  return(
    user ? <Navigate to='/' /> : 
    <div>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <TextField label='Email'  placeholder='Email' value={email} onChange={handleEmail} fullWidth style={{marginTop: 17}}
          error={emailError}
          helperText={emailError && 'Email is required'}
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
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
          error={passwordError}
          helperText={passwordError && 'Password is required'}
          required
        />
        <Link to='/signin' className={classes.forgotPassword}>
          <Typography style={{lineHeight: 2.5, fontSize: 15}}>Forgot password</Typography>
        </Link>

        <Button type='submit' style={{background: 'rgb(51,51,51)', color: '#fff', marginTop: 25}} variant="contained" fullWidth disable={isFetching}>
          Sign In
        </Button>
      </form>  

      <Typography style={{width: 219, margin: 'auto', paddingTop: 10, paddingBottom: 10, fontSize: 15}} onClick={e => {
          handleTabChange(e, 1);
        }}>
        Don't have an account? <Link to='/signup' style={{color: 'rgb(61,61,61)'}}>Sign Up</Link>
      </Typography>
      <div style={{paddingBottom: 15}}>
        {
          serverError &&
          <div style={{borderBottom: '1px solid rgb(244,67,54)', paddingTop: 10, textAlign: 'center'}}>
            <Typography style={{color: 'rgb(244,67,54)', fontSize: 14, paddingBottom: 5, width: 190, margin: 'auto'}}>
              Something went wrong.
            </Typography>
            <Typography style={{color: 'rgb(244,67,54)', fontSize: 14, paddingBottom: 5, width: 280, margin: 'auto'}}>
              Check your credentials and network connection.
            </Typography>
          </div>
        }
      </div>
      {isFetching && <LinearProgress color="inherit" />}
    </div>
  );
}

export default SignIn;


