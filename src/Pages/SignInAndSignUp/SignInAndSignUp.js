import React, {useEffect, useState} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid, Paper, styled } from '@mui/material';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import './signinsignupStyle.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
const SignInAndSignUp = ({val, setUser}) => {
  const classes = useStyle();
  const [value, setValue] = useState(val);
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split('/')[1];
  useEffect(() => {
    if(path==='signup')
      setValue(1);
    else
      setValue(0);
  }, [path])

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
    fontSize: 15,
    color: value===0 ? '#000000' : 'rgb(117,117,117)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
    paddingBottom: 5
  }));

  // for styling signup tab
  const AntTab2 = styled((props) => <Tab disableRipple {...props} />)(() => ({
    textTransform: 'none',
    fontSize: 15,
    color: value===1 ? '#000000' : 'rgb(117,117,117)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
    paddingBottom: 5
  }));
  return (
    <div className='signinandsignupWrapper'>
      <Grid container >
        <Grid item lg={4} lg={4} md={3} sm={12} xs={12}> 

        </Grid>
        <Grid item lg={4} lg={4} md={6} sm={12} xs={12} style={{height: '100vh', paddingTop: 30, paddingBottom: 30, marginBotom: 50}}>
          <Paper style={{ margin: 'auto',paddingTop: 15, width: 340, background: '#fff'}}  elevation={5}>
            <div style={{width: '280px', margin: 'auto'}}>
              <div style={{color: 'rgb(41,41,41)', textAlign: 'center', paddingBottom: 0, margin: 'auto', width: 230, paddingTop: 10, borderBottom: '1px solid rgb(71,71,71)', marginBottom: 20}}>
                <Grid container style={{width: 173, margin: 'auto'}}>
                  <Grid item>
                    <Typography className={classes.reverseTxt}>
                      <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
                        <i className="fab fa-medium" ></i>
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{fontSize: 25, fontFamily: `'Abril Fatface', 'cursive'`, paddingTop: 3, paddingLeft: 5}}>
                      <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
                        Maadhyam
                      </Link>
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
                      ? <SignIn setUser={setUser} handleTabChange={handleTabChange}/> 
                      : <SignUp setUser={setUser} handleTabChange={handleTabChange}/>
                  }
                </div>
              </div>
            </div>
          </Paper>
          
        </Grid>
        <Grid item lg={4} lg={4} md={3} sm={12} xs={12}>

        </Grid>
      </Grid>
        
    </div>
    
  )
}

export default SignInAndSignUp
