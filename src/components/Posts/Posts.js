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
  return (
    <Grid container>
      <Grid item lg={6} md={6} xs={12} sm={12}>
        <Post />
      </Grid>
      <Grid item lg={6} md={6} xs={12} sm={12}>
        <Post />
      </Grid>
      <Grid item lg={6} md={6} xs={12} sm={12}>
        <Post />
      </Grid>
      <Grid item lg={6} md={6} xs={12} sm={12}>
        <Post />
      </Grid>
      <Grid item lg={6} md={6} xs={12} sm={12}>
        <Post />
      </Grid>
      <Grid item lg={6} md={6} xs={12} sm={12}>
        <Post />
      </Grid>
      <Grid item lg={6} md={6} xs={12} sm={12}>
        <Post />
      </Grid>
      <Grid item lg={6} md={6} xs={12} sm={12}>
        <Post />
      </Grid>
    </Grid>
  )
}

export default Posts
