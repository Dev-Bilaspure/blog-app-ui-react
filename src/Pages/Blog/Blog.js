import { Avatar, Box, Button, Grid, Table, TableHead, TableRow, Typography, Hidden,Chip } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './blogStyle.css'
import RelatedPosts from '../../components/RelatedPosts/RelatedPosts';
import useStyle from './blogStyle';
import DeletePostWarningDialogBox from '../../components/DeletePostWarningDialogBox/DeletePostWarningDialogBox';
import axios from 'axios'
import {UserContext} from './../../context/UserContext'

const PF = 'http://localhost:5000/images/'
const defaultUserPic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

const Blog = ({user}) => {
  const classes = useStyle();
  const location = useLocation();
  const navigate = useNavigate();
  
  const postID = location.pathname.split(('/'))[2];

  const {loginSuccess} = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [description, setDiscription] = useState('');
  const [categories, setCategories] = useState([1,2,3,4]);
  const [likes, setLikes] = useState(0);
  const [postUpdatedAt, setPostUpdatedAt] = useState('');
  const [blogImg, setBlogImg] = useState('')
  const [openDialogBox, setOpenDialogBox] = useState(false);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const [postsUsersId, setPostsUsersId] = useState('');

  const [authorName, setAuthorName] = useState('');
  const [authorProfilePic, setAuthorProfilePic] = useState('');
  const [authorUsername, setAuthorUsername] = useState('');

  
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${postID}`
        ).then(res => {
          setTitle(res.data.title);
          setDiscription(res.data.desc);
          setCategories(res.data.tags);
          setLikes(res.data.likes.length);
          setBlogImg(res.data.img);
          setPostsUsersId(res.data.userId);
          user && setIsLiked(res.data.likes.indexOf(user._id)>-1);
          setPostUpdatedAt(res.data.updatedAt);
          return(res.data.userId);
        }).then(res => {
          fetchAuthorInfo(res);
        })
      } catch(error) {
        console.log(error);
      }
    }
    fetchBlogData();

    const fetchAuthorInfo = async(userId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/userbyid/${userId}`
        ).then(res => {
          setAuthorName(res.data.name);
          setAuthorProfilePic(res.data.profilePicture);
          setAuthorUsername(res.data.username);

          setIsFollowing(user.followings.indexOf(userId)>-1);  
        })
      } catch(error) {
        console.log(error);
      }
    }

  }, [postID])

  const handleOpenDialogBox = () => {
    setOpenDialogBox(true);
  }
  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  }

  const handleFollowButton = async() => {
    if(!user)
      navigate('/signin', { state: {from: location}});
    else {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/users/${postsUsersId}/follow`,
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

  const handleClickLike = async () => {
    if(!user)
      navigate('/signin', {state: {from: location}});
    else {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/posts/${postID}/like`,
          {userId: user._id}
        ).then(res => {
          console.log(res.data);
          if(isLiked)
            setLikes(likes-1);
          else
            setLikes(likes+1);
          setIsLiked(!isLiked);
        })
      } catch(error) {
        console.log(error);
      }
    }
  }

  const handleClickBookmark = async() => {
    if(!user)
      navigate('/signin', {state: {from: location}});
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${postID}/bookmark`,
        {userId: user._id}
      ).then(res => {
        loginSuccess(res.data);
        console.log(res.data);
        setIsBookmarked(user.bookmarks.includes(postID))
      })
    } catch(error) {
      console.log(error);
    }
    // setIsBookmarked(!isBookmarked)
  }


  return (
    <Box className='blogWrapper'>

      <DeletePostWarningDialogBox
        openDialogBox={openDialogBox}
        handleCloseDialogBox={handleCloseDialogBox}
        postId={postID}
        afterDeleteNavigateLocation={'/published'}
      />

      <Grid container style={{marginTop: 10, paddingTop: 20, paddingRight: 0, paddingLeft: 0}}>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <LeftSideBar  
            isLiked={isLiked}
            likes={likes}
            isFollowing={isFollowing} 
            isBookmarked={isBookmarked}
            handleFollowButton={handleFollowButton}
            handleClickLike={handleClickLike}
            handleClickBookmark={handleClickBookmark}
            postID={postID}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} style={{width: '100%', paddingRight: 10, paddingLeft: 10}} >
          <Typography style={{fontSize: 44, lineHeight: '58px', fontFamily: `'Lora', 'serif'`, paddingRight: 3, paddingLeft: 0}}>
            {title}
          </Typography>
          <div style={{paddingTop: 13}}>
            <CategoryTags categories={categories}/>
          </div>
          <Box style={{marginTop: 35, marginBottom: 40}}>
            <MiddleBanner 
              isFollowing={isFollowing} 
              handleFollowButton={handleFollowButton} 
              authorUsername={authorUsername}
              authorProfilePic={authorProfilePic}
              authorName={authorName}
              postUpdatedAt={postUpdatedAt}
            />
            <Box style={{marginTop: 25}}>
              {
                blogImg 
                && <img 
                    src={PF+blogImg}
                    alt="blog-post-image" 
                    style={{objectFit: 'cover', width: '100%', borderRadius: 5}}
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
                    <LikeNBookmark 
                      likes={likes}
                      isLiked={isLiked}
                      isBookmarked={isBookmarked}
                      handleClickLike={handleClickLike}
                      handleClickBookmark={handleClickBookmark}
                    />
                  </Box>
                </Hidden>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={3}  md={3} sm={12} xs={12}>
          <RightSideBar 
            handleOpenDialogBox={handleOpenDialogBox} 
            categories={categories} 
            postsUsersId={postsUsersId}
            title={title}
            description={description}
            postID={postID}
            blogImg={blogImg}
          />
        </Grid>
      </Grid>
    </Box>
    
  )
}
export const CategoryTags = ({categories}) => {
  const classes = useStyle();
  const navigate = useNavigate();
  return(
    <div style={{overflowWrap: 'break-word'}}>
      {
        categories.map(cat => (
          <Button 
            className={classes.categoryTag} 
            variant='contained' 
            onClick={() => {
              navigate(`/tag/${cat.toLowerCase()}`);
            }}
          >
            {cat}
          </Button>
        ))
      }
    </div>
  );
}

const LikeNBookmark = ({isLiked, likes, isBookmarked, handleClickLike, handleClickBookmark, postID}) => {
  const classes = useStyle();
  const {user} = useContext(UserContext);
  return(
    <Box>
      <Grid container style={{ fontSize: 18}}>
          <Grid item className={classes.likeOrFollow} style={{ float: 'left', fontSize: 20}} >
            {
              isLiked
              ? <i className="fas fa-heart" style={{marginRight: 6, color: 'rgb(219, 61, 61)'}} onClick={handleClickLike}></i> 
              : <i className="far fa-heart" style={{marginRight: 6}} onClick={handleClickLike}></i>
            }
            {likes}
          </Grid>
          <Grid item className={classes.likeOrFollow} style={{fontSize: 20}}>
            {
              user && user.bookmarks.includes(postID)
              ? <i className="fas fa-bookmark" style={{marginLeft: 40, color: 'rgb(27,137,22)'}} onClick={handleClickBookmark}></i>
              : <i className="far fa-bookmark" style={{marginLeft: 40, color: 'rgb(41,41,41)'}} onClick={handleClickBookmark}></i>
            }
          </Grid>
        </Grid> 
    </Box>
  );
}

const LeftSideBar = (props) => {
  const classes = useStyle();
  const { 
    isLiked, 
    likes, 
    isFollowing, 
    isBookmarked, 
    handleFollowButton, 
    handleClickLike, 
    handleClickBookmark,
    postID
  } = props
  return(
    <Box>
      <Hidden xsDown smDown>
        <Box className={classes.likeFollowBookmark}>
          <Button onClick={handleFollowButton} className={classes.largeFollowButton}>
            {isFollowing ? 'Following' : 'Follow' }
          </Button>
          <Box style={{ marginTop: 15, borderTop: '1px solid rgb(240,240,241)', paddingTop: 10, paddingLeft: 6}}>
            <LikeNBookmark 
              likes={likes}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              handleClickLike={handleClickLike}
              handleClickBookmark={handleClickBookmark}
              postID={postID}
            />
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
}

const RightSideBar = ({handleOpenDialogBox, categories, postsUsersId, title, description, postID, blogImg}) => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const handleEditPost = () => {
    navigate('/write', {state: {
      oldPostTitle: title,
      oldPostDesc: description,
      oldPostCategories: categories,
      oldPostId: postID,
      oldPostImg: PF+blogImg
    }})
  }
  return(
    <Box>
      {
        user && user._id===postsUsersId && 
        <Box style={{width: '90%',paddingLeft: 10, marginTop: 10, marginBottom: 50}}>
          <Typography style={{paddingLeft: 10, marginBottom: 10, fontFamily: `'Raleway', 'sans-serif'`, fontSize: 22, color: 'rgb(61,61,61)'}}>
            Author Controls
          </Typography>
          <Box style={{paddingTop: 20, borderTop: '1px solid rgb(227, 227, 228)', paddingLeft: 10}}>
            <Button variant="outlined" startIcon={<EditIcon />} style={{paddingTop: 5, paddingBottom: 5, borderRadius: 100, marginBottom: 25, width: 110, color: 'rgb(101, 116, 122)', border: '1px solid rgb(101, 116, 122)', textTransform: 'none'}}>
              <Typography style={{fontSize: 14}} onClick={handleEditPost}>Edit</Typography>
            </Button><br />
            <Button 
              variant="outlined" 
              startIcon={<DeleteIcon />} 
              style={{ paddingTop: 5, paddingBottom: 5, borderRadius: 100, width: 110, color: 'rgb(216,63,53)', border: '1px solid rgb(216,63,53)', textTransform: 'none'}}
              onClick={handleOpenDialogBox}
            >
              <Typography style={{fontSize: 14}}>Delete</Typography>
            </Button>
          </Box>
        </Box>
      }
        
      <Box style={{width: '90%', paddingLeft: 10, marginTop: 60}}>
        <Typography style={{fontFamily: `'Raleway', 'sans-serif'`, fontSize: 22, marginBottom: 10, color: 'rgb(51,51,51)', paddingLeft: 10}}>
          Related:
        </Typography>
        <Box style={{paddingTop: 20, borderTop: '1px solid rgb(227, 227, 228)', paddingLeft: 10}}>
          <RelatedPosts categories={categories}/>
        </Box>
      </Box>
    </Box>
  );
}

const MiddleBanner = ({ isFollowing, handleFollowButton, authorUsername, authorProfilePic, authorName, postUpdatedAt }) => {
  const classes = useStyle();
  return(
    <Box>
      <Grid container style={{height: 'auto'}}>
        <Grid item>
          <Link to={`/profile/@${authorUsername}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <Avatar
              alt="author avatar"
              src={ authorProfilePic.length ? PF+authorProfilePic : defaultUserPic}
              style={{width: 53, height: 53}}
            />
          </Link>
        </Grid>
        <Grid item style={{marginLeft: 8}}>
          <Table>
            <TableHead>
              <TableRow>
                <Link to={`/profile/@${authorUsername}`} style={{textDecoration: 'none', color: 'inherit'}}>
                  <Typography style={{fontSize: 16, marginTop: 3, float: 'left'}}>
                    {authorName} 
                  </Typography>
                </Link>
                <Button className={classes.smallFollowButton} onClick={handleFollowButton}>
                  {isFollowing ? 'Following' : 'Follow' }
                </Button>
              </TableRow>
              <TableRow>
                <Typography style={{fontSize: 15, color: 'rgb(117,117,117)', paddingTop: 3}}>
                  {new Date(postUpdatedAt).toDateString()}
                </Typography>
              </TableRow>
            </TableHead>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
}


export default Blog
