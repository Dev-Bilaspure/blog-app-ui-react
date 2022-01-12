import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles({
  container: {
    height: 65,
    marginBottom: 20
  },
  title: {
    
    color: 'rgb(99,98,98)', 
    fontSize: 14, 
    lineHeight: 1.4, 
    fontFamily: `'Roboto Slab', 'serif'`,

    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  }
})
const RelatedPost = () => {
  const classes = useStyle();
  const title = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, deserunt assumenda dolorum nostrum nihil dicta?';
  return (
    <div class={classes.container}>
      <Grid container>
        <Grid item lg={3}  md={3} sm={2} xs={2}>
          <img 
            src="https://miro.medium.com/max/1400/1*TVd_sNhpc7JDPBHAsAOQZg.jpeg" 
            alt="blog-post-image" 
            style={{ width: '100%', height: 58}}
          />
        </Grid>
        <Grid item lg={9}  md={9} sm={10} xs={10}>
          <Box style={{ height: 65, marginLeft: 7}}>
            <Typography className={classes.title} >
              {title} 
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default RelatedPost
