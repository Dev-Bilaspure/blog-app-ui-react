import { Box } from '@material-ui/core'
import React from 'react'
import RelatedPost from '../RelatedPost/RelatedPost'

const RelatedPosts = () => {
  const posts = [1,2,3,4,5,6,7,8,9,10]
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
