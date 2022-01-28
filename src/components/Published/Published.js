import React, {useState} from 'react';
import {Menu, MenuItem, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import DeletePostWarningDialogBox from '../DeletePostWarningDialogBox/DeletePostWarningDialogBox';
import { Grid, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  moreBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  publishPostDescription: {
    fontFamily: `'Nunito Sans', 'sans-serif'`, 
    fontSize: 17, 
    paddingTop: 2, 
    paddingBottom: 2, 
    color: 'rgb(117,117,117)',
    color: 'rgb(117,117,117)',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  }
})
const Published = () => {
  const publishedPosts = [1,2,3,4,5,6,7]
  return(
    <div>
      {
        publishedPosts.length
        ? publishedPosts.map(publishedPost => (
            <PublishedPost key={publishedPost} />
          ))
        : 
          <div style={{width: 335, margin: 'auto'}}>
            <Typography style={{color: 'rgb(81,81,81)', fontSize: 18, fontWeight: 'bold'}}>
              You haven't published any stories yet.
            </Typography>
          </div>
      }
    </div>
  );
}


const PublishedPost = () => {
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
  const postID = "post id for this particular post"

  return(
    <div>
      <DeletePostWarningDialogBox
        openDialogBox={openDialogBox}
        handleCloseDialogBox={handleCloseDialogBox}
        postID={postID}
        afterDeleteNavigateLocation={'/published'}
      />
      <div style={{overflowWrap: 'break-word', marginBottom: 50}}>
        <div style={{paddingBottom: 20, borderBottom: '1px solid #E6E6E6'}}>
          <Typography style={{  fontSize: 19, color: 'rgb(41,41,41)', fontFamily: `'Outfit', 'sans-serif'`}}>
            <Link to='/blog/1' style={{color: 'inherit', textDecoration: 'none'}}>
              {title}
            </Link>
          </Typography>
          {
            description &&
            <Typography className={classes.publishPostDescription}>
              <Link to='/blog/1' style={{color: 'inherit', textDecoration: 'none'}}>
                {description}
              </Link>
            </Typography>
          }
          <Grid container>
            <Grid item>
              <Typography style={{paddingTop: 10, color: 'rgb(100,100,100)', fontWeight: 'medium', fontSize: 14, fontFamily: `'Roboto Slab', 'serif'`}}>
                Published on 10 Jan 2022. 
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
        style={{marginTop: 0, marginLeft: 10}}
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
export default Published;