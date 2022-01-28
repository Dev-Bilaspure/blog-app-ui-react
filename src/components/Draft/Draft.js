import React, {useEffect, useState} from 'react';
import {Typography} from '@mui/material';
import WebFont from 'webfontloader';
import { Link } from 'react-router-dom';
import { Button, Grid, makeStyles, Menu, MenuItem } from '@material-ui/core';
import DeletePostWarningDialogBox from '../DeletePostWarningDialogBox/DeletePostWarningDialogBox';

const useStyle = makeStyles({
  moreBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  draftPostDescription: {
    fontFamily: `'Nunito Sans', 'sans-serif'`, 
    fontSize: 17, 
    paddingTop: 2, 
    paddingBottom: 2, 
    color: 'rgb(117,117,117)',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  },
  noDraftsYetMsg: {
    
  }
})

const Draft = () => {
  const classes = useStyle();
  const draftPosts = [1,2,3,4,5,6];
  
  return(
    <div>
      {
        draftPosts.length 
        ? draftPosts.map(draftPost => (
            <DraftPost key={draftPost}/>
          ))
        : <div style={{width: 315, margin: 'auto'}}>
            <Typography style={{color: 'rgb(81,81,81)', fontSize: 18, fontWeight: 'bold', width: 205, paddingBottom: 30, margin: 'auto'}}>
              You have no drafts yet.
            </Typography>
            <Typography style={{color: 'rgb(81,81,81)', fontSize: 18, fontWeight: 'bold'}}>
              <Link to='/write' style={{color: 'inherit'}}>Write</Link> a story or <Link to='/' style={{color: 'inherit'}}>read</Link> on Maadhyam.
            </Typography>
          </div>
      }
    </div>
  );
}

const DraftPost = () => {
  const classes = useStyle();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const handleOpenDialogBox = () => {
    setOpenDialogBox(true);
  }
  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  }
  const title = 'Untitled Story in the house';
  const description = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat quasi doloribus vero nemo quo tempore alias placeat reiciendis minus cum?`
  const words = 10;
  const postID = "postID of this particular post"
  return(
    <div>
      <DeletePostWarningDialogBox
        openDialogBox={openDialogBox}
        handleCloseDialogBox={handleCloseDialogBox}
        postID={postID}
        afterDeleteNavigateLocation={'/draft'}
      />
      <div style={{overflowWrap: 'break-word', marginBottom: 50}}>
        <div style={{paddingBottom: 20, borderBottom: '1px solid #E6E6E6'}}>
          <Typography style={{ fontSize: 19, color: 'rgb(41,41,41)', fontFamily: `'Outfit', 'sans-serif'`}}>
            <Link to='/write' style={{color: 'inherit', textDecoration: 'none'}}>
              {title}
            </Link>
          </Typography>
          {
            description &&
            <Typography className={classes.draftPostDescription}>
              <Link to='/write' style={{color: 'inherit', textDecoration: 'none'}}>
                {description}
              </Link>
            </Typography>
          }
          <Grid container>
            <Grid item>
              <Typography style={{paddingTop: 10, color: 'rgb(100,100,100)', fontWeight: 'medium', fontSize: 14, fontFamily: `'Roboto Slab', 'serif'`}}>
                Last edited on 9 Jan 2022. {words} {words===1 ? 'word': 'words'} so far. 
              </Typography>
            </Grid>
            <Grid item>
              <DeleteEditMenu handleOpenDialogBox={handleOpenDialogBox} postID={postID}/>
            </Grid>
          </Grid>
          
        </div>
      </div>
    </div>  
    
  );
}

const DeleteEditMenu = ({handleOpenDialogBox}) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClickInMenu = () => {
    handleOpenDialogBox();
    setAnchorEl(null);
  }
  return (
    <div>
      <div onClick={handleClick} style={{paddingTop: 12, paddingLeft: 10}} className={classes.moreBtn}>
        <i class="fas fa-ellipsis-h" style={{color: 'rgb(70,70,70)', fontSize: 19}}></i>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        style={{marginTop: 40, marginLeft: 10}}
      >
        <MenuItem onClick={handleClose}>
          <Typography style={{fontSize: 14}}>Edit Story</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteClickInMenu}>
          <Typography style={{color: 'rgb(216,63,53)', fontSize: 14}}>Delete Story</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
export default Draft;