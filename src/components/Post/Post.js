import { makeStyles, Typography } from '@material-ui/core'
import './postStyle.css';
import React, {useContext, useEffect, useState} from 'react'
import { Grid, Hidden } from '@mui/material';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { CategoryTags } from '../../Pages/Blog/Blog';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const PF = 'http://localhost:5000/images/'
const defaultUserPic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

const useStyles = makeStyles({
  bookmarkBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
})
// const postCategories = ['Life', 'Education', 'Technology', 'Science']
//   const personImg = 'https://miro.medium.com/fit/c/131/131/2*1L5DSsWtYoQVm1TxThM4vQ.jpeg';
//   const blogImg = `https://miro.medium.com/max/1400/1*TVd_sNhpc7JDPBHAsAOQZg.jpeg`;
//   const postTitle = '8 Free Websites Every Content Creator Needs to Know'
//   const authorName = 'Dev Bilaspure'
//   const postDiscription = 'Lorem dolor sit amet consectetur adipisicing elit. Harum totam iste esse eius placeat consequuntur laborum eveniet iusto nihil rerum reprehenderit, explicabo culpa, amet quidem necessitatibus. Aut consectetur rem, fuga corporis doloribus fugit tempore, modi perferendis, deserunt ea necessitatibus corrupti officiis temporibus nisi? Accusamus dolorum voluptates fugiat cupiditate laborum vel!'
//   const likesCnt = 60;
const Post = ({user, post}) => {
  const {loginSuccess} = useContext(UserContext);
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const [authorName, setAuthorName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [authorUsername, setAuthorUsername] = useState('');

  const [isBookmarked, setIsBookmarked] = useState(user && user.bookmarks.includes(post._id));

  const handleBookmark = async() => {
    if(!user)
      navigate('/signin', {state: {from: location}});
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${post._id}/bookmark`,
        {userId: user._id}
      ).then(res => {
        loginSuccess(res.data);
        console.log(res.data);
        setIsBookmarked(!isBookmarked);
      })
    } catch(error) {
      console.log(error);
    }
    // setIsBookmarked(!isBookmarked)
  }
  useEffect(() => {
    const fetchAuthorInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/userbyid/${post.userId}`
        ).then(res => {
          setAuthorName(res.data.name);
          setProfilePic(res.data.profilePicture);
          setAuthorUsername(res.data.username);
          console.log('dmekmkmek', profilePic);
        }).catch(err => {
          console.log(err);
        })
      } catch(error) {
        console.log(error);
      }
    }
    fetchAuthorInfo();
  }, [])
  return(
    <div style={{marginBottom: 70}}>
      <Grid container style={{paddingBottom: 7}}>
        <Grid item>
          <Link to={`/profile/@${authorUsername}`} style={{color: 'inherit', textDecoration: 'none'}}>
            <img 
              src={profilePic ? profilePic : defaultUserPic} 
              alt="person image"
              style={{width: 25, height: 25, paddingLeft: 0, borderRadius: 7, objectFit: 'cover'}}
            /> 
            
          </Link>
        </Grid>
        <Grid item>
          <Typography style={{paddingTop: 2, fontSize: 14, paddingLeft: 6, fontFamily: `'Roboto Slab', 'serif'`, color: '#000000'}} >
            <Link to={`/profile/@${authorUsername}`} style={{color: 'inherit', textDecoration: 'none'}}>
              {authorName && authorName}
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ overflow: 'hidden'}}>
        <Grid item lg={8} md={8} sm={8} xs={8} style={{paddingRight: 30, overflowWrap: 'break-word'}}>
          <Typography style={{fontSize: 25, fontFamily: `'Lato', 'sans-serif'`, color: 'rgb(35,35,35)', lineHeight: 1.1, paddingBottom: 7}} className="smallPostTitle">
            <Link to={`/blog/${post._id}`} style={{color: 'inherit', textDecoration: 'none'}}>
              {post.title}
            </Link>
          </Typography>
          <Hidden smDown>
            <Typography className='homePostDiscription' style={{color: 'rgb(117,117,117)', fontFamily: `'Raleway', 'sans-serif'`, fontSize: 18, letterSpacing: 0.5, lineHeight: 1.2}}>
              {post.desc}
            </Typography>
          </Hidden>
          <Grid justifyContent='space-between' container style={{paddingTop: 10}}>
            <Grid item>
              <Typography style={{color: 'rgb(117,117,117)', fontFamily: `'Roboto Slab', 'serif'`, fontSize: 15}}>
                {new Date(post.createdAt).toDateString()}
              </Typography>
            </Grid>
            <Grid item style={{paddingTop: 6, fontSize: 17}}>
              <Grid container>
                <Grid item>
                  <Link to={`/blog/${post._id}`} style={{color: 'inherit', textDecoration: 'none'}}>
                    {
                      user && post.likes.indexOf(user._id)>-1 
                      ? <i className="fas fa-heart" style={{color: 'rgb(219, 61, 61)', float: 'left', paddingRight: 5}}></i>
                      : <i className="far fa-heart" style={{color: 'rgb(117,117,117)', float: 'left', paddingRight: 5}}></i>
                    }
                    
                    <Typography style={{color: 'rgb(87,87,87)', float: 'right', lineHeight: 1.2, fontSize: 16}}>
                      {post.likes.length} likes
                    </Typography>
                  </Link>
                </Grid>
                <Grid item style={{paddingLeft: 35}}>
                  <div onClick={handleBookmark} className={classes.bookmarkBtn}>
                    {
                      isBookmarked ?
                      <i className="fas fa-bookmark" style={{color: 'rgb(26,136,22)'}}></i> :
                      <i className="far fa-bookmark" style={{color: 'rgb(77,77,77)'}}></i>
                    }
                  </div>
                </Grid>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <Link to={`/blog/${post._id}`} style={{color: 'inherit', textDecoration: 'none'}}>
            {
              post.img &&
              <img 
                src={post.img}
                alt="blog-post-image" 
                style={{ width:'100%', height: 141, borderRadius: 4}}
              />
            }
          </Link>
        </Grid>
        
        <div style={{paddingTop: 15}}>
          <CategoryTags categories={post.tags}/>
        </div>
      </Grid>
    </div>
  );
}

export default Post
