import { Box, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RelatedPost from '../RelatedPost/RelatedPost'
import CircularProgress from '@mui/material/CircularProgress';

const RelatedPosts = ({categories, postID}) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    const fetchRelatedPosts = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/posts/tagsarray/withgiventags`,
          {tagsArray: categories}
        ).then(res => {
          setRelatedPosts(res.data);
          setIsFetching(false);
        }).catch(err => {
          console.log(err);
          setIsFetching(false);
        })
      } catch(error) {
        console.log(error);
        setIsFetching(false);
      }
    }
    fetchRelatedPosts();
  }, [])
  return (
    <Box>
      {
        isFetching ?
        <div style={{textAlign: 'center'}}>
          <CircularProgress color="success" />
        </div>:
        (relatedPosts.length ?
        relatedPosts.map(post => (
          post._id!==postID &&
            <RelatedPost post={post} />
        )) :
        <div style={{textAlign: 'center'}}>
          <Typography style={{fontFamily: `'Raleway', 'sans-serif'`, color: 'rgb(90,90,90)'}}>
            No posts found
          </Typography>
        </div>)
      }
    </Box>
  )
}

export default RelatedPosts
