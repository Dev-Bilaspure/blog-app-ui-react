import React, { useContext, useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Grid, Typography } from '@mui/material';
import Categories from '../../components/Categories/Categories';
import Post from '../../components/Post/Post';
import TagsRightSidebar from '../../components/TagsRightSidebar/TagsRightSidebar';
import './likedPostsPageStyle.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserContext} from './../../context/UserContext'
import CircularProgress from '@mui/material/CircularProgress';

const useStyle = makeStyles({
  tagIconStyle: {
    fontSize: 20, 
    background: '#E6E6E6', 
    marginTop: 19, 
    padding: 9, 
    paddingRight: 7, 
    paddingLeft: 7, 
    paddingBottom: 3, 
    borderRadius: 100, 
    marginRight: 5,
    paddingTop: 7
  },
  browseRecommendedBtn: {
    paddingLeft: 20, 
    paddingRight: 20, 
    background: 'rgb(26,137,23)', 
    color: '#fff', 
    borderRadius: 100, 
    textTransform: 'none', 
    boxShadow: 'none', 
    margin: 'auto',
    '&:hover': {
      background: 'rgb(26,137,23)', 
      color: '#fff', 
    }
  }
})
const LikedPostsPage = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  // const likedPosts = [1,2,3,4,5,6,7,8,9,10]
  const [likedPosts, setLikedPosts] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${user._id}/liked`
        ).then(res => {
          setLikedPosts(res.data);
          console.log(res.data);
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
    fetchLikedPosts();
  }, [])
  return(
    <div className='likedpostspage-wrapper'>
      <Grid container>
        <Grid item lg={8} md={9} sm={12} xs={12}>
          <div style={{paddingTop: 30}}>
            <Grid container>
              <Grid item lg={1} md={1} sm={12} xs={12}>

              </Grid>
              <Grid item lg={10} md={10} sm={12} xs={12} style={{paddingLeft: 15}}>
                <div style={{borderBottom: '1px solid #E6E6E6', paddingBottom: 20}}>
                  <Grid container>
                    <Grid item>
                      <div className={classes.tagIconStyle}>
                        <i className="fas fa-heart"></i>
                      </div>
                    </Grid>
                    <Grid item>
                      <Typography style={{paddingLeft: 5, fontFamily: `'Outfit', 'sans-serif'`, fontSize: 45, color: 'rgb(31,31,31)'}}>
                        Liked
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <div style={{paddingTop: 50}}>
                  {
                    isFetching ? 
                    <div style={{textAlign: 'center'}}>
                      <CircularProgress color="inherit" />
                    </div> :
                    (likedPosts.length ?
                    <LikedPosts likedPosts={likedPosts}/> :
                    <div style={{width: 256, margin: 'auto'}}>
                      <Typography style={{color: 'rgb(51,51,51)', fontSize: 17}}>
                        Stories you like will apprear here.
                      </Typography>
                      <div style={{width: 237, margin: 'auto', marginTop: 30}}>
                        <Button variant='contained' className={classes.browseRecommendedBtn} onClick={() => {navigate('/')}}>
                          Browse recommended stories
                        </Button> 
                      </div>
                    </div>)
                  }
                  
                </div>
              </Grid> 
              <Grid item lg={1} md={1} sm={12} xs={12}>
                
              </Grid>
            </Grid>
          </div> 
        </Grid>
        <Grid item lg={4} md={3} sm={12} xs={12}  style={{borderLeft: '1px solid #E6E6E6', paddingLeft: 0}}>
          <div style={{ paddingTop: 40, paddingLeft: 20}}>
            <Grid container>
              <Grid item lg={1} md={0} sm={12} xs={12}>

              </Grid>
              <Grid item lg={10} md={12} sm={12} xs={12}>
                <TagsRightSidebar />
              </Grid> 
              <Grid item lg={1} md={0} sm={12} xs={12}>
                
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div> 
  );
};

const LikedPosts = ({likedPosts}) => {
  const {user} = useContext(UserContext);
  return(
    <div>
      {
        likedPosts.map(post => (
          <Post post={post} user={user}/>
        ))
      }
    </div>
  );
}
export default LikedPostsPage;
