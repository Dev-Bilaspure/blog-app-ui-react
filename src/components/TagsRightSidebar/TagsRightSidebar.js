import { Avatar, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Categories from '../Categories/Categories';

const useStyle = makeStyles({
  tagsHeading: {
    fontFamily: `'Outfit', 'sans-serif'`, 
    fontSize: 25, 
    fontWeight: 'bold', 
    borderBottom: '1px solid #E6E6E6', 
    marginBottom: 50, 
    paddingBottom: 8
  }, 
  followBtn: {
    paddingLeft: 0, 
    paddingRight: 0, 
    background: '#fff', 
    color: 'rgb(26,136,22)', 
    border: '1px solid rgb(26,136,22)', 
    borderRadius: 100, 
    fontSize: 15, 
    textTransform: 'none', 
    paddingTop: 3, 
    paddingBottom: 3, 
    marginTop: 7, 
    marginLeft: 10, 
    width: 92, 
    boxShadow: 'none'
  },
  userName: {
    fontSize: 18, 
    color: 'rgb(51,51,51)', 
    fontFamily: `'IBM Plex Sans', 'sans-serif'`, 
    lineHeight: 1.3
  }
})
const TagsRightSidebar = () => {
  const classes = useStyle();
  return(
    <div>
      <div>
        <div>
          <Typography className={classes.tagsHeading}>
            Tags
          </Typography>
        </div>
        <Categories />
      </div>
      <div style={{marginTop: 30, paddingTop: 50, borderTop: '1px solid #E6E6E6'}}>
        <Typography style={{fontFamily: `'IBM Plex Sans', 'sans-serif'`, fontSize: 20, marginBottom: 25}}>
          Recommended
        </Typography>
        <RankedUsers />
      </div>
    </div>
  );
}

const RankedUsers = () => {
  const arr = [1,2,3,4,5];
  return(
    <div>
      {
        arr.map(ele => (
          <RankedUser key={ele} />
        ))
      }
    </div>
  );
}

const RankedUser = () => {
  const classes = useStyle(); 
  const [isFollowing, setIsFollowing] = useState(false);
  const handleClickFollowBtn = () => {
    setIsFollowing(!isFollowing);
  }
  return(
    <div style={{marginBottom: 35, wordBreak: 'break-all'}}>
      <Grid container>
        <Grid item style={{marginBottom: 10}}>
          <Avatar
            alt="author avatar"
            src='https://picsum.photos/200'
            style={{width: 47, height: 47}}
          />
        </Grid>
        <Grid item style={{paddingLeft: 10, paddingTop: 2}}>
          <Typography className={classes.userName}>
            Devaditya Bilaspure J
          </Typography>
          <Typography style={{color: 'rgb(91,91,91)', fontSize: 14}}>
            10.12K followers
          </Typography>
        </Grid>
        <Grid item>
          <Button 
            variant="outlined" 
            className={classes.followBtn}
            onClick={handleClickFollowBtn}
          >
            {!isFollowing ? 'Follow' : 'Following'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default TagsRightSidebar;