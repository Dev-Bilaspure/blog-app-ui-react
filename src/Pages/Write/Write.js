import { Typography, Grid, TextareaAutosize, Button, Chip, Hidden } from '@material-ui/core'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PublishIcon from '@mui/icons-material/Publish';
import React, { useEffect, useState } from 'react'
import useStyle from './writeStyles';
import Box from '@mui/material/Box';

import './writeStyle.css';
import SelectedCategory from '../../components/SelectCategory/SelectCategory';
const Write = () => {
  const classes = useStyle();
  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const blogImg = `https://miro.medium.com/max/1400/1*TVd_sNhpc7JDPBHAsAOQZg.jpeg`;
  return (
    <Box className='writeWrapper'>
      <Grid container style={{marginTop: 10, padding: 20, paddingRight: 0, marginBottom: 70, paddingLeft: 10}}>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Hidden smDown>
            <div  style={{  marginTop: 5, paddingTop: 20, paddingBottom: 20, width: 201, marginLeft: 25, borderRadius: 5}}>
              <PublishOrDraft />
            </div>
          </Hidden>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} style={{width: '100%', paddingRight: 10, paddingBottom: 20,marginBottom: 40, borderBottom: '1px solid rgb(227, 227, 228)'}} >
          <TextareaAutosize 
            placeholder='Title' 
            className={classes.titleField} 
            value={title} onChange={e => setTitle(e.target.value)}
          />
          <Box style={{marginTop: 30}}>
            {
              blogImg 
              &&  <img 
                    src={blogImg}
                    alt="blog-post-image" 
                    style={{objectFit: 'cover', width: '100%', marginBottom: 15}}
                  />
            }
            <Grid container>
              <Grid item>
                <label htmlFor='fileInput'>
                  <AddOutlinedIcon className={classes.imageUploadButtonIcon} style={{fontSize: 38}}/>
                </label>
              </Grid>
              <Grid item className={classes.addOrChangeImg}>
                {blogImg ? 'Change Image' : 'Add Image'}
              </Grid>
            </Grid>
            <input 
              type='file' 
              id='fileInput' 
              className={classes.imageUploadButton}
            />
          </Box>
          <Box style={{marginTop: 10}}>
            <Box className={classes.wordCount}>
              { discription ? discription.split(' ').length : discription.length} Words
            </Box>
            <TextareaAutosize 
              placeholder='Tell your story...' 
              className={classes.discriptionField} 
              value={discription} 
              onChange={e => setDiscription(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item lg={3}  md={3} sm={12} xs={12} style={{paddingLeft: 10}}>
          <RightSideBar />
        </Grid>
      </Grid>
    </Box>
  )
}
const AddCategories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fakeSelectedCategories, setFakeSelectedCategories] = useState([]);
  useEffect(() => {
    if(fakeSelectedCategories.length<5)
      setSelectedCategories(fakeSelectedCategories);
  }, [fakeSelectedCategories])
  const handleChange = (e) => {
    setFakeSelectedCategories([... e.target.value]);
  }
  console.log(selectedCategories);
  return(
    <div style={{paddingLeft: 5}}>
      <div style={{color: 'rgb(54, 54, 54)', paddingTop: 6, paddingLeft: 7, fontSize: 25, lineHeight: 1.2, paddingBottom: 20, fontFamily: `'Raleway', 'sans-serif'`}}>
        Add a tag: <Typography style={{paddingTop: 4, fontSize: 15}}>Add or change tags (up to 4) so readers know what your story is about</Typography>
      </div>
      <div style={{paddingBottom: 20, paddingTop: 10, paddingLeft: 7}}>
        {
          selectedCategories.map(selCat => (
            <Chip style={{marginRight: 5, marginBottom: 10}} label={selCat} variant="outlined" onDelete={e => {
              setSelectedCategories(selectedCategories.filter(cat => cat!==selCat));
            }} />
          ))
        }
      </div>
      <div style={{marginRight: 30, paddingLeft: 0, marginLeft: 0}}>
        <SelectedCategory selectedCategories={selectedCategories} handleChange={handleChange}/>
      </div>
    </div>
  );
}
const PublishOrDraft = () => {
  return(
    <div>
      <Box style={{marginBottom: 30, paddingLeft: 0}}>
        <Button 
          variant="contained" 
          startIcon={<PublishIcon />} 
          style={{width: 160, color: '#ffff', background: 'rgb(26,136,22)', textTransform: 'none', borderRadius: 100}}
        >
          Publish
        </Button>
      </Box>
          <br/>
      <Box style={{ paddingTop: 0, paddingLeft: 0}}>
        <Button 
          variant="contained" 
          startIcon={<SaveAsIcon />}
          style={{width: 160, color: '#fff', background: 'rgb(133, 133, 133)', textTransform: 'none', borderRadius: 100}}
        >
          Save To Drafts
        </Button>
      </Box>
    </div>
  );
}
const RightSideBar = () => {
  const classes = useStyle();
  return(
    <Box className={classes.rightSideBar}>
      <Box style={{paddingTop: 0}}>
        <div style={{ marginBottom: 40, borderBottom: '1px solid rgb(227, 227, 228)', paddingBottom: 35}}>
          <AddCategories />
        </div>
        <Hidden mdUp>
          <div style={{ paddingTop: 20, paddingBottom: 20, width: 201, marginLeft: 0, borderRadius: 5}}>
            <PublishOrDraft />
          </div>
        </Hidden>
      </Box>
    </Box>
  );
}

export default Write
