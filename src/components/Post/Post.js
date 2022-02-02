import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import './postStyle.css';
import React, {useEffect, useState} from 'react'
import { Grid, Hidden } from '@mui/material';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { CategoryTags } from '../../Pages/Blog/Blog';
import axios from 'axios';

const useStyles = makeStyles({
  bookmarkBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
})

const Post = ({user, postObj}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const postCategories = ['Life', 'Education', 'Technology', 'Science']
  const personImg = 'https://miro.medium.com/fit/c/131/131/2*1L5DSsWtYoQVm1TxThM4vQ.jpeg';
  const blogImg = `https://miro.medium.com/max/1400/1*TVd_sNhpc7JDPBHAsAOQZg.jpeg`;
  const postTitle = '8 Free Websites Every Content Creator Needs to Know'
  const authorName = 'Dev Bilaspure'
  const postDiscription = 'Lorem dolor sit amet consectetur adipisicing elit. Harum totam iste esse eius placeat consequuntur laborum eveniet iusto nihil rerum reprehenderit, explicabo culpa, amet quidem necessitatibus. Aut consectetur rem, fuga corporis doloribus fugit tempore, modi perferendis, deserunt ea necessitatibus corrupti officiis temporibus nisi? Accusamus dolorum voluptates fugiat cupiditate laborum vel!'
  const likesCnt = 60;
  const [author, setAuthor] = useState({})
  const handleBookmark = () => {
    if(!user)
      navigate('/signin', {state: {from: location}});
    setIsBookmarked(!isBookmarked)
  }
  console.log(author);
  return(
    <div style={{marginBottom: 70}}>
      <Grid container style={{paddingBottom: 7}}>
        <Grid item>
          <Link to='/profile' style={{color: 'inherit', textDecoration: 'none'}}>
            <img 
              src={personImg} 
              alt="person image"
              style={{width: 25, height: 25, paddingLeft: 0, borderRadius: 7, objectFit: 'cover'}}
              onClick={() => {navigate(`/user/@${author.username}`)}}
            /> 
          </Link>
        </Grid>
        <Grid item>
          <Typography style={{paddingTop: 2, fontSize: 14, paddingLeft: 6, fontFamily: `'Roboto Slab', 'serif'`, color: '#000000'}} >
            <Link to='/profile' style={{color: 'inherit', textDecoration: 'none'}}>
              {authorName}
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ overflow: 'hidden'}}>
        <Grid item lg={8} md={8} sm={8} xs={8} style={{paddingRight: 30, overflowWrap: 'break-word'}}>
          <Typography style={{fontSize: 25, fontFamily: `'Lato', 'sans-serif'`, color: 'rgb(35,35,35)', lineHeight: 1.1, paddingBottom: 7}}>
            <Link to='/blog/1' style={{color: 'inherit', textDecoration: 'none'}}>
              {postTitle}
            </Link>
          </Typography>
          <Hidden smDown>
            <Typography className='homePostDiscription' style={{color: 'rgb(117,117,117)', fontFamily: `'Raleway', 'sans-serif'`, fontSize: 18, letterSpacing: 0.5, lineHeight: 1.2}}>
              {postDiscription}
            </Typography>
          </Hidden>
          <Grid justifyContent='space-between' container style={{paddingTop: 10}}>
            <Grid item>
              <Typography style={{color: 'rgb(117,117,117)', fontFamily: `'Roboto Slab', 'serif'`, fontSize: 15}}>
                Jan 23 2022
              </Typography>
            </Grid>
            <Grid item style={{paddingTop: 6, fontSize: 17}}>
              <Grid container>
                <Grid item>
                  <Link to='/blog/1' style={{color: 'inherit', textDecoration: 'none'}}>
                    <i className="far fa-heart" style={{color: 'rgb(117,117,117)', float: 'left', paddingRight: 5}}></i>
                    <Typography style={{color: 'rgb(117,117,117)', float: 'right', lineHeight: 1.2}}>{likesCnt}</Typography>
                  </Link>
                </Grid>
                <Grid item style={{paddingLeft: 35}}>
                  <div onClick={handleBookmark} className={classes.bookmarkBtn}>
                    {
                      isBookmarked ?
                      <i className="fas fa-bookmark" style={{color: 'rgb(26,136,22)'}}></i> :
                      <i className="far fa-bookmark" style={{color: 'rgb(117,117,117)'}}></i>
                    }
                  </div>
                </Grid>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <Link to='/blog/1' style={{color: 'inherit', textDecoration: 'none'}}>
            <img 
              src={blogImg}
              alt="blog-post-image" 
              style={{ width:'100%', height: '100%'}}
            />
          </Link>
        </Grid>
        
        <div style={{paddingTop: 15}}>
          <CategoryTags categories={postCategories}/>
        </div>
      </Grid>
    </div>
  );
}

export default Post
