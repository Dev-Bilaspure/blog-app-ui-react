import { Avatar, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom'
import Categories from '../Categories/Categories';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';


const PF = 'http://localhost:5000/images/'
const defaultUserPic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

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
const TagsRightSidebar = ({user}) => {
  const classes = useStyle();

  const [rankedUsers, setRankedUsers] = useState([]);
  useEffect(() => {
    const fetchRankedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/ranked`
        ).then(res => {
          setRankedUsers(res.data);
        }).catch(err => {
          console.log(err);
        })
      } catch(error) {
        console.log(error);
      }
    }
    fetchRankedUsers();
  }, [user])
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
        <div style={{paddingBottom: 100}}>
          {
            rankedUsers.map(rankedUser => (
              <RankedUser rankedUser={rankedUser} user={user}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

const RankedUser = ({rankedUser, user}) => {
  const classes = useStyle(); 
  const location = useLocation();
  const navigate = useNavigate();
  const {loginSuccess} = useContext(UserContext);


  // console.log(user.followings.includes(rankedUser._id))
  const [isFollowing, setIsFollowing] = useState(user && user.followings.includes(rankedUser._id));

  const handleClickFollowBtn = async() => {
    if(!user)
      navigate('/signin', { state: {from: location}});
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${rankedUser._id}/follow`,
        {userId: user._id}
      ).then(res => {
        loginSuccess(res.data);
        console.log(res.data);
        setIsFollowing(!isFollowing);
      })
    } catch(error) {
      console.log(error);
    }
  }

  return(
    <div style={{marginBottom: 35, wordBreak: 'break-all'}}>
      <Grid container>
        <Grid item style={{marginBottom: 10}}>
          <Link to={`/profile/@${rankedUser.username}`} style={{color: 'inherit', textDecoration: 'none'}}>
            <Avatar
              alt="author avatar"
              src={rankedUser.profilePicture ? PF+rankedUser.profilePicture : defaultUserPic}
              style={{width: 47, height: 47}}
            />
          </Link>
        </Grid>
        <Grid item style={{paddingLeft: 10, paddingTop: 2}}>
          <Typography className={classes.userName}>
            <Link to={`/profile/@${rankedUser.username}`} style={{color: 'inherit', textDecoration: 'none'}}>
              {rankedUser.name}
            </Link>
          </Typography>
          <Typography style={{color: 'rgb(91,91,91)', fontSize: 14}}>
            {rankedUser.followers.length} Followers
          </Typography>
        </Grid>
        <Grid item>
          <Button 
            variant="outlined" 
            className={classes.followBtn}
            onClick={handleClickFollowBtn}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default TagsRightSidebar;