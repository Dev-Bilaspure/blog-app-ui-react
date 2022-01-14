import { Box, Grid, Typography, Button, Hidden } from '@material-ui/core'
import React, { useState } from 'react'
import './profilePageStyle.css';
import { Link } from 'react-router-dom';
import useStyle from './profilePageStyles';

const personImg = 'https://miro.medium.com/fit/c/131/131/2*1L5DSsWtYoQVm1TxThM4vQ.jpeg';
const des = '4x Best-Selling Author, Speaker, & Futurist. Founder of FutureOfWorkUniversity.com. Exploring Leadership, Employee Experience, & The Future of Work';

const ProfilePage = () => {
  const classes = useStyle();
  const [isFollowing, setIsFollowing] = useState(false);
  const handleFollowBntClick = () => {
    setIsFollowing(!isFollowing);
  }
  return (
    <Box className='profilePageWrapper'>
      <Hidden mdUp>
        <Box style={{borderBottom: '1px solid rgb(231,231,230)', paddingTop: 25, paddingBottom: 25}}>
          <TopMostBarForShortScreen />
        </Box>
      </Hidden>
      <TopBar isFollowing={isFollowing} handleFollowBntClick={handleFollowBntClick}/>
      <Box style={{borderTop: '1px solid rgb(231,231,230)'}}>
        <Grid container>
          <Hidden smDown>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Box style={{paddingLeft: 58, paddingTop: 60, overflowWrap: 'break-word', width: '100%'}}>
                <LeftSideBar isFollowing={isFollowing} handleFollowBntClick={handleFollowBntClick}/>
              </Box>
            </Grid>
          </Hidden>
          <Grid item lg={6} md={6} sm={12} xs={12} style={{paddingRight: 20}}>
            <Hidden mdUp>
              <UserDescriptionForSmallScreen />
            </Hidden>
            <Box style={{width: '100%', overflowWrap: 'break-word',paddingTop: 60, paddingLeft: 20}}>
              <PostsByUser />
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>

          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const TopMostBarForShortScreen = () => {
  const classes = useStyle();
  return(
    <Box>
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Box style={{fontSize: 35}}>
            <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
              <i class="fab fa-medium reverseTxt" ></i>
            </Link>
          </Box>
        </Grid>
        <Grid item sm={10} xs={10} className='rightSideOfTopMostBarSmlScr' style={{position: 'absolute', right: 0}}>
          <Grid container>
            <Grid item>
              <Typography  style={{color: 'rgb(26,136,22)', fontSize: 15, lineHeight: 2.3}}>
                Sign in
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={classes.getStartedButton}>
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const UserDescriptionForSmallScreen = () => {
  return(
    <Box style={{paddingLeft: 20, paddingTop: 50,  overflowWrap: 'break-word'}}>
      <Grid container>
        <Grid item lg={4} md={4} sm={3} xs={5}>
          <Box>
            <img 
              src={personImg} 
              alt="person image"
              className='userPhotoForTop'
            />
          </Box>
        </Grid>
        <Grid item  lg={8} md={8} sm={9} xs={7}>
          <Box className='userDescForTop'>
            {des}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const PostsByUser = () => {
  const arr = [1,2,3,4,5,6];
  return(
    <Box>
      {arr.map(ele => <PostByUser key={ele} />)}
    </Box>
  );
}

const PostByUser = () => {
  const postImg = 'https://miro.medium.com/max/1400/1*827xBJJ3qwJ3Usbmwj7MoA.jpeg';
  const classes = useStyle();
  const [likes, setLikes] = useState(300);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const handleCLickLikes = () => {
    if(isLiked)
      setLikes(likes-1);
    else
      setLikes(likes+1);
    setIsLiked(!isLiked);
  }
  const handleClickBookmark = () => {
    setIsBookMarked(!isBookMarked);
  }
  return(
    <Box className={classes.postByUserWrapper} >
      <Typography style={{color: 'rgb(116,116,117)', fontSize: '14px', fontFamily: `'Merriweather', 'serif'`}}>
        16 hours ago
      </Typography>
      <Typography style={{fontSize: 37, fontFamily: `'Signika', 'sans-serif'`, paddingTop: 15, lineHeight: 1.26}}>
        <Link to='/blog/1' style={{textDecoration: 'none', color: 'inherit'}}>
          10 Guiding Principles to Better Serve Your Customers
        </Link>
      </Typography>
      <Box style={{paddingTop: 25}}>
        <Link to='/blog/1' style={{textDecoration: 'none', color: 'inherit'}}>
          <img 
            src='https://miro.medium.com/max/1400/1*827xBJJ3qwJ3Usbmwj7MoA.jpeg' 
            alt="post image"
            style={{objectFit: 'cover', backgroungSize: 'cover', width: '100%'}}
          />
        </Link>
      </Box>
      <Box style={{paddingTop: 28}}>
        <Typography  className='shortDecription' style={{fontFamily: `'Faustina', 'serif'`, fontSize: 21}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo quisquam quasi doloribus mollitia ipsa expedita tempora optio odio fugit, dolores recusandae corporis repellendus libero totam ratione aperiam qui corrupti quo incidunt impedit iste? Omnis est error provident quos. Eligendi quasi natus nemo molestiae deserunt iste perspiciatis, consectetur delectus sint, ullam, eaque possimus eum culpa ipsum! Officia ipsum et odio. Sunt quia ea sint error nostrum. Quidem iste voluptatem beatae delectus eaque eveniet quia odio, mollitia tenetur quam placeat ad officiis. Minus corrupti nostrum voluptatibus magnam corporis necessitatibus aut, earum doloribus, commodi deserunt quibusdam dolorum. Vero iste ipsam totam consequatur dolorem?
        </Typography>
        <Box style={{paddingTop: 17}}>
          <Typography style={{color: 'rgb(26,136,22)', fontSize: 15}}>
            <Link to='/blog/1' style={{textDecoration: 'none', color: 'inherit'}}>
              Read more
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box style={{paddingTop: 40}}>
        <Grid container>
          <Grid item style={{fontSize: 23}} >
            <Grid container>
              <Grid item className={classes.likeOrBookmark} onClick={handleCLickLikes}>
                {
                  isLiked
                  ? <i class="fas fa-heart" style={{color: 'rgb(219, 61, 61)'}}></i>
                  : <i class="far fa-heart"></i>
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
              isBookMarked
              ? <i class="fas fa-bookmark" style={{color: 'rgb(26,136,22)'}}></i>
              : <i class="far fa-bookmark"></i>
            }
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}


const TopBar = ({isFollowing, handleFollowBntClick}) => {
  const classes = useStyle();
  return(
    <Box style={{paddingTop: 30}} className='containerForTopBar'>
        <Grid container>
          <Grid item lg={3} md={3} sm={12} xs={12} className='nameCont1'>
            <Grid container>
              <Grid item>
                <Typography className={classes.topName}>
                  Devaditya Bilaspure
                </Typography>
              </Grid>
              <Grid item>
                <Button className={classes.followButton} variant='contained' onClick={handleFollowBntClick}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={7} md={7}>
                <Grid container>
                  <Grid item className='followerAndFollowing'>
                    <Typography className='follwerCount' style={{fontSize: 15,lineHeight: '40px', color: 'rgb(116,116,117)'}} >
                      11.1K Followers
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className='follwerCount' style={{fontSize: 15,lineHeight: '40px', color: 'rgb(116,116,117)',paddingLeft: 30}}>
                      101 Following
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Hidden smDown>
                <Grid item lg={5} md={5} className='signToIcon' >
                  <Box style={{fontSize: 35}}>
                    <Grid container>
                      <Grid item >
                        <Typography style={{lineHeight: '40px', color: 'rgb(26,136,22)', fontSize: 15}}>
                          Sign In
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="outlined" className={classes.getStartedButton}>
                          Get Started
                        </Button>
                        <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                          <i class="fab fa-medium reverseTxt" ></i>
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

const LeftSideBar = ({isFollowing, handleFollowBntClick}) => {
  const classes = useStyle();
  return(
    <Box>
      <Box>
        <img 
          src={personImg} 
          alt="person image"
          style={{objectFit: 'cover', backgroungSize: 'cover', width: 150}}
        />
      </Box>
      <Box style={{paddingTop: 20}}>
        <Typography className={classes.leftBarUserName}>
          Dev Bilaspure
        </Typography>
        <Box className={classes.leftBarUserDesc}>
          {des}
        </Box>
      </Box>
      <Box style={{paddingTop: 23}}>
        <Button variant='contained' className={classes.leftBarFollowBnt} onClick={handleFollowBntClick}>
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </Box>
    </Box>
  );
}


export default ProfilePage;

