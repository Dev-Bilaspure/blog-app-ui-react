import { makeStyles, Button } from '@material-ui/core';
import { Grid, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Categories from '../../components/Categories/Categories';
import Post from '../../components/Post/Post';
import './tagpageStyle.css'
import categoriesArray from './../../constants/categories'
import TagsRightSidebar from '../../components/TagsRightSidebar/TagsRightSidebar';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const useStyle = makeStyles({
  tagIconStyle: {
    fontSize: 20, 
    background: '#E6E6E6', 
    marginTop: 19, 
    padding: 7, 
    paddingRight: 8, 
    paddingLeft: 8, 
    paddingBottom: 3, 
    borderRadius: 100, 
    marginRight: 5
  },
  browseRecommendedBtn: {
    paddingLeft: 20, 
    paddingRight: 20, 
    background: 'rgb(26,137,23)', 
    color: '#fff', 
    borderRadius: 100, 
    textTransform: 'none', 
    boxShadow: 'none', 
    margin: 'auto',
    '&:hover': {
      background: 'rgb(26,137,23)', 
      color: '#fff', 
    }
  }
})
const TagPage = () => {
  const classes = useStyle();
  const {category} = useParams();
  const location = useLocation();
  const tagName = location.pathname.split(('/'))[2];
  const [tagRelatedPosts, setTagRelatedPosts] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    const fetchTagRelatedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${tagName}/tag`
        ).then(res => {
          setTagRelatedPosts(res.data);
          setIsFetching(false);
          // console.log(res.data);
        }).catch(err => {
          console.log(err);
          setIsFetching(false);
        })
      } catch(error) {
        console.log(error);
        setIsFetching(false);
      }
    }
    fetchTagRelatedPosts();
  }, [tagName])
  const categoryText = category[0].toUpperCase()+category.slice(1)
  return(
    <div className='tagpage-wrapper'>
      <Grid container>
        <Grid item lg={8} md={9} sm={12} xs={12}>
          <div style={{paddingTop: 30}}>
            <Grid container>
              <Grid item lg={1} md={1} sm={12} xs={12}>

              </Grid>
              <Grid item lg={10} md={10} sm={12} xs={12}  style={{paddingLeft: 15}}>
                <div style={{borderBottom: '1px solid #E6E6E6', paddingBottom: 20}}>
                  <Grid container>
                    <Grid item>
                      <div className={classes.tagIconStyle}>
                        <i class="fas fa-tag reverseTagIcon"></i>
                      </div>
                    </Grid>
                    <Grid item>
                      <Typography style={{paddingLeft: 5, fontFamily: `'Outfit', 'sans-serif'`, fontSize: 45, color: 'rgb(31,31,31)', wordBreak: 'break-all'}}>
                        {categoryText}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <div style={{paddingTop: 50}}>
                  {
                    isFetching ? 
                    <div style={{textAlign: 'center'}}>
                      <CircularProgress color="inherit" />
                    </div> :
                    (categoriesArray.indexOf(category)>-1 ?
                    <CategoryRelatedPosts 
                      tagRelatedPosts={tagRelatedPosts} 
                      categoryText={categoryText}
                    /> :
                    <div style={{width: 111, margin: 'auto'}}>
                      <Typography style={{color: 'rgb(81,81,81)', fontSize: 19, fontWeight: 'bold'}}>
                        No such tag
                      </Typography>
                    </div>)
                  }
                  
                </div>
              </Grid> 
              <Grid item lg={1} md={1} sm={12} xs={12}>
                
              </Grid>
            </Grid>
          </div> 
        </Grid>
        <Grid item lg={4} md={3} sm={12} xs={12}  style={{borderLeft: '1px solid #E6E6E6', paddingLeft: 0}}>
          <div style={{ paddingTop: 40, paddingLeft: 20}}>
            <Grid container>
              <Grid item lg={1} md={0} sm={12} xs={12}>
                {/* Empty */}
              </Grid>
              <Grid item lg={10} md={12} sm={12} xs={12}>
                <TagsRightSidebar />
              </Grid> 
              <Grid item lg={1} md={0} sm={12} xs={12}>
                {/* Empty */}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div> 
  );
};



const CategoryRelatedPosts = ({tagRelatedPosts, categoryText}) => {
  const classes = useStyle();
  const navigate = useNavigate();
  return(

    <div>
      {
        tagRelatedPosts.length
        ? tagRelatedPosts.map(post => {
          console.log(post);
          return(<Post post={post}/>)
        })
        :
        <div style={{width: '60%', margin: 'auto'}}>
          <Typography style={{color: 'rgb(51,51,51)', fontSize: 17}}>
            No story available for "{categoryText}" tag yet
          </Typography>
          <div style={{width: 237, margin: 'auto', marginTop: 30}}>
            <Button variant='contained' className={classes.browseRecommendedBtn} onClick={() => {navigate('/')}}>
              Browse recommended stories
            </Button> 
          </div>
        </div>
      }
    </div>
  );
}

export default TagPage;
