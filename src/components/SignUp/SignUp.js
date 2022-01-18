import React, {useState} from 'react'
import { Paper, TextField, Button, Typography } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { validateEmail, validatePassword } from './validation';

const useStyle = makeStyles({
  bottomSignInBtn: {
    color: 'rgb(48,63,159)', 
    float: 'right',
    '&:hover': {
      cursor: 'pointer',
    }
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // visibility icon state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //field error states
  const [nameError, setNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(0);
  const [passwordError, setPasswordError] = useState(0);
  const [confirmPasswordError, setConfirmPasswordError] = useState(0);

  const handleName = (e) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SignUp form submitted');
  }

  //error show handler
  const handleSignUpClick = () => {
    setNameError(false);
    setUsernameError(false);
    setPasswordError(0);
    setEmailError(0);
    setConfirmPasswordError(0);

    if(name==='')
      setNameError(true);
    if(username==='')
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
    <div>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <TextField label='Name' placeholder='Name'  value={name} onChange={handleName} fullWidth required style={{marginTop: 17}}
          error={nameError}
          helperText={nameError && 'Name is required'}
        />
        <TextField label='Username' placeholder='Username'  value={username} onChange={handleUsername} fullWidth required style={{marginTop: 17}}
          error={usernameError}
          helperText={usernameError && 'Username is required'}
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
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
          error={passwordError===1 || passwordError===2}
          helperText={passwordError===1 ? 'Password is required' : (passwordError===2 && 'Must be 8 characters or more, needs at least one number, one letter and one special charater')}
        />
        <TextField label='Confirm Password'   placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPassword} fullWidth required style={{marginTop: 17}}
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{ // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                >
                  {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
          error={confirmPasswordError===1 || confirmPasswordError===2}
          helperText={confirmPasswordError===1 ? 'Password confirmation is required' : (confirmPasswordError===2 && 'The passwords you entered do not match.')}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
            />
          }
          label = "I accept all Terms and Conditions"
          style={{marginBottom:30, marginTop: 17}}
          required
        />
        <Button type='submit' onClick={handleSignUpClick} color='primary' variant="contained" fullWidth >Sign Up</Button>
      </form>
      

      <Typography style={{width: 245, margin: 'auto', paddingTop: 10, paddingBottom: 30}} onClick={e => {
        handleTabChange(e, 0);
      }}>
        Already have an account? <Typography className={classes.bottomSignInBtn}>Sign In</Typography>
      </Typography>
    </div>
  );
}

export default SignUp;


