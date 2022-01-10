import { Avatar, Box, Button, Grid, Table, TableHead, TableRow, Typography, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './blogStyle.css'
import RelatedPosts from '../../components/RelatedPosts/RelatedPosts';
import useStyle from './blogStyle';



const Blog = () => {
  const location = useLocation();
  console.log(location);
  const classes = useStyle();
  
  const [isFollowing, setIsFollowing] = useState(false);
  
  
  const handleFollowButton = (e) => {
    e.preventDefault();
    setIsFollowing(!isFollowing);
  }
  const blogImg = `https://miro.medium.com/max/1400/1*TVd_sNhpc7JDPBHAsAOQZg.jpeg`;
  return (
    <Grid container style={{marginTop: 10, padding: 20, paddingRight: 0}}>
      <Grid item lg={3} md={3} sm={12} xs={12}>
        <LeftSideBar  isFollowing={isFollowing} handleFollowButton={handleFollowButton}/>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12} style={{width: '100%', paddingRight: 20}} >
        <Typography style={{fontSize: 48, lineHeight: '60px'}}>
          How to use React Router in your React js project.
        </Typography>
        <Box style={{marginTop: 26, marginBottom: 40}}>
          <MiddleBanner isFollowing={isFollowing} handleFollowButton={handleFollowButton}/>
          <Box style={{marginTop: 30}}>
            {
              blogImg 
              && <img 
                  src={blogImg}
                  alt="blog-post-image" 
                  style={{objectFit: 'cover', width: '100%'}}
                />
            }
            <Box style={{marginTop: 35}}>
              <Typography className={classes.textContent}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, laboriosam repudiandae voluptatibus, harum accusantium corporis earum quas, consectetur necessitatibus labore quis repellat iste magnam nulla? Quisquam fugit dignissimos aperiam error, fuga veritatis enim earum blanditiis nemo. Non saepe quod alias, aliquid accusamus voluptatum laborum laboriosam totam architecto. Officiis, praesentium quibusdam provident culpa, mollitia sint quas quae deleniti, placeat fugit totam?
                  <br />
                  <br />
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ad alias enim ipsa illo voluptatum dolores suscipit animi inventore corporis aspernatur rem nulla modi ipsam facere quo, eos adipisci, rerum aut nemo mollitia et praesentium. Officia dignissimos ullam assumenda explicabo velit nulla. Facilis animi dolorem earum libero eum nam minus inventore voluptatum tenetur. Voluptates nihil tempora alias, nam quo expedita architecto nisi minima facilis non! Qui voluptas odio, itaque soluta dolores repellat tempore earum hic commodi aliquid laboriosam id. Sint.
              </Typography>
            </Box>
            <Box>
              <Hidden mdUp>
                <LikeNBookmark isFollowing={isFollowing} setIsFollowing={setIsFollowing}/>
              </Hidden>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={3}  md={3} sm={12} xs={12}>
        <RightSideBar />
      </Grid>
    </Grid>
  )
}


const LikeNBookmark = () => {
  const [likes, setLikes] = useState(500);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleLikeButton = (e) => {
    e.preventDefault();
    if(isLiked) 
      setLikes(likes-1);
    else
      setLikes(likes+1);
    setIsLiked(!isLiked);
  }
  const handleBookmarkButton = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  }
  const classes = useStyle();
  return(
    <Box>
      <Grid container style={{ fontSize: 18}}>
          <Grid item className={classes.likeOrFollow} style={{ float: 'left', color: 'rgb(246,55,55)', fontSize: 20}} >
            {
              isLiked 
              ? <i class="fas fa-heart" style={{marginRight: 6}} onClick={handleLikeButton}></i> 
              : <i class="far fa-heart" style={{marginRight: 6}} onClick={handleLikeButton}></i>
            }
            {likes}
          </Grid>
          <Grid item className={classes.likeOrFollow} style={{color: 'rgb(27,137,22)', fontSize: 20}}>
            {
              isBookmarked 
              ? <i class="fas fa-bookmark" style={{marginLeft: 40}} onClick={handleBookmarkButton}></i>
              : <i class="far fa-bookmark" style={{marginLeft: 40}} onClick={handleBookmarkButton}></i>
            }
          </Grid>
        </Grid> 
    </Box>
  );
}

const LeftSideBar = ({ isFollowing, handleFollowButton }) => {
  const classes = useStyle();
  return(
    <Box>
      <Hidden xsDown smDown>
        <Box className={classes.likeFollowBookmark}>
          <Button onClick={handleFollowButton} className={classes.largeFollowButton}>
            {isFollowing ? 'Following' : 'Follow' }
          </Button>
          <Box style={{ marginTop: 15, borderTop: '1px solid rgb(240,240,241)', paddingTop: 10, paddingLeft: 6}}>
            <LikeNBookmark />
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
}

const RightSideBar = () => {
  const [isMyself, setIsMyself] = useState(true);
  return(
    <Box>
      {
        isMyself && 
        <Box style={{width: '80%',paddingLeft: 20, marginTop: 10, marginBottom: 50}}>
          <Typography style={{marginBottom: 10, fontFamily: `'Merriweather', 'serif'`, fontSize: 20}}>
            Author Controls
          </Typography>
          <Box style={{paddingTop: 20, borderTop: '1px solid rgb(227, 227, 228)'}}>
            <Button variant="outlined" startIcon={<EditIcon />} style={{marginBottom: 15, width: 140, color: 'rgb(101, 116, 122)', border: '1px solid rgb(101, 116, 122)'}}>
               Edit
            </Button><br />
            <Button variant="outlined" startIcon={<DeleteIcon />} style={{width: 140, color: 'rgb(216,63,53)', border: '1px solid rgb(216,63,53)'}}>
              Delete
            </Button>
          </Box>
        </Box>
      }
        
      <Box style={{width: '80%', paddingLeft: 20, marginTop: 60}}>
        <Typography style={{fontFamily: `'Merriweather', 'serif'`, fontSize: 20, marginBottom: 10}}>
          Related:
        </Typography>
        <Box style={{paddingTop: 20, borderTop: '1px solid rgb(227, 227, 228)'}}>
          <RelatedPosts />
        </Box>
      </Box>
    </Box>
  );
}

const MiddleBanner = ({ isFollowing, handleFollowButton }) => {
  const classes = useStyle();
  return(
    <Box>
      <Grid container style={{height: 'auto'}}>
        <Grid item>
          <Avatar
            alt="author avatar"
            src='https://picsum.photos/200'
            style={{width: 53, height: 53}}
          />
        </Grid>
        <Grid item style={{marginLeft: 13}}>
          <Table>
            <TableHead>
              <TableRow>
                <Typography style={{fontSize: 15, marginTop: 3, float: 'left'}}>Dev Bilaspure</Typography>
                <Button className={classes.smallFollowButton} onClick={handleFollowButton}>
                  {isFollowing ? 'Following' : 'Follow' }
                </Button>
              </TableRow>
              <TableRow>
                <Typography style={{fontSize: 15, color: 'rgb(117,117,117)'}}>Oct 23, 2021</Typography>
              </TableRow>
            </TableHead>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
}


export default Blog
