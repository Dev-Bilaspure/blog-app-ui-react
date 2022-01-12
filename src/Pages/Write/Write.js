import { Box, Typography, Grid, TextareaAutosize, Button } from '@material-ui/core'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PublishIcon from '@mui/icons-material/Publish';
import React, { useState } from 'react'
import useStyle from './writeStyles';


const Write = () => {
  const classes = useStyle();
  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const blogImg = `https://miro.medium.com/max/1400/1*TVd_sNhpc7JDPBHAsAOQZg.jpeg`;
  return (
    <Grid container style={{marginTop: 10, padding: 20, paddingRight: 0, marginBottom: 120}}>
      <Grid item lg={3} md={3} sm={12} xs={12}>

      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12} style={{width: '100%', paddingRight: 20}} >
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
        <Box style={{marginTop: 30}}>
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
      <Grid item lg={3}  md={3} sm={12} xs={12}>
        <RightSideBar />
      </Grid>
    </Grid>
  )
}

const RightSideBar = () => {
  const classes = useStyle();
  return(
    <Box className={classes.rightSideBar}>
      <Box style={{paddingTop: 20, width: 210}}>
        <Box style={{marginBottom: 8, paddingLeft: 0}}>
          <Button 
            variant="contained" 
            startIcon={<PublishIcon />} 
            style={{width: 180, color: '#ffff', background: '#2bc226'}}
          >
            Publish
          </Button>
        </Box>
        <br/>
        <Box style={{borderTop: '1px solid rgb(227, 227, 228)', paddingTop: 23, paddingLeft: 0}}>
          <Button 
            variant="contained" 
            startIcon={<SaveAsIcon />} 
            style={{width: 180, color: '#fff', background: 'rgb(133, 133, 133)'}}
          >
            Save To Draft
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Write
