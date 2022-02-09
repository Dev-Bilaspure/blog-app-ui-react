import React, {useContext, useState} from 'react'
import { TextField, Button, Typography } from '@material-ui/core'
import { useNavigate, Navigate} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { validateEmail, validatePassword } from './validation';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import {UserContext} from './../../context/UserContext';

const useStyle = makeStyles({
  bottomSignInBtn: {
    color: 'rgb(61,61,61)', 
    float: 'right',
    '&:hover': {
      cursor: 'pointer',
    },
    textDecoration: 'underline',
    fontSize: 15
  },
  termsNCondition: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: 'rgb(63,81,181)',
    },
    color: 'inherit',
  }
})
const SignUp = ({handleTabChange}) => {
  const classes = useStyle();
  const {user} = useContext(UserContext)
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // visibility icon state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isFetching, setIsFetching] = useState(false);

  //field error states
  const [nameError, setNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(0);
  const [passwordError, setPasswordError] = useState(0);
  const [confirmPasswordError, setConfirmPasswordError] = useState(0);
  const [serverError, setServerError] = useState(false);

  const handleName = (e) => {
    if(!(e.target.value.length>21))
      setName(e.target.value);
  }
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(false);
    handleShowErrorMsg();
    try {
      console.log("waiting")
      setIsFetching(true);
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {name, email, username, password, confirmPassword}
      ).then(res => {
        console.log(res.data);
        res.data && navigate('/signin');
        if(res.data)
          setIsFetching(false);
      }).catch(err => {
        console.log(err);
        setIsFetching(false);
        setServerError(true);
      })
    } catch(error) {
      console.log(error);
      setIsFetching(false);
      setServerError(true);
      console.log(serverError)
    }
    console.log('SignUp form submitted');
  }

  //error show handler
  const handleShowErrorMsg = () => {
    setNameError(false);
    setUsernameError(false);
    setPasswordError(0);
    setEmailError(0);
    setConfirmPasswordError(0); 

    if(name.length>21 || name==='')
      setNameError(true);
    if(username.length<3)
      setUsernameError(true);
      
    // email validation
    setEmailError(validateEmail(email));

    //password validation
    setPasswordError(validatePassword(password));

    // confirm password validation
    if(confirmPassword==='')
      setConfirmPasswordError(1);
    if(confirmPassword!==password)
      setConfirmPasswordError(2);

  }
  
  
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return(
    user ? <Navigate to='/' /> : 
    <div>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <TextField label='Name' placeholder='Name'  value={name} onChange={handleName} fullWidth required style={{marginTop: 17}}
          error={nameError}
          helperText={nameError && 'Name is required. Max 20 characters'}
        />
        <TextField label='Username' placeholder='Username'  value={username} onChange={handleUsername} fullWidth required style={{marginTop: 17}}
          error={usernameError}
          helperText={usernameError && 'Username is required. Min 3 characters with no space.'}
        />
        <TextField label='Email' placeholder='E-mail address'  value={email} onChange={handleEmail} fullWidth required style={{marginTop: 17}}
          error={emailError===1 || emailError===2}
          helperText={emailError===1 ? 'E-mail address is required' : (emailError===2 && 'Enter a valid e-mail address')}
        />
        <TextField label='Password'  placeholder='Password'  value={password} onChange={handlePassword} fullWidth required style={{marginTop: 17}}
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
          error={passwordError===1 || passwordError===2}
          helperText={passwordError===1 && 'Password is required. Must be 8 characters or more'}
        />
        <TextField label='Confirm Password'   placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPassword} fullWidth required style={{marginTop: 17, marginBottom: 40}}
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{ // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                >
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
          error={confirmPasswordError===1 || confirmPasswordError===2}
          helperText={confirmPasswordError===1 ? 'Password confirmation is required' : (confirmPasswordError===2 && 'The passwords you entered do not match.')}
        />
        <Button 
          type='submit' 
          style={{background: 'rgb(51,51,51)', color: '#fff'}} 
          variant="contained" 
          fullWidth 
          disable={isFetching}
        >
          Sign Up
        </Button>
      </form>
      

      <Typography style={{width: 230, margin: 'auto', paddingTop: 10, paddingBottom: 10, fontSize: 15}} onClick={e => {
        handleTabChange(e, 0);
      }}>
        Already have an account? <Typography className={classes.bottomSignInBtn}>Sign In</Typography>
      </Typography>
      
      <div style={{paddingBottom: 15}}>
        {
          serverError &&
          <div style={{borderBottom: '1px solid rgb(244,67,54)', paddingTop: 10}}>
            <Typography style={{color: 'rgb(244,67,54)', fontSize: 14, paddingBottom: 5, width: 148, margin: 'auto'}}>
              Something went wrong
            </Typography>
          </div>
        }
        
      </div>
      {isFetching && <LinearProgress color="inherit" />}
    </div>
  );
}

export default SignUp;


