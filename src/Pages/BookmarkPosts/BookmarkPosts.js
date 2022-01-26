import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid, Typography } from '@mui/material';
import './bookmarkposts.css'
import Categories from '../../components/Categories/Categories';
import Post from '../../components/Post/Post';

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
  }
})
const BookmarkPosts = () => {
  const classes = useStyle();
  const bookmarksPostsArray = [1,2,3,4,5,6,7,8,9,10]
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
                    bookmarksPostsArray.length ?
                    <BookmarkedPosts bookmarksPostsArray={bookmarksPostsArray}/> :
                    <div style={{width: 168, margin: 'auto'}}>
                      <Typography style={{color: 'rgb(81,81,81)', fontSize: 19, fontWeight: 'bold'}}>
                        No bookmarks yet
                      </Typography>
                    </div>
                  }
                  
                </div>
              </Grid> 
              <Grid item lg={1} md={1} sm={12} xs={12}>
                
              </Grid>
            </Grid>
          </div> 
        </Grid>
        <Grid item lg={4} md={3} sm={12} xs={12}  style={{borderLeft: '1px solid #E6E6E6', paddingLeft: 15}}>
          <div style={{ paddingTop: 40, paddingLeft: 20}}>
            <Grid container>
              <Grid item lg={1} md={1} sm={12} xs={12}>

              </Grid>
              <Grid item lg={10} md={10} sm={12} xs={12}>
                <div>
                  <div>
                    <Typography style={{fontFamily: `'Outfit', 'sans-serif'`, fontSize: 25, fontWeight: 'bold', borderBottom: '1px solid #E6E6E6', marginBottom: 50, paddingBottom: 8}}>
                      Tags
                    </Typography>
                  </div>
                  <Categories />
                </div>
              </Grid> 
              <Grid item lg={1} md={1} sm={12} xs={12}>
                
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div> 
  );
};

const BookmarkedPosts = ({bookmarksPostsArray}) => {
  return(
    <div>
      {
        bookmarksPostsArray.map(ele => (
          <Post key={ele} />
        ))
      }
    </div>
  );
}
export default BookmarkPosts;