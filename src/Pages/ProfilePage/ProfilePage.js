import { Box, Grid, Typography, Button, Hidden } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import './profilePageStyle.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useStyle from './profilePageStyles';
import {CategoryTags} from './../Blog/Blog'
import BasicMenu from './../../components/BasicMenu/BasicMenu';
import UserFollowersFollowingsDialogBox from '../../components/UserFollowersFollowingsDialogBox/UserFollowersFollowingsDialogBox';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import CircularProgress from '@mui/material/CircularProgress';


const defaultUserPic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
const PF = 'http://localhost:5000/images/'


const ProfilePage = ({user}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {loginSuccess} = useContext(UserContext);

  const username = location.pathname.split('/')[2].substr(1);
  console.log(username);

  const [usersname, setUsersname] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [followings, setFollowings] = useState([1,2]);
  const [followers, setFollowers] = useState([1,2]); 
  const [profilePic, setProfilePic] = useState('');
  const [profileUsersId, setProfileUsersId] = useState('');
  const [usersPosts, setUsersPosts] = useState([]);

  const [isFollowing, setIsFollowing] = useState(false);

  const [isFetchingUsersPosts, setIsFetchingUsersPosts] = useState(false);

  useEffect(() => {
    setIsFetchingUsersPosts(true);
    const fetchUsersInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/userbyusername/${username}`
        ).then(res => {
          const userkiId = res.data._id;
          setUsersname(res.data.name);
          setShortBio(res.data.shortBio);
          setFollowers(res.data.followers);
          setFollowings(res.data.followings);
          setProfilePic(res.data.profilePicture);
          user && setIsFollowing(user.followings.includes(userkiId));
          
          setProfileUsersId(userkiId)
          console.log("kkkkkm", profileUsersId.toString(), isFollowing);
          return(res.data._id);
        }).then(res => {
          fetchUsersPosts(res);
        }).catch(err => {
          console.log(err);
        })
      } catch(error) {
        console.log(error);
      }
    }
    fetchUsersInfo();

    const fetchUsersPosts = async (respId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${respId}/published`
        ).then(res => {
          setUsersPosts(res.data);
          console.log(usersPosts);
          setIsFetchingUsersPosts(false);
        }).catch(err => {
          console.log(err);
          setIsFetchingUsersPosts(false);
        })
      } catch(error) {
        console.log(error);
      }
    }
  }, [username])

  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [dialogBoxType, setDialogBoxType] = useState('');  //follower or following

  const handleOpenDialogBox = (boxType) => {
    setDialogBoxType(boxType);
    setOpenDialogBox(true);
  }
  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  } 

  const handleClickSignIn = () => {
    navigate('/signin', {state: {from: location}});
  }

  const handleClickGetStarted = () => {
    navigate('/signup', {state: {from: location}});
  }

  const handleFollowButton = async() => {
    if(!user)
      navigate('/signin', { state: {from: location}});
    
    else {

      try {
        const response = await axios.put(
          `http://localhost:5000/api/users/${profileUsersId}/follow`,
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
    
    // setIsFollowing(!isFollowing);
  }

  return (
    <Box className='profilePageWrapper'>
      {
        profileUsersId &&
        <UserFollowersFollowingsDialogBox
          openDialogBox={openDialogBox}
          handleCloseDialogBox={handleCloseDialogBox}
          dialogBoxType={dialogBoxType}
          user={user}
          profileUsersId={profileUsersId}
        />
      }
      
      <Hidden mdUp>
        <Box style={{borderBottom: '1px solid rgb(231,231,230)', paddingTop: 25, paddingBottom: 25}}>
          <TopMostBarForShortScreen 
            user={user} 
            handleClickSignIn={handleClickSignIn} 
            handleClickGetStarted={handleClickGetStarted}
          />
        </Box>
      </Hidden>
      <TopBar 
        user={user}  
        handleClickSignIn={handleClickSignIn} 
        handleClickGetStarted={handleClickGetStarted}
        handleOpenDialogBox={handleOpenDialogBox}
        usersname={usersname}
        followersCnt={followers.length}
        followingsCnt={followings.length}
        handleFollowButton={handleFollowButton}
        isFollowing={isFollowing}
      />
      <Box style={{borderTop: '1px solid rgb(231,231,230)'}}>
        <Grid container>
          <Hidden smDown>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Box style={{paddingLeft: 58, paddingTop: 50, overflowWrap: 'break-word', width: '100%'}}>
                <LeftSideBar 
                  usersname={usersname}
                  shortBio={shortBio}
                  profilePic={profilePic}
                  handleFollowButton={handleFollowButton}
                  isFollowing={isFollowing}
                />
              </Box>
            </Grid>
          </Hidden>
          <Grid item lg={6} md={6} sm={12} xs={12} style={{paddingRight: 0}}>
            <Hidden mdUp>
              <UserDescriptionForSmallScreen shortBio={shortBio} profilePic={profilePic}/>
            </Hidden>
            <Box style={{width: '100%', overflowWrap: 'break-word',paddingTop: 50, paddingLeft: 10}}>
              <PostsByUser user={user} usersPosts={usersPosts} isFetchingUsersPosts={isFetchingUsersPosts}/>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const TopMostBarForShortScreen = ({user, handleClickSignIn, handleClickGetStarted}) => {
  const classes = useStyle();
  
  return(
    <Box>
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Box style={{fontSize: 35}}>
            <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
              <i className="fab fa-medium reverseTxt" ></i>
            </Link>
          </Box>
        </Grid>
        <Grid item sm={10} xs={10} className='rightSideOfTopMostBarSmlScr' style={{position: 'absolute', right: 0}}>
          
          {
            user ?
            <div>
              <BasicMenu />
            </div> :
            <Grid container>
              <Grid item>
                <Typography className={classes.signInButton} style={{color: 'rgb(26,136,22)', fontSize: 15, lineHeight: 2.3}} onClick={handleClickSignIn}>
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="outlined" className={classes.getStartedButton} onClick={handleClickGetStarted}>
                  Get Started
                </Button>
              </Grid>
            </Grid>
          }
          
        </Grid>
      </Grid>
    </Box>
  );
}

const UserDescriptionForSmallScreen = ({profilePic, shortBio}) => {
  return(
    <Box style={{paddingLeft: 20, paddingTop: 50,  overflowWrap: 'break-word'}}>
      <Grid container>
        <Grid item lg={4} md={4} sm={3} xs={5}>
          <Box>
            {
              profilePic.length &&
              <img 
                src={profilePic} 
                alt="person image"
                className='userPhotoForTop'
              />
            }
            
          </Box>
        </Grid>
        <Grid item  lg={8} md={8} sm={9} xs={7}>
          <Box className='userDescForTop'>
            {shortBio.length ? shortBio : `Hey there, I'm here to share, what I learn and to connect. Hit the follow button and to track my posts.`}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const PostsByUser = ({user, usersPosts, isFetchingUsersPosts}) => {
  const postsArr = [1,2,3,4,5,6];
  return(
    <div>
      {
        isFetchingUsersPosts ?
        <div style={{textAlign: 'center'}}>
          <CircularProgress color="success" size={70}/> 
        </div> :
        (usersPosts.length
        ? usersPosts.map(post => <PostByUser user={user}  post={post}/>)
        : <div style={{width: 134, margin: 'auto'}}>
            <Typography style={{color: 'rgb(81,81,81)', fontSize: 19, fontWeight: 'bold'}}>
              No stories yet.
            </Typography>
          </div>)
      }
    </div>
  );
}

const PostByUser = ({user, post}) => {
  const postImg = 'https://miro.medium.com/max/1400/1*827xBJJ3qwJ3Usbmwj7MoA.jpeg';
  const classes = useStyle();
  const location = useLocation();
  const navigate = useNavigate();

  const {loginSuccess} = useContext(UserContext);

  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [categories, setCategories] = useState(['Lifestyle', 'Health', 'Food']);

  const handleClickLike = async () => {
    if(!user)
      navigate('/signin', {state: {from: location}});
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${post._id}/like`,
        {userId: user._id}
      ).then(res => {
        console.log(res.data);
        if(isLiked)
          setLikes(likes-1);
        else
          setLikes(likes+1);
        setIsLiked(post.likes.includes(user._id));
      })
    } catch(error) {
      console.log(error);
    }
  }

  
  const handleClickBookmark = async() => {
    if(!user)
      navigate('/signin', {state: {from: location}});
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${post._id}/bookmark`,
        {userId: user._id}
      ).then(res => {
        loginSuccess(res.data);
        console.log(res.data);
        setIsBookmarked(user.bookmarks.includes(post._id))
      })
    } catch(error) {
      console.log(error);
    }
    // setIsBookmarked(!isBookmarked)
  }

  return(
    <Box className={classes.postByUserWrapper} >
      <Typography style={{color: 'rgb(116,116,117)', fontSize: '14px', fontFamily: `'Merriweather', 'serif'`}}>
        {new Date(post.createdAt).toDateString()}
      </Typography>
      <Typography style={{fontSize: 37, fontFamily: `'Signika', 'sans-serif'`, paddingTop: 10, lineHeight: 1.26, color: 'rgb(41,41,41)'}}>
        <Link to={`/blog/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
          {post.title}
        </Link>
      </Typography>
      <div style={{paddingTop: 10}}>
        <CategoryTags categories={post.tags}/>
      </div>
      <Box style={{paddingTop: 25}}>
        <Link to={`/blog/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
          {
            post.img && 
            <img 
              src={PF+post.img} 
              alt="post image"
              style={{objectFit: 'cover', backgroungSize: 'cover', width: '100%', borderRadius: 7}}
            />
          }
        </Link>
      </Box>
      <Box style={{paddingTop: 20}}>
        <Typography style={{fontFamily: `'Faustina', 'serif'`, fontSize: 21}} className='shortDecription'>
          {post.desc}
        </Typography>
        <Box style={{paddingTop: 17}}>
          <Typography style={{color: 'rgb(26,136,22)', fontSize: 15}}>
            <Link to={`/blog/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              Read more
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box style={{paddingTop: 30}}>
        <Grid container>
          <Grid item style={{fontSize: 23}} >
            <Grid container>
              <Grid item className={classes.likeOrBookmark} onClick={handleClickLike}>
                {
                  isLiked
                  ? <i className="fas fa-heart" style={{color: 'rgb(219, 61, 61)'}}></i>
                  : <i className="far fa-heart"></i>
                }
                
              </Grid>
              <Grid item>
                <Typography style={{fontSize: 14, paddingTop: 1, paddingLeft: 8}}>
                  {likes} likes
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{fontSize: 23, paddingLeft: 50}} onClick={handleClickBookmark} className={classes.likeOrBookmark}>
            {
              isBookmarked
              ? <i className="fas fa-bookmark" style={{color: 'rgb(26,136,22)'}}></i>
              : <i className="far fa-bookmark"></i>
            }
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}


const TopBar = (props) => {
  const classes = useStyle();
  const {
    user, 
    handleClickSignIn, 
    handleClickGetStarted,
    handleOpenDialogBox,
    followersCnt,
    followingsCnt,
    usersname,
    handleFollowButton,
    isFollowing
  } = props;
  return(
    <Box style={{paddingTop: 20}} className='containerForTopBar'>
        <Grid container>
          <Grid item lg={3} md={3} sm={12} xs={12} className='nameCont1'>
            <Grid container style={{paddingTop: 5}}>
              <Grid item>
                <Typography className={classes.topName}>
                  {usersname}
                </Typography>
              </Grid>
              <Grid item>
                <Button className={classes.followButton} variant='contained' onClick={handleFollowButton}>
                  {isFollowing ? 'Following' : 'Follow' }
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={7} md={7}>
                <Grid container>
                  <Grid item className='followerAndFollowing'>
                    <Typography className='follwerCount'  onClick={() => {handleOpenDialogBox('follower')}} style={{fontSize: 15,lineHeight: '40px', color: 'rgb(116,116,117)', paddingTop: 5}}>
                      {followersCnt} Followers
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className='follwerCount' onClick={() => {handleOpenDialogBox('following')}} style={{fontSize: 15,lineHeight: '40px', color: 'rgb(116,116,117)',paddingLeft: 30, paddingTop: 5}}>
                      {followingsCnt} Following
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Hidden smDown>
                <Grid item lg={5} md={5} className='signToIcon' >
                  <Box style={{fontSize: 35}}>
                    <Grid container>
                      {
                        user ?
                        <div>
                          <BasicMenu />
                        </div> :
                        <>
                          <Grid item >
                            <Typography className={classes.signInButton} style={{lineHeight: '40px', color: 'rgb(26,136,22)', fontSize: 15}} onClick={handleClickSignIn}>
                              Sign In
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Button variant="outlined" className={classes.getStartedButton} onClick={handleClickGetStarted}>
                              Get Started
                            </Button>
                          </Grid>
                        </>
                      }
                      
                      <Grid item style={{paddingTop: 4}}>
                        <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                          <i className="fab fa-medium reverseTxt" ></i>
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Box>
  );
}

const LeftSideBar = ({ usersname, shortBio, profilePic, handleFollowButton, isFollowing }) => {
  const classes = useStyle();
  return(
    <Box>
      <Box>
        <img 
          src={profilePic.length ? PF+profilePic : defaultUserPic} 
          alt="person image"
          style={{objectFit: 'cover', backgroungSize: 'cover', width: 150, borderRadius: 6, height: 160}}
        />
      </Box>
      <Box style={{paddingTop: 20}}>
        <Typography className={classes.leftBarUserName}>
          {usersname} 
        </Typography>
        <Box className={classes.leftBarUserDesc}>
          {shortBio.length>0 ? shortBio : `Hey there, I'm here to share, what I learn and to connect. Hit the follow button and to track my posts.`}
        </Box>
      </Box>
      <Box style={{paddingTop: 23}}>
        <Button variant='contained' className={classes.leftBarFollowBnt} onClick={handleFollowButton}>
          {isFollowing ? 'Following' : 'Follow' }
        </Button>
      </Box>
    </Box>
  );
}


export default ProfilePage;

