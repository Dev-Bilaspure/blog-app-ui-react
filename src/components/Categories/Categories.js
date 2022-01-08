import { Box, Button, Paper, Typography  } from '@material-ui/core'
// import { Item } from "@mui/material"
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import categoriesArray from '../../constants/categories'

const useStyles = makeStyles({
  paper: {
    borderRadius: 10,
    padding: 25,
    paddingRight: 0,
    paddingBottom: 10,
    // background: 'rgb(255, 249, 242)',
    paddingLeft: 20,
    paddingTop: 20
  },
  categoryButtons: {
    marginRight: 15,
    marginBottom: 15,
    textTransform: 'none',
    paddingRight: 12,
    paddingLeft: 12,
    background: '#fff'
  }
})
const Categories = () => {
  const{ paper, categoryButtons } = useStyles();
  return (
    <Box style={{paddingRight: 10, paddingLeft: 10, marginBottom: 30}}>
      <Paper elevation={2} className={paper}>
        <Typography variant='h5' style={{marginBottom: 20, fontFamily: `'Roboto Slab', 'serif'`}}>Categories:</Typography>
        <Button variant="outlined" size="large" className={categoryButtons}>All Categories</Button>
        {
          categoriesArray.map(cat => (
              <Button variant="outlined" size="large" className={categoryButtons}>{cat}</Button>
          ))
        }
      </Paper>
    </Box>
  )
}

export default Categories
