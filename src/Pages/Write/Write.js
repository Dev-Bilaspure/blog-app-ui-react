import { Typography, Grid, TextareaAutosize, Button, Chip, Hidden } from '@material-ui/core'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PublishIcon from '@mui/icons-material/Publish';
import React, { useEffect, useState, useContext } from 'react'
import useStyle from './writeStyles';
import Box from '@mui/material/Box';
import axios from 'axios';
import {UserContext} from './../../context/UserContext'
import './writeStyle.css';
import SelectedCategory from '../../components/SelectCategory/SelectCategory';
import {useLocation, useNavigate} from 'react-router-dom';


const Write = () => {
  const classes = useStyle();
  const {user} = useContext(UserContext)
  const location = useLocation();
  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [blogImg, setBlogImg] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [fileInputState, setFileInputState] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [oldBlogImg, setOldBlogImg] = useState('');

  const [publishError, setPublishError] = useState(false);

  useEffect(() => {
    if(location.state) {
      if(location.state.oldPostId) {
        setTitle(location.state.oldPostTitle);
        setDiscription(location.state.oldPostDesc);
        setSelectedCategories(location.state.oldPostCategories);
        setOldBlogImg(location.state.oldPostImg);
      }
    }
  }, [])

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setImagePreview(reader.result);
    };
  }

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    setBlogImg(file);
    previewFile(file);
    setFileInputState(e.target.value);
  }

  const publishNewPost = async(postObj) => {
    const uploadPostNow = async(postObj) => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/posts/publish`,
          postObj
        ).then(res => {
          navigate('/published');
        })
      } catch(error) {
        console.log(error);
      }
    }
    if(blogImg) {
      const reader = new FileReader();
      reader.readAsDataURL(blogImg);
      reader.onloadend = async() => {
          // console.log(reader.result);
          try {
            await axios.post(
              'http://localhost:5000/api/upload',
              {base64EncodedImage: reader.result}
            ).then(res => {
              console.log(res.data.imageURL)
              postObj.img = res.data.imageURL;
              uploadPostNow(postObj);
            })
          } catch (err) {
              console.error(err);
          }
      };
      reader.onerror = () => {
          console.error('AHHHHHHHH!!');
      };
    }
    else {
      uploadPostNow(postObj);
    }
  }
  const updateAndPublishOldPost = async(postObj) => {
    const uploadPostNow = async(postObj) => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/posts/publish`,
          postObj
        ).then(res => {
          navigate('/published');
        })
      } catch(error) {
        console.log(error);
      }
    }
    if(blogImg) {
      const reader = new FileReader();
      reader.readAsDataURL(blogImg);
      reader.onloadend = async() => {
          // console.log(reader.result);
          try {
            await axios.post(
              'http://localhost:5000/api/upload',
              {base64EncodedImage: reader.result}
            ).then(res => {
              console.log(res.data.imageURL)
              postObj.img = res.data.imageURL;
              uploadPostNow(postObj);
            })
          } catch (err) {
              console.error(err);
          }
      };
      reader.onerror = () => {
          console.error('AHHHHHHHH!!');
      };
    }
    else {
      uploadPostNow(postObj);
    }
  }
  const draftNewPost = async(postObj) => {
    const uploadPostNow = async(postObj) => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/posts/publish`,
          postObj
        ).then(res => {
          navigate('/draft');
        })
      } catch(error) {
        console.log(error);
      }
    }
    if(blogImg) {
      const reader = new FileReader();
      reader.readAsDataURL(blogImg);
      reader.onloadend = async() => {
          // console.log(reader.result);
          try {
            await axios.post(
              'http://localhost:5000/api/upload',
              {base64EncodedImage: reader.result}
            ).then(res => {
              console.log(res.data.imageURL)
              postObj.img = res.data.imageURL;
              uploadPostNow(postObj);
            })
          } catch (err) {
              console.error(err);
          }
      };
      reader.onerror = () => {
          console.error('AHHHHHHHH!!');
      };
    }
    else {
      uploadPostNow(postObj);
    }
  }
  const updateAndDraftOldPost = async(postObj) => {
    const uploadPostNow = async(postObj) => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/posts/publish`,
          postObj
        ).then(res => {
          navigate('/draft');
        })
      } catch(error) {
        console.log(error);
      }
    }
    if(blogImg) {
      const reader = new FileReader();
      reader.readAsDataURL(blogImg);
      reader.onloadend = async() => {
          // console.log(reader.result);
          try {
            await axios.post(
              'http://localhost:5000/api/upload',
              {base64EncodedImage: reader.result}
            ).then(res => {
              console.log(res.data.imageURL)
              postObj.img = res.data.imageURL;
              uploadPostNow(postObj);
            })
          } catch (err) {
              console.error(err);
          }
      };
      reader.onerror = () => {
          console.error('AHHHHHHHH!!');
      };
    }
    else {
      uploadPostNow(postObj);
    }
  }

  const handlePublishClick = () => {
    const postObj = {
      userId: user._id,
      title,
      desc: discription,
      tags: selectedCategories
    }
    setPublishError(false);
    if(title!=='' && discription!=='') {
      if(location.state) {
        if(location.state.oldPostId)
          updateAndPublishOldPost(postObj);
      }
      else
        publishNewPost(postObj);
    }
    else  
      setPublishError(true);
  }

  const handleDraftClick = () => {
    const postObj = {
      userId: user._id,
      title,
      desc: discription,
      tags: selectedCategories
    }
    if(location.state) {
      if(location.state.oldPostId)
        updateAndDraftOldPost(postObj);
    }
    else
      draftNewPost(postObj);
  }
  return (
    <Box className='writeWrapper'>
      <Grid container style={{marginTop: 10, padding: 20, paddingRight: 0, marginBottom: 70, paddingLeft: 10}}>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Hidden smDown>
            <div  style={{  marginTop: 5, paddingTop: 20, paddingBottom: 20, width: 201, marginLeft: 25, borderRadius: 5}}>
              <PublishOrDraft handlePublishClick={handlePublishClick} handleDraftClick={handleDraftClick} publishError={publishError}/>
            </div>
          </Hidden>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} style={{width: '100%', paddingRight: 10, paddingBottom: 20,marginBottom: 40, borderBottom: '1px solid rgb(327, 327, 327)'}} >
          <TextareaAutosize 
            placeholder='Title' 
            className={classes.titleField} 
            value={title} onChange={e => setTitle(e.target.value)}
          />
          <Box style={{marginTop: 30}}>
            {
              blogImg ?  
                <img 
                  src={imagePreview}
                  alt="blog-post-image" 
                  style={{objectFit: 'cover', width: '100%', marginBottom: 15, borderRadius: 5}}
                /> :
              (
                oldBlogImg &&
                <img 
                  src={oldBlogImg}
                  alt="blog-post-image" 
                  style={{objectFit: 'cover', width: '100%', marginBottom: 15, borderRadius: 5}}
                />
              )

            }
            <Grid container>
              <Grid item>
                <label htmlFor='fileInput'>
                  <AddOutlinedIcon className={classes.imageUploadButtonIcon} style={{fontSize: 38}}/>
                </label>
              </Grid>
              <Grid item className={classes.addOrChangeImg}>
                {(blogImg || oldBlogImg.length) ? 'Change Image' : 'Add Image'}
              </Grid>
            </Grid>
            <input 
              type='file' 
              id='fileInput' 
              className={classes.imageUploadButton}
              onChange={handleSelectImage}
              value={fileInputState}
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
          <RightSideBar 
            selectedCategories={selectedCategories} 
            setSelectedCategories={setSelectedCategories} 
            handlePublishClick={handlePublishClick} 
            handleDraftClick={handleDraftClick}
            publishError={publishError}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
const AddCategories = ({selectedCategories, setSelectedCategories}) => {
  
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
        Add a tag: 
        <Typography style={{paddingTop: 4, fontSize: 15}}>
          Add or change tags (up to 4) so readers know what your story is about
        </Typography>
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
const PublishOrDraft = ({handlePublishClick, handleDraftClick, publishError}) => {
  return(
    <div>
      <Box style={{marginBottom: 30, paddingLeft: 0, overflowWrap: 'break-word', wordWrap: 'break-word'}}>
        <Button 
          variant="contained" 
          startIcon={<PublishIcon />} 
          style={{width: 160, color: '#ffff', background: 'rgb(26,136,22)', textTransform: 'none', borderRadius: 100}}
          onClick={handlePublishClick}
        >
          Publish
        </Button>
        {
          publishError &&
          <Typography style={{fontSize: 13, paddingLeft: 8, color: 'rgb(244,66,55)', width: 160, paddingTop: 10}}>
            Story with empty title or description cannot be published. 
            <div style={{paddingTop: 5}}>
              You can always save changes you make on your stories to draft.
            </div> 
          </Typography>
        }
        
      </Box>
          <br/>
      <Box style={{ paddingTop: 0, paddingLeft: 0}}>
        <Button 
          variant="contained" 
          startIcon={<SaveAsIcon />}
          style={{width: 160, color: '#fff', background: 'rgb(133, 133, 133)', textTransform: 'none', borderRadius: 100}}
          onClick={handleDraftClick}
        >
          Save To Drafts
        </Button>
      </Box>
    </div>
  );
}
const RightSideBar = ({selectedCategories, setSelectedCategories,  handlePublishClick, handleDraftClick, publishError}) => {
  const classes = useStyle();
  return(
    <Box className={classes.rightSideBar}>
      <Box style={{paddingTop: 0}}>
        <div style={{ marginBottom: 40, borderBottom: '1px solid rgb(227, 227, 228)', paddingBottom: 35}}>
          <AddCategories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
        </div>
        <Hidden mdUp>
          <div style={{ paddingTop: 20, paddingBottom: 20, width: 201, marginLeft: 0, borderRadius: 5}}>
            <PublishOrDraft  handlePublishClick={handlePublishClick} handleDraftClick={handleDraftClick} publishError={publishError}/>
          </div>
        </Hidden>
      </Box>
    </Box>
  );
}

export default Write
