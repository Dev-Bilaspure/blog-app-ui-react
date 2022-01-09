import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Post from '../Post/Post';

const useStyle = makeStyles({
  paper: {
    // background: 'rgb(255, 249, 242)',
    // padding: 20
  }
})

const Posts = () => {
  const { paper } = useStyle();
  const arr = [1,2,3,4,5,6,7,8,9,10];
  return (
    <Grid container>
      {
        arr.map(ele => (
          <Grid item lg={6} md={6} xs={12} sm={12}>
            <Post id={ele}/>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default Posts
