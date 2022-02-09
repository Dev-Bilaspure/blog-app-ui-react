import React, { useEffect, useState, useContext } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Grid, Typography } from '@mui/material';
import './bookmarkposts.css'
import Categories from '../../components/Categories/Categories';
import Post from '../../components/Post/Post';
import TagsRightSidebar from '../../components/TagsRightSidebar/TagsRightSidebar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const useStyle = makeStyles({
  tagIconStyle: {
    fontSize: 20, 
    background: '#E6E6E6', 
    marginTop: 19, 
    padding: 9, 
    paddingRight: 9, 
    paddingLeft: 9, 
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
const BookmarkPosts = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  // const bookmarkedPosts = [1,2,3,4,5,6,7,8,9,10]
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    // setBookmarkedPosts(user.bookmarks);
    setIsFetching(true);
    const fetchBookmarkedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${user._id}/bookmark`
        ).then(res => {
          // console.log(res.data);
          setIsFetching(false);
          setBookmarkedPosts(res.data);
          console.log(bookmarkedPosts);
        })
      } catch(error) {
        setIsFetching(false);
        console.log(error);
      }
    }
    fetchBookmarkedPosts();
  }, [user.bookmarks])
  return(
    <div className='bookmarkpostspage-wrapper'>
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
                        <i className="fas fa-bookmark"></i>
                      </div>
                    </Grid>
                    <Grid item>
                      <Typography style={{paddingLeft: 5, fontFamily: `'Outfit', 'sans-serif'`, fontSize: 45, color: 'rgb(31,31,31)'}}>
                        Bookmarks
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
                    (bookmarkedPosts.length>0 ?
                    <BookmarkedPosts bookmarkedPosts={bookmarkedPosts}/> :
                    <div style={{width: 310, margin: 'auto'}}>
                      <Typography style={{color: 'rgb(51,51,51)', fontSize: 17}}>
                        Stories you bookmark will apprear here.
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

const BookmarkedPosts = ({bookmarkedPosts}) => {
  const {user} = useContext(UserContext);
  return(
    <div>
      {
        bookmarkedPosts.map(post => (
          <Post post={post} user={user} />
        ))
      }
    </div>
  );
}
export default BookmarkPosts;
