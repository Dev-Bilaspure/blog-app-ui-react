import { Box, Button, Paper, Typography  } from '@material-ui/core'
// import { Item } from "@mui/material"
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import categoriesArray from '../../constants/categories'

const useStyles = makeStyles({
  categoryButtons: {
    marginRight: 18,
    marginBottom: 18,
    textTransform: 'none',
    paddingRight: 15,
    paddingLeft: 15,
    background: 'rgb(232,232,232)',
    borderRadius: 100,
    boxShadow: 'none'
  }
})
const Categories = () => {
  const{ categoryButtons } = useStyles();
  const navigate = useNavigate();
  return (
    <div>
      {/* <Typography style={{fontSize: 20, fontWeight: 'bold', borderBottom: '1px solid #E6E6E6', marginBottom :60, paddingBottom: 8}}>
        Tags
      </Typography> */}
      {
        categoriesArray.map(cat => (
            <Button 
              variant="contained" 
              size="large" 
              className={categoryButtons}
              onClick={() => {
                navigate(`/tag/${cat.toLowerCase()}`);
              }}
            >
              {cat[0].toUpperCase()+cat.slice(1)}
            </Button>
        ))
      }
    </div>
  )
}

export default Categories
