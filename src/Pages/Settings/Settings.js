import React, { useState, useEffect, useContext } from 'react'
import { Button, Grid, TextareaAutosize, Typography, Hidden } from '@material-ui/core';
import WebFont from 'webfontloader';
import './settingsStyle.css'
import { Link } from 'react-router-dom';
import useStyle from './settingsStyles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {UserContext} from './../../context/UserContext'
import axios from 'axios'

const PF = 'http://localhost:5000/images/'
const defaultUserPic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

const Settings = () => {
  const {user} = useContext(UserContext);

  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newShortBio, setNewShortBio] = useState(user.shortBio);
  const [newPassword, setNewPassword] = useState('');

  

  const [emailEdit, setEmailEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [usernameEdit, setUsernameEdit] = useState(false);
  const [shortBioEdit, setShortBioEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [photoEdit, setPhotoEdit] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto']
      }
    });
  }, []);

  return (
    <div className='settingsWrapper'>
      <Grid container>
        <Grid item lg={3} md={2} sm={2} xs={12}>
          
        </Grid>
        <Grid item lg={6} md={8} sm={8} xs={12} > 
          <div style={{paddingTop: 50, paddingRight: 10, paddingLeft: 20}}>
            <div style={{paddingBottom: 10, borderBottom: '1px solid rgb(242,242,242)', marginBottom: 50}}>
              <Typography style={{fontSize: 40, fontFamily: `'Outfit', 'sans-serif'`, color: 'rgb(41,41,41)'}}>
                About you
              </Typography>
            </div>

            {/* FOR NAME */}
            <div style={{marginTop: 30, marginBottom: 80}}>
              <NameEditPart 
                setNameEdit={setNameEdit} 
                nameEdit={nameEdit} 
                newName={newName} 
                setNewName={setNewName}
              />
            </div>
            
            {/* FOR SHORT BIO */}
            <div style={{marginTop: 30, marginBottom: 80}}>
              <ShortBioPart 
                shortBioEdit={shortBioEdit}
                setShortBioEdit={setShortBioEdit}
                newShortBio={newShortBio}
                setNewShortBio={setNewShortBio}
              />
            </div>

            {/* FOR PHOTO */}
            <div style={{marginTop: 30, marginBottom: 80}}>
              <PhotoEditPart 
                photoEdit={photoEdit}
                setPhotoEdit={setPhotoEdit}
              />
            </div>

            {/* FOR USERNAME */}
            <div style={{marginTop: 30, marginBottom: 80}}>
              <UsernameEditPart 
                usernameEdit={usernameEdit}
                setUsernameEdit={setUsernameEdit}
                newUsername={newUsername}
                setNewUsername={setNewUsername}
              />
            </div>

            {/* FOR EMAIL */}
            <div style={{marginTop: 30, marginBottom: 80}}>
              <EmailEditPart 
                emailEdit={emailEdit}
                setEmailEdit={setEmailEdit}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
              />
            </div>

            {/* FOR RESET PASSWORD */}
            <div style={{marginTop: 30, marginBottom: 80}}>
              <ResetPasswordPart
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                passwordEdit={passwordEdit}
                setPasswordEdit={setPasswordEdit}
              />
            </div>
          </div>
        </Grid>
        <Grid item lg={3} md={2} sm={2} xs={12}>
          
        </Grid>
      </Grid>
    
    </div>
  )
}

const NameEditPart = ({setNameEdit, nameEdit, setNewName, newName}) => {
  const classes = useStyle();
  const {user, loginSuccess} = useContext(UserContext);

  const [nameError, setNameError] = useState(false);
  const [nameServerError, setNameServerError] = useState(false);

  const handleNameChangeSave = async() => {
    setNameServerError(false);
    setNameError(false);
    if(newName.length<=20 && newName!=='') {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/users/${user._id}`,
          {userId: user._id, name: newName}
        ).then(res => {
          console.log(res.data);
          loginSuccess(res.data);
        })
        setNameEdit(false);
      } catch(error) {
        setNameServerError(true);
        console.log(error);
      }
    } 
    else {
      setNameError(true);
    }
  }
  
  const handleNewNameOnChange = (e) => {
    if(!(e.target.value.length>21))
      setNewName(e.target.value);
  }
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 900, color: 'rgb(41,41,41)'}} >Name</Typography>
      <div style={{paddingTop: 5}}>
        <Grid justifyContent='space-between' container spacing={12} >
          <Grid item > 
            <TextareaAutosize placeholder='Name' readOnly={!nameEdit} onChange={handleNewNameOnChange} value={newName} className={classes.nameField}/>
            <Typography style={{marginTop: 18,width: '440px', fontSize: 13, color: 'rgb(59, 59, 59)', marginBottom: 20}}>
              Your name appears on your <Link style={{color: 'inherit'}} to='/profile'>Profile</Link> page, as your byline, and in your responses. 
              <div style={{color: nameError ? 'rgb(244,66,55)' : 'rgb(59, 59, 59)'}}>
                It is a required field. Max 20 character.
              </div>
              {
                nameServerError &&
                <div style={{color: 'rgb(244,66,55)'}}>
                  Something went wrong. Please try again.
                </div>
              }
            </Typography>
            <Hidden mdUp>
              <NamePartButtonSet 
                setNameEdit={setNameEdit}
                nameEdit={nameEdit}
                setNewName={setNewName}
                setNameError={setNameError}
                setNameServerError={setNameServerError}
                handleNameChangeSave={handleNameChangeSave}
              />
            </Hidden>
          </Grid>
          <Grid item >
            <Hidden smDown>
              <NamePartButtonSet 
                setNameEdit={setNameEdit}
                nameEdit={nameEdit}
                setNewName={setNewName}
                setNameError={setNameError}
                setNameServerError={setNameServerError}
                handleNameChangeSave={handleNameChangeSave}
              />
            </Hidden>
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
const NamePartButtonSet = ({setNameEdit, nameEdit, setNewName, setNameError, setNameServerError, handleNameChangeSave}) => {
  const classes = useStyle();
  const {user} = useContext(UserContext);
  return(
    <div>
      {
        !nameEdit
        ? <Button variant='outlined' className={classes.editBtn} onClick={e => {setNameEdit(true)}}>
            Edit
          </Button>
        : <Grid container>
            <Grid item>
              <Button variant='outlined' onClick={handleNameChangeSave} className={classes.saveBtn}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                setNewName(user.name);
                setNameEdit(false);
                setNameError(false);
                setNameServerError(false);
              }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
      }
    </div>
  );
}

const ShortBioPart = ({ shortBioEdit, setShortBioEdit, newShortBio, setNewShortBio}) => {
  const classes = useStyle();
  const {user, loginSuccess} = useContext(UserContext);

  const [shortBioServerError, setShortBioServerError] = useState(false);

  const handleShortBioChangeSave = async() => {
    setShortBioServerError(false);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        {userId: user._id, shortBio: newShortBio}
      ).then(res => {
        console.log(res.data);
        loginSuccess(res.data);
      })
      setShortBioEdit(false);
    } catch(error) {
      console.log(error);
      setShortBioServerError(true);
    }
  }

  const handleShortBioOnChange = (e) => {
    if(!(e.target.value.length>160))
      setNewShortBio(e.target.value);
  }
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 'bold',color: 'rgb(41,41,41)'}} >Short Bio</Typography>
      <div style={{paddingTop: 5}}>
        <Grid justifyContent='space-between' container spacing={12}>
          <Grid item >
            <TextareaAutosize placeholder='Short Bio' readOnly={!shortBioEdit} onChange={handleShortBioOnChange} value={newShortBio} className={classes.nameField}/>
            <Typography style={{marginTop: 18,width: '440px', fontSize: 13, color: 'rgb(59, 59, 59)', marginBottom: 20}}>
              Your short bio appears on your <Link style={{color: 'inherit'}} to='/profile'>Profile</Link> and next to your stories. Max 160 characters.
              {
                shortBioServerError &&
                <div style={{color: 'rgb(244,66,55)'}}>
                  Something went wrong. Please try again.
                </div>
              }
            </Typography>
            <Hidden mdUp>
              <ShortBioPartButtonSet 
                shortBioEdit={shortBioEdit}
                setShortBioEdit={setShortBioEdit}
                setNewShortBio={setNewShortBio}
                shortBioServerError={shortBioServerError}
                handleShortBioChangeSave={handleShortBioChangeSave}
              />
            </Hidden>
          </Grid>
          <Grid item>
            <Hidden smDown>
              <ShortBioPartButtonSet 
                shortBioEdit={shortBioEdit}
                setShortBioEdit={setShortBioEdit}
                setNewShortBio={setNewShortBio}
                shortBioServerError={shortBioServerError}
                handleShortBioChangeSave={handleShortBioChangeSave}
              />
            </Hidden>
          </Grid>
        </Grid>
      </div>
      
    </div>
  );
}

const ShortBioPartButtonSet = ({handleShortBioChangeSave, shortBioEdit, setShortBioEdit, setNewShortBio, shortBioServerError}) => {
  const classes= useStyle();
  const {user} = useContext(UserContext);
  return(
    <div>
      {
        !shortBioEdit
        ? <Button variant='outlined' className={classes.editBtn} onClick={e => {setShortBioEdit(true)}}>
            Edit
          </Button>
        : <Grid container>
            <Grid item>
              <Button variant='outlined' onClick={handleShortBioChangeSave} className={classes.saveBtn}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                setNewShortBio(user.username);
                setShortBioEdit(false);
                shortBioServerError(false);
              }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
      }
    </div>
  );
}

const PhotoEditPart = ({photoEdit, setPhotoEdit}) => {
  const classes = useStyle();
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 'bold'}} >Photo</Typography>
      <div style={{paddingTop: 15}}>
        <Grid justifyContent='space-between' container spacing={12}>
          <Grid item>
            <Typography style={{width: '340px', fontSize: 13, color: 'rgb(59, 59, 59)'}}>
              Your photo appears on your <Link style={{color: 'inherit'}} to='/profile'>Profile</Link> and with your stories across Maadhyam.
            </Typography>
            <Typography style={{paddingTop: 20,width: '340px', fontSize: 13, color: 'rgb(59, 59, 59)', marginBottom: 30}}>
              Recommended size: Square, at least 1000 pixels per side. File type: JPG, PNG or GIF.
            </Typography>
            <Hidden mdUp>
              <PhotoPartImgNButtonSet 
                photoEdit={photoEdit}
                setPhotoEdit={setPhotoEdit}
              />
            </Hidden>
          </Grid>
          <Grid item>
            <Hidden smDown>
              <PhotoPartImgNButtonSet 
                photoEdit={photoEdit}
                setPhotoEdit={setPhotoEdit}
              />
            </Hidden>
          </Grid>
        </Grid>
      </div>
      
    </div>
  );
}

const PhotoPartImgNButtonSet = ({photoEdit, setPhotoEdit}) => {
  const classes = useStyle();
  const {user, loginSuccess} = useContext(UserContext);
  const [editedProfilePicture, setEditedProfilePicture] = useState(null);
  
  const handlePhotoChangeSave = async() => {
    const userObj = {};
    if(editedProfilePicture) {
      const data = new FormData();
      let filename = Date.now() + editedProfilePicture.name;
      data.append("name", filename);
      data.append("file", editedProfilePicture);
      userObj.img = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {console.log(err)}
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        {userId: user._id, profilePicture: userObj.img}
      ).then(res => {
        console.log(res.data);
        loginSuccess(res.data);
        setEditedProfilePicture(null);
      })
      setPhotoEdit(false);
    } catch(error) {
      console.log(error);
    }
  }
  return(
    <div>
      <Grid container>
        <Grid item>
          <label htmlFor='fileInput'>
            <div className={photoEdit && classes.uploadPhoto} style={{background: `url(${editedProfilePicture ? URL.createObjectURL(editedProfilePicture) : (user.profilePicture ? PF+user.profilePicture : defaultUserPic)}) center/100%`,borderRadius: 100,  height: '92px', width: '92px'}}>
              <div className={classes.uploadImageBtn} >
                {photoEdit && <i className="fas fa-camera"></i>}
              </div>
            </div>
          </label>
          {
            photoEdit &&
            <input 
              type='file' 
              id='fileInput' 
              style={{display: 'none'}}
              onChange={(e) => setEditedProfilePicture(e.target.files[0])}
            />
          }
        </Grid>
        <Grid item style={{marginLeft: 30}}>
          {
            !photoEdit
            ? <Button variant='outlined' className={classes.editBtn} onClick={e => {setPhotoEdit(true)}}>
                Edit
              </Button>
            : <Grid container>
                <Grid item>
                  <Button variant='outlined' onClick={handlePhotoChangeSave} className={classes.saveBtn}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                    setPhotoEdit(false);
                    setEditedProfilePicture(null);
                  }}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
          }
        </Grid>
      </Grid>
    </div>
  );
}

const UsernameEditPart = ({usernameEdit, setUsernameEdit, newUsername, setNewUsername}) => {
  const classes = useStyle();
  const {user, loginSuccess} = useContext(UserContext);

  const [usernameError, setUsernameError] = useState(false);
  const [usernameServerError, setUsernameServerError] = useState(false);

  const handleUsernameOnChange = (e) => {
    setNewUsername(e.target.value)
  }
  const handleUsernameChangeSave =  async() => {
    setUsernameError(false);
    setUsernameServerError(false);
    if(newUsername.length>=3) {
      try { 
        const response = await axios.put(
          `http://localhost:5000/api/users/${user._id}`,
          {userId: user._id, username: newUsername}
        ).then(res => {
          console.log(res.data);
          loginSuccess(res.data);
        })
        setUsernameEdit(false);
      } catch(error) {
        setUsernameServerError(true)
        console.log(error);
      }
    }
    else {
      setUsernameError(true);
    }
  }
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 5, color: 'rgb(41,41,41)'}} >Username & URL</Typography>
      <div style={{paddingTop: 5}}>
        <Grid justifyContent='space-between' container spacing={12} >
          <Grid item > 
            <Grid container style={{marginTop: 5}}>
              <Grid item>
                <Typography style={{ fontSize: 16, fontWeight: 'bold', marginRight: 15}} >Username</Typography>
              </Grid>
              <Grid item>
                <TextareaAutosize 
                  placeholder='Username' 
                  readOnly={!usernameEdit} 
                  style={{width: '320px', paddingTop: 1}} 
                  onChange={handleUsernameOnChange} 
                  value={newUsername} 
                  className={classes.nameField}
                />
              </Grid>
            </Grid>
            <Grid container style={{marginTop: 10}}>
              <Grid item>
                <Typography style={{ fontSize: 16, fontWeight: 'bold', marginRight: 60}} >URL</Typography>
              </Grid>
              <Grid item>
                <TextareaAutosize placeholder='URL' readOnly={true} style={{width: '320px', paddingTop: 1}} onChange={handleUsernameOnChange} value={`maadhyam.com/@${newUsername}`} className={classes.nameField}/>
              </Grid>
            </Grid>
            <Typography style={{marginTop: 18,width: '400px', fontSize: 13, color: 'rgb(59, 59, 59)', marginBottom: 20}}>
              Your username is your address on Maadhyam. 
              <div style={{color: usernameError ? 'rgb(244,66,55)' : 'rgb(59, 59, 59)'}}>
                It is required field. Minimum 3 characters with no space. 
              </div>
              {
                usernameServerError &&
                <div style={{color: 'rgb(244,66,55)'}}>
                  Something went wrong. Please try again.
                </div>
              }
            </Typography>
            <Hidden mdUp>
              <UsernameEditPartButtonSet 
                usernameEdit={usernameEdit}
                setUsernameEdit={setUsernameEdit}
                setNewUsername={setNewUsername}
                handleUsernameChangeSave={handleUsernameChangeSave}
                setUsernameError={setUsernameError}
                setUsernameServerError={setUsernameServerError}
              />
            </Hidden>
          </Grid>
          <Grid item >
            <Hidden smDown>
              <UsernameEditPartButtonSet 
                usernameEdit={usernameEdit}
                setUsernameEdit={setUsernameEdit}
                setNewUsername={setNewUsername}
                handleUsernameChangeSave={handleUsernameChangeSave}
                setUsernameError={setUsernameError}
                setUsernameServerError={setUsernameServerError}
              />
            </Hidden>
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const UsernameEditPartButtonSet = ({setUsernameServerError, usernameEdit, setUsernameEdit, setNewUsername, handleUsernameChangeSave, setUsernameError}) => {
  const classes = useStyle();
  const {user} = useContext(UserContext);
  return(
    <div>
      {
        !usernameEdit
        ? <Button variant='outlined' className={classes.editBtn} onClick={e => {setUsernameEdit(true)}}>
            Edit
          </Button>
        : <Grid container>
            <Grid item>
              <Button variant='outlined' onClick={handleUsernameChangeSave} className={classes.saveBtn}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                setNewUsername(user.username);
                setUsernameError(false);
                setUsernameEdit(false);
                setUsernameServerError(false);
              }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
      }
    </div>
  );
}

const EmailEditPart = ({emailEdit, setEmailEdit, newEmail, setNewEmail}) => {
  const classes = useStyle();
  const {user, loginSuccess} = useContext(UserContext);

  const [emailError, setEmailError] = useState(false);
  const [emailSrverError, setEmailServerError] = useState(false);

  const handleEmailChangeSave = async () => {
    setEmailError(false);
    setEmailServerError(false);
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)) {
      try { 
        const response = await axios.put(
          `http://localhost:5000/api/users/${user._id}`,
          {userId: user._id, email: newEmail}
        ).then(res => {
          console.log(res.data);
          loginSuccess(res.data);
        })
        setEmailEdit(false);
      } catch(error) {
        setEmailServerError(true)
        console.log(error);
      }
    } 
    else {
      setEmailError(true);
    }
  }
  const handleEmailOnChange = (e) => {
    setNewEmail(e.target.value);
  }
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 'bold',color: 'rgb(41,41,41)',}} >Email</Typography>
      <div style={{paddingTop: 5}}>
        <Grid justifyContent='space-between' container spacing={12} >
          <Grid item > 
            <TextareaAutosize 
              placeholder='Email' 
              readOnly={!emailEdit} 
              onChange={handleEmailOnChange} 
              value={newEmail} 
              className={classes.nameField}
            />
            <Typography style={{marginTop: 18,width: '440px', fontSize: 13, color: 'rgb(59, 59, 59)', marginBottom: 20}}>
              You will recieve trending stories, announcements and audience related notification on this email address. 
              <div style={{color: emailError ? 'rgb(244,66,55)' : 'rgb(59, 59, 59)'}}>
                It is required field. Must be a valid e-mail address.
              </div>
              {
                emailSrverError &&
                <div style={{color: 'rgb(244,66,55)'}}>
                  Something went wrong. Please try again.
                </div>
              }
            </Typography>
            <Hidden mdUp>
              <EmailPartButtonSet 
                emailEdit={emailEdit}
                setEmailEdit={setEmailEdit}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                handleEmailChangeSave={handleEmailChangeSave}
                setEmailError={setEmailError}
                setEmailServerError={setEmailServerError}
              />
            </Hidden>
          </Grid>
          <Grid item >
            <Hidden smDown>
              <EmailPartButtonSet
                emailEdit={emailEdit}
                setEmailEdit={setEmailEdit}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                handleEmailChangeSave={handleEmailChangeSave}
                setEmailError={setEmailError}
                setEmailServerError={setEmailServerError}
              />
            </Hidden>
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const EmailPartButtonSet = ({ emailEdit, setEmailEdit, setNewEmail, handleEmailChangeSave, setEmailError, setEmailServerError}) => {
  const classes = useStyle();
  const {user} = useContext(UserContext);
  return(
    <div>
      {
        !emailEdit
        ? <Button variant='outlined' className={classes.editBtn} onClick={e => {setEmailEdit(true)}}>
            Edit
          </Button>
        : <Grid container>
            <Grid item>
              <Button variant='outlined' onClick={handleEmailChangeSave} className={classes.saveBtn}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                setNewEmail(user.email);
                setEmailError(false)
                setEmailEdit(false);
                setEmailServerError(false);
              }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
      }
    </div>
  );
}

const ResetPasswordPart = ({newPassword, setNewPassword, passwordEdit, setPasswordEdit}) => {
  const classes = useStyle();
  const {user} = useContext(UserContext);

  const [showError, setShowError] = useState(false);

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const handleNewPasswordOnChange = (e) => {
    setNewPassword(e.target.value);
  }
  const handleConfirmPasswordOnChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const isValidPassword = (newPswd) => {
    setShowError(false);
    if(newPswd.length<8 || confirmPassword!==newPassword) {
      setShowError(true);
      return(false);
    }
    return(true);
  }

  const handleResetPassword = async(e) => {
    setShowError(false);
    if(isValidPassword(newPassword)) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/users/${user._id}`,
          {userId: user._id, password: newPassword, confirmPassword}
        );
      } catch(error) {
        setShowError(true);
        console.log(error);
      }
    }
    console.log('password save clicked');
  }
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 5,color: 'rgb(41,41,41)'}} >Reset Password</Typography>
      <div style={{paddingTop: 5}}>
        <Grid justifyContent='space-between' container spacing={12} >
          <Grid item > 
            <Grid container style={{marginTop: 5}}>
              <Grid item>
                <Typography style={{ fontSize: 16, fontWeight: 'bold', marginRight: 34}} >New Passsword</Typography>
              </Grid>
              <Grid item>
                <input type={visiblePassword ? 'text' : 'password'} placeholder='New Password' readOnly={!passwordEdit} style={{width: '260px', paddingTop: 1}} onChange={handleNewPasswordOnChange} value={newPassword} className={classes.nameField}/>
              </Grid>
              {
                passwordEdit && 
                <Grid item>
                  <div onClick={e => {setVisiblePassword(!visiblePassword)}}>
                    {
                      visiblePassword
                      ? <VisibilityOffIcon className={classes.passwordVisibilityIcon}/>
                      : <VisibilityIcon className={classes.passwordVisibilityIcon}/>
                    }
                  </div>
                </Grid>
              }
            </Grid>
            <Grid container style={{marginTop: 10}}>
              <Grid item>
                <Typography style={{ fontSize: 16, fontWeight: 'bold', marginRight: 15}} >Confirm Password</Typography>
              </Grid>
              <Grid item>
                <input type={visibleConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' readOnly={!passwordEdit} style={{width: '260px', paddingTop: 1}} onChange={handleConfirmPasswordOnChange} value={confirmPassword} className={classes.nameField}/>
              </Grid>
              {
                passwordEdit &&
                <Grid item>
                  <div onClick={e => {setVisibleConfirmPassword(!visibleConfirmPassword)}}>
                    {
                      visibleConfirmPassword
                      ? <VisibilityOffIcon  className={classes.passwordVisibilityIcon}/>
                      : <VisibilityIcon  className={classes.passwordVisibilityIcon}/>
                    }
                  </div>
                </Grid>
              }
            </Grid>
            <Typography style={{marginTop: 18,width: '400px', fontSize: 13, color: showError ? 'rgb(244,66,55)' : 'rgb(59, 59, 59)', marginBottom: 20}}>
              Must be 8 characters or more. New password should match confirm password.
            </Typography>
          </Grid>
        </Grid>
        <ResetPasswordPartButtonSet 
          handleResetPassword={handleResetPassword}
          setNewPassword={setNewPassword}
          passwordEdit={passwordEdit}
          setPasswordEdit={setPasswordEdit}
          setConfirmPassword={setConfirmPassword}
          setShowError={setShowError}
        />
      </div>
    </div>
  );
}

const ResetPasswordPartButtonSet = (props) => {
  const classes = useStyle();
  const {handleResetPassword, setNewPassword, passwordEdit, setPasswordEdit, setConfirmPassword, setShowError} = props;
  return(
    <div>
      {
        !passwordEdit
        ? <Button variant='outlined' className={classes.editBtn} onClick={e => {setPasswordEdit(true)}}>
            Reset Password
          </Button>
        : <Grid container>
            <Grid item>
              <Button variant='outlined' onClick={handleResetPassword} className={classes.saveBtn}>
                Save Password
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                setNewPassword('');
                setConfirmPassword('');
                setPasswordEdit(false);
                setShowError(false);
              }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
      }
    </div>
  );
}
export default Settings
