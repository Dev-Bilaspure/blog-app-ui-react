import React, {useContext, useEffect, useState} from 'react';
import {Typography} from '@mui/material';
import WebFont from 'webfontloader';
import { Link } from 'react-router-dom';
import { Button, Grid, makeStyles, Menu, MenuItem } from '@material-ui/core';
import DeletePostWarningDialogBox from '../DeletePostWarningDialogBox/DeletePostWarningDialogBox';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

const PF = 'http://localhost:5000/images/'

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
  const {user} = useContext(UserContext);
  // const draftPosts = [1,2,3,4,5,6];
  const [draftPosts, setDraftPosts] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const fetchDraftPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${user._id}/draft`
        ).then(res => {
          setDraftPosts(res.data);
          setIsFetching(false);
        }).catch(err => {
          console.log(err);
          setIsFetching(false);
        })
      } catch(error) {
        console.log(error)
        setIsFetching(false);
      }
    }
    fetchDraftPosts();
  }, [])
  return(
    <div>
      {
        isFetching ?
        <div style={{textAlign: 'center'}}>
          <CircularProgress color="inherit" size={60}/>
        </div> :
        (draftPosts.length 
        ? draftPosts.map(draftPost => (
            <DraftPost draftPost={draftPost} />
          ))
        : <div style={{width: 315, margin: 'auto'}}>
            <Typography style={{color: 'rgb(81,81,81)', fontSize: 18, fontWeight: 'bold', width: 205, paddingBottom: 30, margin: 'auto'}}>
              You have no drafts yet.
            </Typography>
            <Typography style={{color: 'rgb(81,81,81)', fontSize: 18, fontWeight: 'bold'}}>
              <Link to='/write' style={{color: 'inherit'}}>Write</Link> a story or <Link to='/' style={{color: 'inherit'}}>read</Link> on Maadhyam.
            </Typography>
          </div>)
      }
    </div>
  );
}

const DraftPost = ({draftPost}) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const handleOpenDialogBox = () => {
    setOpenDialogBox(true);
  }
  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  }

  const handleTitleClick = () => {
    navigate('/write', {state: {
      oldPostTitle: draftPost.title,
      oldPostDesc: draftPost.desc,
      oldPostCategories: draftPost.tags,
      oldPostId: draftPost._id,
      oldPostImg: PF+draftPost.img
    }})
  }

  const title = 'Untitled Story in the house';
  const description = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat quasi doloribus vero nemo quo tempore alias placeat reiciendis minus cum?`
  const words = draftPost.desc.length ? draftPost.desc.split(' ').length : 0;
  return(
    <div>
      <DeletePostWarningDialogBox
        openDialogBox={openDialogBox}
        handleCloseDialogBox={handleCloseDialogBox}
        postId={draftPost._id}
        afterDeleteNavigateLocation={'/draft'}
      />
      <div style={{overflowWrap: 'break-word', marginBottom: 50}}>
        <div style={{paddingBottom: 20, borderBottom: '1px solid #E6E6E6'}}>
          <Typography style={{ fontSize: 19, color: 'rgb(41,41,41)', fontFamily: `'Outfit', 'sans-serif'`}} onClick={handleTitleClick}> 
            {draftPost.title}
          </Typography>
          {
            draftPost.desc &&
            <Typography className={classes.draftPostDescription}>
              <Link to='/write' style={{color: 'inherit', textDecoration: 'none'}}>
                {draftPost.desc}
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
              <DeleteEditMenu handleOpenDialogBox={handleOpenDialogBox} postId={draftPost._id} draftPost={draftPost}/>
            </Grid>
          </Grid>
          
        </div>
      </div>
    </div>  
    
  );
}

const DeleteEditMenu = ({handleOpenDialogBox, postId, draftPost}) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditClick = () => {
    navigate('/write', {state: {
      oldPostTitle: draftPost.title,
      oldPostDesc: draftPost.desc,
      oldPostCategories: draftPost.tags,
      oldPostId: draftPost._id,
      oldPostImg: PF+draftPost.img
    }})
    setAnchorEl(null);
  }

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
        <MenuItem onClick={handleEditClick}>
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