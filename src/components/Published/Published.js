import React, {useEffect, useState} from 'react';
import {Typography} from '@mui/material';
import { Link } from 'react-router-dom';


const Published = () => {
  const publishedPosts = [1,2,3,4,5,6,7]
  return(
    <div>
      {
        publishedPosts.length
        ? publishedPosts.map(publishedPost => (
            <PublishedPost key={publishedPost} />
          ))
        : 
          <div style={{width: 351, margin: 'auto'}}>
            <Typography style={{color: 'rgb(81,81,81)', fontSize: 19, fontWeight: 'bold'}}>
              You haven't published any stories yet.
            </Typography>
          </div>
      }
    </div>
  );
}


const PublishedPost = () => {
  const title = 'Untitled Story in the house';
  const description = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat quasi doloribus vero nemo quo tempore alias placeat reiciendis minus cum?`
  const words = 10;
  return(
    <div style={{overflowWrap: 'break-word', marginBottom: 50}}>
      <div style={{paddingBottom: 15, borderBottom: '1px solid #E6E6E6'}}>
        <Link to='/blog/1' style={{color: 'inherit', textDecoration: 'none'}}>
          <Typography style={{  fontSize: 18, color: 'rgb(41,41,41)', fontFamily: `'Outfit', 'sans-serif'`}}>
            {title}
          </Typography>
          {
            description &&
            <Typography style={{ fontFamily: `'Nunito Sans', 'sans-serif'`, fontSize: 17, paddingTop: 2, paddingBottom: 2, color: 'rgb(117,117,117)'}}>
              {description}
            </Typography>
          }
        </Link>
        
        <Typography style={{paddingTop: 10, color: 'rgb(117,117,117)', fontWeight: 'medium', fontSize: 15, fontFamily: `'Cabin', 'sans-serif'`}}>
          Published on 10 Jan 2022. {words} {words===1 ? 'word': 'words'} so far.
        </Typography>
      </div>
    </div>
  );
}

export default Published;