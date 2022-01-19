import React, { useState, useEffect } from 'react'
import { Button, Grid, TextareaAutosize, Typography, Hidden } from '@material-ui/core';
import WebFont from 'webfontloader';
import './settingsStyle.css'
import { Link } from 'react-router-dom';
import useStyle from './settingsStyles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const name='Dev Bilaspure'; 
const email='dev@mail.com';
const username='dev8305';
const shortBio='Hi I am a software engineer at Google';
const photo = 'https://miro.medium.com/fit/c/131/131/2*1L5DSsWtYoQVm1TxThM4vQ.jpeg';
const Settings = () => {
  const classes = useStyle();
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newUsername, setNewUsername] = useState(username);
  const [newShortBio, setNewShortBio] = useState(shortBio);
  const [newPhoto, setNewPhoto] = useState(photo);
  const [newPassword, setNewPassword] = useState('');

  const [emailEdit, setEmailEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [usernameEdit, setUsernameEdit] = useState(false);
  const [shortBioEdit, setShortBioEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [photoEdit, setPhotoEdit] = useState(false);

  const isValidName = (nm) => {
    if(nm!=='')
      return(true);
    else {
      setNameEdit(true);
      return(false);
    }
  }
  const isValidUsername = (usrnm) => {
    let isValidUsername = (usrnm.indexOf(' ')===-1 && usrnm!=='' && usrnm.length>=3)
    if(isValidUsername)
      return(true);
    else {
      setUsernameEdit(true);
      return(false);
    }
  }
  const isValidEmail = (eml) => {
    let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(eml);
    if(isValidEmail)
      return(true);
    else {
      setEmailEdit(true);
      return(false);
    }
  }
  const handleSave = (e) => {
    const isEveryThingValid = (
      isValidName(newName) && 
      isValidUsername(newUsername) && 
      isValidEmail(newEmail)
    );
    if(isEveryThingValid) {
      const obj = {
        name: newName,
        email: newEmail,
        username: newUsername,
        shortBio: newShortBio
      }
      console.log('save btn clicked');
      setNameEdit(false);
      setUsernameEdit(false);
      setShortBioEdit(false);
      setPhotoEdit(false);
    }
  }
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
          <div style={{paddingTop: 50, paddingRight: 20, paddingLeft: 30}}>
            <div style={{paddingBottom: 10, borderBottom: '1px solid rgb(242,242,242)'}}>
              <Typography style={{fontSize: 23, fontWeight: 'bold'}}>
                About you
              </Typography>
            </div>

            {/* FOR NAME */}
            <div style={{marginTop: 30, marginBottom: 80}}>
              <NameEditPart 
                handleSave={handleSave} 
                setNameEdit={setNameEdit} 
                nameEdit={nameEdit} 
                newName={newName} 
                setNewName={setNewName}
              />
            </div>
            
            {/* FOR SHORT BIO */}
            <div style={{marginTop: 30, marginBottom: 80}}>
              <ShortBioPart 
                handleSave={handleSave} 
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
                setNewPhoto={setNewPhoto}
                handleSave={handleSave}
              />
            </div>

            {/* FOR USERNAME */}
            <div style={{marginTop: 30, marginBottom: 80}}>
              <UsernameEditPart 
                usernameEdit={usernameEdit}
                setUsernameEdit={setUsernameEdit}
                newUsername={newUsername}
                setNewUsername={setNewUsername}
                handleSave={handleSave}
              />
            </div>

            {/* FOR EMAIL */}
            <div style={{marginTop: 30, marginBottom: 80}}>
              <EmailEditPart 
                emailEdit={emailEdit}
                setEmailEdit={setEmailEdit}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                handleSave={handleSave}
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

const NameEditPart = ({handleSave, setNameEdit, nameEdit, setNewName, newName}) => {
  const classes = useStyle();
  const handleNewNameOnChange = (e) => {
    if(!(e.target.value.length>20))
      setNewName(e.target.value);
  }
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 'bold'}} >Name</Typography>
      <div style={{paddingTop: 5}}>
        <Grid justifyContent='space-between' container spacing={12} >
          <Grid item > 
            <TextareaAutosize placeholder='Name' readOnly={!nameEdit} onChange={handleNewNameOnChange} value={newName} className={classes.nameField}/>
            <Typography style={{marginTop: 18,width: '440px', fontSize: 13, color: 'rgb(59, 59, 59)', marginBottom: 20}}>
              Your name appears on your <Link style={{color: 'inherit'}} to='/profile'>Profile</Link> page, as your byline, and in your responses. It is a required field. Max 20 character.
            </Typography>
            <Hidden mdUp>
              <NamePartButtonSet 
                handleSave={handleSave}
                setNameEdit={setNameEdit}
                nameEdit={nameEdit}
                setNewName={setNewName}
              />
            </Hidden>
          </Grid>
          <Grid item >
            <Hidden smDown>
              <NamePartButtonSet 
                handleSave={handleSave}
                setNameEdit={setNameEdit}
                nameEdit={nameEdit}
                setNewName={setNewName}
              />
            </Hidden>
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
const NamePartButtonSet = ({handleSave, setNameEdit, nameEdit, setNewName}) => {
  const classes = useStyle();
  return(
    <div>
      {
        !nameEdit
        ? <Button variant='outlined' className={classes.editBtn} onClick={e => {setNameEdit(true)}}>
            Edit
          </Button>
        : <Grid container>
            <Grid item>
              <Button variant='outlined' onClick={handleSave} className={classes.saveBtn}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                setNewName(name);
                setNameEdit(false);
              }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
      }
    </div>
  );
}

const ShortBioPart = ({handleSave, shortBioEdit, setShortBioEdit, newShortBio, setNewShortBio}) => {
  const classes = useStyle();
  const handleShortBioOnChange = (e) => {
    if(!(e.target.value.length>160))
      setNewShortBio(e.target.value);
  }
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 'bold'}} >Short Bio</Typography>
      <div style={{paddingTop: 5}}>
        <Grid justifyContent='space-between' container spacing={12}>
          <Grid item >
            <TextareaAutosize placeholder='Short Bio' readOnly={!shortBioEdit} onChange={handleShortBioOnChange} value={newShortBio} className={classes.nameField}/>
            <Typography style={{marginTop: 18,width: '440px', fontSize: 13, color: 'rgb(59, 59, 59)', marginBottom: 20}}>
              Your short bio appears on your <Link style={{color: 'inherit'}} to='/profile'>Profile</Link> and next to your stories. Max 160 characters.
            </Typography>
            <Hidden mdUp>
              <ShortBioPartButtonSet 
                handleSave={handleSave}
                shortBioEdit={shortBioEdit}
                setShortBioEdit={setShortBioEdit}
                setNewShortBio={setNewShortBio}
              />
            </Hidden>
          </Grid>
          <Grid item>
            <Hidden smDown>
              <ShortBioPartButtonSet 
                handleSave={handleSave}
                shortBioEdit={shortBioEdit}
                setShortBioEdit={setShortBioEdit}
                setNewShortBio={setNewShortBio}
              />
            </Hidden>
          </Grid>
        </Grid>
      </div>
      
    </div>
  );
}

const ShortBioPartButtonSet = ({handleSave, shortBioEdit, setShortBioEdit, setNewShortBio}) => {
  const classes= useStyle();
  return(
    <div>
      {
        !shortBioEdit
        ? <Button variant='outlined' className={classes.editBtn} onClick={e => {setShortBioEdit(true)}}>
            Edit
          </Button>
        : <Grid container>
            <Grid item>
              <Button variant='outlined' onClick={handleSave} className={classes.saveBtn}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                setNewShortBio(shortBio);
                setShortBioEdit(false);
              }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
      }
    </div>
  );
}

const PhotoEditPart = ({photoEdit, setPhotoEdit, setNewPhoto, handleSave }) => {
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
                setNewPhoto={setNewPhoto}
                handleSave={handleSave}
              />
            </Hidden>
          </Grid>
          <Grid item>
            <Hidden smDown>
              <PhotoPartImgNButtonSet 
                photoEdit={photoEdit}
                setPhotoEdit={setPhotoEdit}
                setNewPhoto={setNewPhoto}
                handleSave={handleSave}
              />
            </Hidden>
          </Grid>
        </Grid>
      </div>
      
    </div>
  );
}

const PhotoPartImgNButtonSet = ({photoEdit, setPhotoEdit, setNewPhoto, handleSave}) => {
  const classes = useStyle();
  return(
    <div>
      <Grid container>
        <Grid item>
          <label htmlFor='fileInput'>
            <div className={photoEdit && classes.uploadPhoto} style={{background: `url(${photo}) center/100%`,borderRadius: 100,  height: '92px', width: '92px'}}>
              <div className={classes.uploadImageBtn} >
                {photoEdit && <i class="fas fa-camera"></i>}
              </div>
            </div>
          </label>
          {
            photoEdit &&
            <input 
              type='file' 
              id='fileInput' 
              style={{display: 'none'}}
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
                  <Button variant='outlined' onClick={handleSave} className={classes.saveBtn}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                    setNewPhoto(photo);
                    setPhotoEdit(false);
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

const UsernameEditPart = ({usernameEdit, setUsernameEdit, newUsername, setNewUsername, handleSave}) => {
  const classes = useStyle();
  const handleUsernameOnChange = (e) => {
    setNewUsername(e.target.value)
  }
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 5}} >Username & URL</Typography>
      <div style={{paddingTop: 5}}>
        <Grid justifyContent='space-between' container spacing={12} >
          <Grid item > 
            <Grid container style={{marginTop: 5}}>
              <Grid item>
                <Typography style={{ fontSize: 16, fontWeight: 'bold', marginRight: 15}} >Username</Typography>
              </Grid>
              <Grid item>
                <TextareaAutosize placeholder='Username' readOnly={!usernameEdit} style={{width: '320px', paddingTop: 1}} onChange={handleUsernameOnChange} value={newUsername} className={classes.nameField}/>
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
              Your username is your address on Maadhyam. It is required field. Atleast 3 characters with no space. 
            </Typography>
            <Hidden mdUp>
              <UsernameEditPartButtonSet 
                handleSave={handleSave}
                usernameEdit={usernameEdit}
                setUsernameEdit={setUsernameEdit}
                setNewUsername={setNewUsername}
              />
            </Hidden>
          </Grid>
          <Grid item >
            <Hidden smDown>
              <UsernameEditPartButtonSet 
                handleSave={handleSave}
                usernameEdit={usernameEdit}
                setUsernameEdit={setUsernameEdit}
                setNewUsername={setNewUsername}
              />
            </Hidden>
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const UsernameEditPartButtonSet = ({usernameEdit, setUsernameEdit, setNewUsername, handleSave}) => {
  const classes = useStyle();
  return(
    <div>
      {
        !usernameEdit
        ? <Button variant='outlined' className={classes.editBtn} onClick={e => {setUsernameEdit(true)}}>
            Edit
          </Button>
        : <Grid container>
            <Grid item>
              <Button variant='outlined' onClick={handleSave} className={classes.saveBtn}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                setNewUsername(username);
                setUsernameEdit(false);
              }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
      }
    </div>
  );
}

const EmailEditPart = ({emailEdit, setEmailEdit, newEmail, setNewEmail, handleSave}) => {
  const classes = useStyle();
  const handleEmailOnChange = (e) => {
    setNewEmail(e.target.value);
  }
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 'bold'}} >Email</Typography>
      <div style={{paddingTop: 5}}>
        <Grid justifyContent='space-between' container spacing={12} >
          <Grid item > 
            <TextareaAutosize placeholder='Email' readOnly={!emailEdit} onChange={handleEmailOnChange} value={newEmail} className={classes.nameField}/>
            <Typography style={{marginTop: 18,width: '440px', fontSize: 13, color: 'rgb(59, 59, 59)', marginBottom: 20}}>
              You will recieve trending articles, announcements and audience related notification on this email address. It is required field. Must be a valid e-mail address.
            </Typography>
            <Hidden mdUp>
              <EmailPartButtonSet 
                handleSave={handleSave}
                emailEdit={emailEdit}
                setEmailEdit={setEmailEdit}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
              />
            </Hidden>
          </Grid>
          <Grid item >
            <Hidden smDown>
              <EmailPartButtonSet
                handleSave={handleSave}
                emailEdit={emailEdit}
                setEmailEdit={setEmailEdit}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
              />
            </Hidden>
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const EmailPartButtonSet = ({handleSave, emailEdit, setEmailEdit, newEmail, setNewEmail}) => {
  const classes = useStyle();
  return(
    <div>
      {
        !emailEdit
        ? <Button variant='outlined' className={classes.editBtn} onClick={e => {setEmailEdit(true)}}>
            Edit
          </Button>
        : <Grid container>
            <Grid item>
              <Button variant='outlined' onClick={handleSave} className={classes.saveBtn}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' className={classes.cancelEditBtn} onClick={e => {
                setNewEmail(email);
                setEmailEdit(false);
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
    if(newPswd<8) {
      setShowError(true);
      return(false);
    }
    const specialCharArr = ['@', '#', '$', '%', '!', '*', '&', '*', '+', '-', '/', '>', '<', '/', '_'];
    let specialChar = false;
    let letterChar = false;
    let numberChar = false;
    for(let i=0;i<newPswd.length;i++) {
      if(newPswd[i]>='a' && newPswd<='z')
        letterChar = true;
      if(newPswd[i]>='A' && newPswd<='Z')
        letterChar = true;
      if(specialCharArr.indexOf(newPswd[i])>-1)
        specialChar = true;
      if(newPswd[i]>='1' && newPswd[i]<='9')
        numberChar = true
    }
    if(specialChar && letterChar && numberChar && newPswd===confirmPassword)
      return(true);
    else {
      setShowError(true);
      return(false);
    }
  }
  const handleResetPassword = (e) => {
    if(isValidPassword(newPassword)) {

    }
    console.log('password save clicked');
  }
  return(
    <div>
      <Typography style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 5}} >Reset Password</Typography>
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
                      ? <VisibilityIcon style={{color: 'rgb(117,117,117)'}}/>
                      : <VisibilityOffIcon style={{color: 'rgb(117,117,117)'}}/>
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
                      ? <VisibilityIcon  style={{color: 'rgb(117,117,117)'}}/>
                      : <VisibilityOffIcon  style={{color: 'rgb(117,117,117)'}}/>
                    }
                  </div>
                </Grid>
              }
            </Grid>
            <Typography style={{marginTop: 18,width: '400px', fontSize: 13, color: showError ? 'rgb(244,66,55)' : 'rgb(59, 59, 59)', marginBottom: 20}}>
              Must be 8 characters or more, needs at least one number, one letter and one special charater. New password should match confirm password.
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
