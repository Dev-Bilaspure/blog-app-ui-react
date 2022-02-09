import React, {useContext, useEffect, useState} from 'react';
import {Menu, MenuItem, Typography} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeletePostWarningDialogBox from '../DeletePostWarningDialogBox/DeletePostWarningDialogBox';
import { Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import CircularProgress from '@mui/material/CircularProgress';

const PF = 'http://localhost:5000/images/'

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
  const {user} = useContext(UserContext);
  // const publishedPosts = [1,2,3,4,5,6,7]
  const [publishedPosts, setPublishedPosts] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const fetchPublishedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${user._id}/published`
        ).then(res => {
          setPublishedPosts(res.data);
          setIsFetching(false);
        }).catch(err => {
          console.log(err);
          setIsFetching(false);
        })
      } catch(error) {
        console.log(error);
        setIsFetching(false);
      }
    }
    fetchPublishedPosts();
  }, [])
  return(
    <div>
      {
        isFetching ?
        <div style={{textAlign: 'center'}}>
          <CircularProgress color="inherit" size={60}/>
        </div> :
        (publishedPosts.length
        ? publishedPosts.map(publishedPost => (
            <PublishedPost publishedPost={publishedPost} />
          ))
        : 
          <div style={{width: 335, margin: 'auto'}}>
            <Typography style={{color: 'rgb(81,81,81)', fontSize: 18, fontWeight: 'bold'}}>
              You haven't published any stories yet.
            </Typography>
          </div>)
      }
    </div>
  );
}


const PublishedPost = ({publishedPost}) => {
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
        postId={publishedPost._id}
        afterDeleteNavigateLocation={'/published'}
      />
      <div style={{overflowWrap: 'break-word', marginBottom: 50}}>
        <div style={{paddingBottom: 20, borderBottom: '1px solid #E6E6E6'}}>
          <Typography style={{  fontSize: 19, color: 'rgb(41,41,41)', fontFamily: `'Outfit', 'sans-serif'`}}>
            <Link to={`/blog/${publishedPost}`} style={{color: 'inherit', textDecoration: 'none'}}>
              {publishedPost.title}
            </Link>
          </Typography>
          {
            description &&
            <Typography className={classes.publishPostDescription}>
              <Link to='/blog/1' style={{color: 'inherit', textDecoration: 'none'}}>
                {publishedPost.desc}
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
              <DeleteEditMenu handleOpenDialogBox={handleOpenDialogBox} postId={publishedPost._id} publishedPost={publishedPost}/>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
    
  );
}


const DeleteEditMenu = ({handleOpenDialogBox, publishedPost}) => {
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
      oldPostTitle: publishedPost.title,
      oldPostDesc: publishedPost.desc,
      oldPostCategories: publishedPost.tags,
      oldPostId: publishedPost._id,
      oldPostImg: PF+publishedPost.img
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
        style={{marginTop: 0, marginLeft: 10}}
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
export default Published;