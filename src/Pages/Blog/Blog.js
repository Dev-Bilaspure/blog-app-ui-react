import { Avatar, Box, Button, Grid, Table, TableHead, TableRow, Typography, Hidden,Chip } from '@material-ui/core';
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './blogStyle.css'
import RelatedPosts from '../../components/RelatedPosts/RelatedPosts';
import useStyle from './blogStyle';



const Blog = ({user}) => {
  const classes = useStyle();
  const [isFollowing, setIsFollowing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('How to use React Router in your React js project.');
  const [description, setDiscription] = useState(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, 
  laboriosam repudiandae voluptatibus, harum accusantium corporis earum 
  quas, consectetur necessitatibus labore quis repellat iste magnam nulla? 
  Quisquam fugit dignissimos aperiam error, fuga veritatis enim earum bland
  itiis nemo. Non saepe quod alias, aliquid accusamus voluptatum laborum la
  boriosam totam architecto. Officiis, praesentium quibusdam provident culpa
  , mollitia sint quas quae deleniti, placeat fugit totam?
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ad alias 
  enim ipsa illo voluptatum dolores suscipit animi inventore corporis aspern
  atur rem nulla modi ipsam facere quo, eos adipisci, rerum aut nemo mollitia
   et praesentium. Officia dignissimos ullam assumenda explicabo velit nulla.
    Facilis animi dolorem earum libero eum nam minus inventore voluptatum tene
    tur. Voluptates nihil tempora alias, nam quo expedita architecto nisi minim
    a facilis non! Qui voluptas odio, itaque soluta dolores repellat tempore ea
    rum hic commodi aliquid laboriosam id. Sint.`);
  const [categories, setCategories] = useState(['Programming', 'Technology', 'React', 'Education']);
  const handleFollowButton = (e) => {
    if(!user)
      navigate('/signin', { state: {from: location}});
    setIsFollowing(!isFollowing);
    
  }
  const blogImg = `https://miro.medium.com/max/1400/1*TVd_sNhpc7JDPBHAsAOQZg.jpeg`;
  return (
    <Box className='blogWrapper'>
      <Grid container style={{marginTop: 10, padding: 20, paddingRight: 0, paddingLeft: 15}}>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <LeftSideBar user={user} location={location} isFollowing={isFollowing} handleFollowButton={handleFollowButton}/>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} style={{width: '100%', paddingRight: 15}} >
          <Typography style={{fontSize: 45, lineHeight: '58px', fontFamily: `'Lora', 'serif'`,}}>
            {title}
          </Typography>
          <div style={{paddingTop: 13}}>
            <CategoryTags categories={categories}/>
          </div>
          <Box style={{marginTop: 35, marginBottom: 40}}>
            <MiddleBanner isFollowing={isFollowing} handleFollowButton={handleFollowButton}/>
            <Box style={{marginTop: 25}}>
              {
                blogImg 
                && <img 
                    src={blogImg}
                    alt="blog-post-image" 
                    style={{objectFit: 'cover', width: '100%'}}
                  />
              }
              <Box style={{marginTop: 25, marginBottom: 30}}>
                <Typography className={classes.textContent}>
                  {description}
                </Typography>
              </Box>
              <Box>
                <Hidden mdUp>
                  <Box style={{borderTop: '1px solid rgb(227, 227, 228)', paddingTop: 30}}>
                    <LikeNBookmark user={user} isFollowing={isFollowing} setIsFollowing={setIsFollowing}/>
                  </Box>
                </Hidden>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={3}  md={3} sm={12} xs={12}>
          <RightSideBar/>
        </Grid>
      </Grid>
    </Box>
    
  )
}
export const CategoryTags = ({categories}) => {
  const classes = useStyle();
  return(
    <div>
      {
        categories.map(cat => (
          <Button className={classes.categoryTag} variant='contained' >{cat}</Button>
        ))
      }
    </div>
  );
}

const LikeNBookmark = ({user, location}) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(500);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleLikeButton = (e) => {
    if(!user)
      navigate('/signin', {state: {from: location}});
    if(isLiked) 
      setLikes(likes-1);
    else
      setLikes(likes+1);
    setIsLiked(!isLiked);
  }
  const handleBookmarkButton = (e) => {
    if(!user)
      navigate('/signin', {state: {from: location}});
    setIsBookmarked(!isBookmarked);
  }
  const classes = useStyle();
  return(
    <Box>
      <Grid container style={{ fontSize: 18}}>
          <Grid item className={classes.likeOrFollow} style={{ float: 'left', fontSize: 20}} >
            {
              isLiked 
              ? <i className="fas fa-heart" style={{marginRight: 6, color: 'rgb(219, 61, 61)'}} onClick={handleLikeButton}></i> 
              : <i className="far fa-heart" style={{marginRight: 6}} onClick={handleLikeButton}></i>
            }
            {likes}
          </Grid>
          <Grid item className={classes.likeOrFollow} style={{color: 'rgb(27,137,22)', fontSize: 20}}>
            {
              isBookmarked 
              ? <i className="fas fa-bookmark" style={{marginLeft: 40}} onClick={handleBookmarkButton}></i>
              : <i className="far fa-bookmark" style={{marginLeft: 40}} onClick={handleBookmarkButton}></i>
            }
          </Grid>
        </Grid> 
    </Box>
  );
}

const LeftSideBar = ({ isFollowing, handleFollowButton, user, location }) => {
  const classes = useStyle();
  return(
    <Box>
      <Hidden xsDown smDown>
        <Box className={classes.likeFollowBookmark}>
          <Button onClick={handleFollowButton} className={classes.largeFollowButton}>
            {isFollowing ? 'Following' : 'Follow' }
          </Button>
          <Box style={{ marginTop: 15, borderTop: '1px solid rgb(240,240,241)', paddingTop: 10, paddingLeft: 6}}>
            <LikeNBookmark user={user} location={location}/>
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
        <Box style={{width: '90%',paddingLeft: 10, marginTop: 10, marginBottom: 50}}>
          <Typography style={{marginBottom: 10, fontFamily: `'Raleway', 'sans-serif'`, fontSize: 22}}>
            Author Controls
          </Typography>
          <Box style={{paddingTop: 20, borderTop: '1px solid rgb(227, 227, 228)'}}>
            <Button variant="outlined" startIcon={<EditIcon />} style={{borderRadius: 100, marginBottom: 25, width: 140, color: 'rgb(101, 116, 122)', border: '1px solid rgb(101, 116, 122)'}}>
               Edit
            </Button><br />
            <Button variant="outlined" startIcon={<DeleteIcon />} style={{borderRadius: 100, width: 140, color: 'rgb(216,63,53)', border: '1px solid rgb(216,63,53)'}}>
              Delete
            </Button>
          </Box>
        </Box>
      }
        
      <Box style={{width: '90%', paddingLeft: 10, marginTop: 60}}>
        <Typography style={{fontFamily: `'Raleway', 'sans-serif'`, fontSize: 22, marginBottom: 10}}>
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
          <Link to='/profile' style={{textDecoration: 'none', color: 'inherit'}}>
            <Avatar
              alt="author avatar"
              src='https://picsum.photos/200'
              style={{width: 53, height: 53}}
            />
          </Link>
        </Grid>
        <Grid item style={{marginLeft: 13}}>
          <Table>
            <TableHead>
              <TableRow>
                <Link to='/profile' style={{textDecoration: 'none', color: 'inherit'}}>
                  <Typography style={{fontSize: 15, marginTop: 3, float: 'left'}}>
                    Dev Bilaspure
                  </Typography>
                </Link>
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
