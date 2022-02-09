import { Box } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RelatedPost from '../RelatedPost/RelatedPost'

const RelatedPosts = ({categories}) => {
  const [posts, setPosts] = useState([1,2,3,4,5,6])
  // useEffect(() => {
  //   const fetchRelatedPosts = async () => {
  //     try {
  //       const response = await axios.get(
  //         ``
  //       )
  //     } catch(error) {
  //       console.log(error);
  //     }
  //   }
  // })
  return (
    <Box>
      {
        posts.map(post => (
          <RelatedPost key={post} />
        ))
      }
    </Box>
  )
}

export default RelatedPosts
