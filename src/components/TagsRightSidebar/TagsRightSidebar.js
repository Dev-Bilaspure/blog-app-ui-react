import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Categories from '../Categories/Categories';

const useStyle = makeStyles({
  tagsHeading: {
    fontFamily: `'Outfit', 'sans-serif'`, 
    fontSize: 25, 
    fontWeight: 'bold', 
    borderBottom: '1px solid #E6E6E6', 
    marginBottom: 50, 
    paddingBottom: 8
  }
})
const TagsRightSidebar = () => {
  const classes = useStyle();
  return(
    <div>
      <div>
        <Typography className={classes.tagsHeading}>
          Tags
        </Typography>
      </div>
      <Categories />
    </div>
  );
}

export default TagsRightSidebar;