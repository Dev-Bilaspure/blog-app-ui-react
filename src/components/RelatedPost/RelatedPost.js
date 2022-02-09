import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import {Link} from 'react-router-dom'

const PF = 'http://localhost:5000/images/'


const useStyle = makeStyles({
  container: {
    height: 65,
    marginBottom: 20
  },
  title: {
    
    color: 'rgb(19,19,19)', 
    fontSize: 15, 
    lineHeight: 1.3, 
    fontFamily: `'Raleway', 'sans-serif'` ,

    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  }
})
const RelatedPost = ({post}) => {
  const classes = useStyle();
  const title = 'Lorem ipsum, dolor sit amet cenda dolorum nostrum nihil dicta?';
  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item lg={3}  md={3} sm={2} xs={2}>
          <Link to={`/blog/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <img 
              src={post.img && PF+post.img} 
              alt="blog-post-image" 
              style={{ width: '100%', height: 58, borderRadius: 5}}
            />
          </Link>
        </Grid>
        <Grid item lg={9}  md={9} sm={10} xs={10}>
          <Box style={{ height: 65, marginLeft: 7}}>
            <Link to={`/blog/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <Typography className={classes.title} >
                {post.title} 
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default RelatedPost
