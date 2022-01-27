import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Grid, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';

const useStyle = makeStyles({
  basicMenuAvatar: {
    '&:hover': {
      cursor: 'pointer'
    }, 
    marginTop: 1,
  }
})
const BasicMenu = () => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = () => {
    navigate('/profile');
    setAnchorEl(null);
  };
  const handleWriteClick = () => {
    navigate('/write');
    setAnchorEl(null);
  }
  const handleDraftClick = () => {
    navigate('/draft');
    setAnchorEl(null);
  }
  const handlePublishedClick = () => {
    navigate('/published');
    setAnchorEl(null);
  }
  const handleBookmarksClick = () => {
    navigate('/bookmark');
    setAnchorEl(null);
  }
  const handleLikedClick = () => {
    navigate('/liked');
    setAnchorEl(null);
  }
  const handleSettingsClick = () => {
    navigate('/settings');
    setAnchorEl(null);
  }
  const handleContactUsClick = () => {
    navigate('/contactus');
    setAnchorEl(null);
  }
  return (
    <div>
      <Avatar
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        alt="profilemenu avatar"
        src='https://picsum.photos/200'
        style={{width: 45, height: 45}}
        className={classes.basicMenuAvatar}
      /> 
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        style={{marginTop: 10, marginRight: 5, minHeight: 700}}
      >
        <MenuItem onClick={handleProfileClick} style={{paddingLeft: 30, paddingRight: 40, paddingTop: 20, paddingBottom: 20, borderBottom: '1px solid rgb(190,190,190)'}}>
          <Grid container>
            <Grid item>
              <Avatar
                alt="profilemenu avatar"
                src='https://picsum.photos/200'
                style={{height: 50, width: 50}}
              /> 
            </Grid>
            <Grid item>
              <Typography style={{paddingLeft: 12, fontSize: 16, paddingTop: 2}}>
                Dev Bilaspure
              </Typography>
              <Typography style={{paddingLeft: 12, fontSize: 15, color: 'rgb(90, 90, 90)'}}>
                @dev123
              </Typography>
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem onClick={handleWriteClick}>
          <Typography style={{paddingLeft: 13, paddingTop: 8, paddingBottom: 4}}>
            Write a story
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDraftClick}>
          <Typography style={{paddingLeft: 13, paddingTop: 5, paddingBottom: 3}}>
            My Stories
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleBookmarksClick}>
          <Typography style={{paddingLeft: 13, paddingTop: 5, paddingBottom: 3}}>
            Bookmarks
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLikedClick}>
          <Typography style={{paddingLeft: 13, paddingTop: 5, paddingBottom: 3}}>
            Liked
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleSettingsClick}>
          <Typography style={{paddingLeft: 13, paddingTop: 7, paddingBottom: 3}}>
            Settings
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleContactUsClick}>
          <Typography style={{paddingLeft: 13, paddingTop: 7, paddingBottom: 3}}>
            Contact us
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} style={{marginBottom: 20}}>
          <Typography style={{paddingLeft: 13, paddingTop: 6, paddingBottom: 3}}>
            Logout 
          </Typography>
          <LogoutIcon style={{color: 'rgb(123,123,123)', float: 'right', paddingLeft: 8}}/>
        </MenuItem>
      </Menu>
    </div>
  );
}


export default BasicMenu;