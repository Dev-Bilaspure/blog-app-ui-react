import React, {useState} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Paper } from '@mui/material';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import './signinsignupStyle.css';
import { useNavigate } from 'react-router-dom';

const useStyle = makeStyles({
  reverseTxt: {
    transform: 'scale(-1, 1)',
    '-moz-transform': 'scale(-1, 1)',
    '-webkit-transform': 'scale(-1, 1)',
    '-o-transform': 'scale(-1, 1)',
    '-ms-transform': 'scale(-1, 1)',
    transform: 'scale(-1, 1)',

    color: 'rgb(48,63,159)',
    textAlign: 'center',
    fontSize: 35,
    paddingBottom: 20,
  }
})
const SignInAndSignUp = ({val}) => {
  const classes = useStyle();
  const [value, setValue] = useState(val);
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    if(newValue!==value) {
      if(newValue===0)
        navigate('/signin');
      else
        navigate('/signup');
    }
    setValue(newValue);
  };
  
  return (
    <div className='signinandsignupWrapper'>
      <div style={{width: '500px', margin: 'auto', marginTop: 50, marginBottom: 80}}>
        <Paper style={{width: '410px', marginRight: 30, marginLeft: 45,paddingTop: 15}} elevation={10}>
          <div style={{width: '330px', margin: 'auto'}}>
            <div>
              <Typography className={classes.reverseTxt}>
                <i class="fab fa-medium" ></i>
              </Typography>
            </div>
            <div>
              <Tabs value={value} onChange={handleTabChange}variant="fullWidth" centered>
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
              </Tabs>
              <div style={{paddingTop: 10}}>
                {
                  value===0 
                    ? <SignIn handleTabChange={handleTabChange}/> 
                    : <SignUp handleTabChange={handleTabChange}/>
                }
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
    
  )
}

export default SignInAndSignUp
