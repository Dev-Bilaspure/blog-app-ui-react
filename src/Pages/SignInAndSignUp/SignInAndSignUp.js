import React, {useState} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid, Paper, styled } from '@mui/material';
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
    fontSize: 32,

    
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

   // for styling tabs root component
   const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
      backgroundColor: '#000000',
      height: 1
    },
  });

  // for styling signin tab
  const AntTab1 = styled((props) => <Tab disableRipple {...props} />)(() => ({
    textTransform: 'none',
    fontSize: 16,
    color: value===0 ? '#000000' : 'rgb(117,117,117)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }));

  // for styling signup tab
  const AntTab2 = styled((props) => <Tab disableRipple {...props} />)(() => ({
    textTransform: 'none',
    fontSize: 16,
    color: value===1 ? '#000000' : 'rgb(117,117,117)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }));
  return (
    <div className='signinandsignupWrapper'>
      <div style={{width: '500px', margin: 'auto', marginTop: 50, marginBottom: 80}}>
        <Paper style={{width: '410px', marginRight: 30, marginLeft: 45,paddingTop: 15}} elevation={10}>
          <div style={{width: '330px', margin: 'auto'}}>
            <div style={{color: 'rgb(51,51,51)', textAlign: 'center', paddingBottom: 0, margin: 'auto', width: 230, paddingTop: 10, borderBottom: '1px solid rgb(71,71,71)', marginBottom: 35}}>
              <Grid container style={{width: 173, margin: 'auto'}}>
                <Grid item>
                  <Typography className={classes.reverseTxt}>
                    <i class="fab fa-medium" ></i>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={{fontSize: 25, fontFamily: `'Abril Fatface', 'cursive'`, paddingTop: 3, paddingLeft: 5}}>
                    Maadhyam
                  </Typography>
                </Grid>
              </Grid>
              
            </div>
            <div>
              <AntTabs value={value} onChange={handleTabChange} textColor='#000000' variant='fullWidth' centered>
                <AntTab1 label="Sign In" />
                <AntTab2 label="Sign Up" />
              </AntTabs>
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
