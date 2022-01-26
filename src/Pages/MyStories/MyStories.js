import { Grid, Typography } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import Draft from '../../components/Draft/Draft';
import Published from '../../components/Published/Published';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import './myStoriesStyle.css';

const MyStories = ({val}) => {
  const navigate = useNavigate();

  const [value, setValue] = useState(val);
  const handleTabChange = (event, newValue) => {
    if(newValue!==value) {
      if(newValue===0)
        navigate('/draft');
      else
        navigate('/published');
    }
    setValue(newValue);
  }
  // for styling tabs root component
  const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #E6E6E6',
    '& .MuiTabs-indicator': {
      backgroundColor: '#000000',
      height: 1
    },
    marginBottom: 80,
    paddingTop: 30
  });

  // for styling draft tab
  const AntTab1 = styled((props) => <Tab disableRipple {...props} />)(() => ({
    textTransform: 'none',
    fontSize: 15,
    color: value===0 ? '#000000' : 'rgb(117,117,117)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
    paddingBottom: 7,
  }));

  // for styling published tab
  const AntTab2 = styled((props) => <Tab disableRipple {...props} />)(() => ({
    textTransform: 'none',
    fontSize: 15,
    color: value===1 ? '#000000' : 'rgb(117,117,117)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
    marginLeft: 30,
    paddingBottom: 7,
  }));


  return(
    <div className='myStoriesWrapper'>
      <Grid container style={{paddingRight: 20, paddingLeft: 20}}>
        <Grid item lg={1} md={1} sm={12} xs={12}>

        </Grid>
        <Grid item lg={10} md={10} sm={12} xs={12}>
          <div>
            <div style={{marginTop: 60}}>
              <Typography style={{fontFamily: `'Outfit', 'sans-serif'`, fontSize: 45, color: 'rgb(41,41,41)'}}>
                Your stories
              </Typography>
            </div>
            <div>
              <AntTabs  value={value} onChange={handleTabChange} textColor="#000000" indicatorColor='secondary' >
                <AntTab1 label="Draft" />
                <AntTab2 label="Published" />
              </AntTabs >
              <div>
                {
                  value===0
                  ? <Draft /> 
                  : <Published />
                }
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={1} md={1} sm={12} xs={12}>
          
        </Grid>
      </Grid>
    </div>
  );
}

export default MyStories;