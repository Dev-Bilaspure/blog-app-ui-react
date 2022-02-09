import React, {useContext, useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'


const PF = 'http://localhost:5000/images/'
const defaultUserPic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'


const useStyle = makeStyles({
  closeIcon: {
    '&:hover': {
      cursor: 'pointer',
    }
  }
})
//follower or following
const UserFollowersFollowingsDialogBox = (props) => {
  const {openDialogBox, handleCloseDialogBox, dialogBoxType, user, profileUsersId} = props;
  const followerArray = [1,2,3,4,5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const followingArray = [1,2,3,4,5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isFetching, setIsFectching] = useState(false);
  useEffect(() => {
    setIsFectching(true);
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${profileUsersId}/followers`
        ).then(res => {
          setFollowers(res.data);
          console.log("followers", res.data);
          setIsFectching(false);
        })
      } catch(error) {
        console.log(error);
        setIsFectching(false);
      }
      
    }
    const fetchFollowings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${profileUsersId}/followings`
        ).then(res => {
          setFollowings(res.data);
          console.log("followings", res.data);
          setIsFectching(false);
        })
      } catch(error) {
        console.log(error);
        setIsFectching(false);
      }
    }
    fetchFollowings();
    fetchFollowers();
  }, [profileUsersId])
  console.log(dialogBoxType);
  const classes = useStyle();
  return (
    <div >
      <Dialog
        open={openDialogBox}
        onClose={handleCloseDialogBox}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth={'xs'}
        style={{paddingBottom: 60, paddingTop: 60}}
      >
        <DialogTitle id="scroll-dialog-title">
          <div style={{ width: "100%", marginBottom: 10, textAlign: 'center' }}>
            <CloseIcon onClick={handleCloseDialogBox} className={classes.closeIcon} style={{ float: "right", color: 'rgb(150,150,150)', height: 20, width: 20}} />
          </div>
          <Typography style={{textAlign: 'center', fontSize: 21, fontFamily: `'Signika Negative', 'sans-serif'`, letterSpacing: 0.5}}>
            {dialogBoxType==='follower' ? `${followers.length} Followers` : `${followings.length} Followings`}
          </Typography>
        </DialogTitle>

        <DialogContent dividers={true}>
          {
            isFetching ? 
            <div style={{textAlign: 'center'}}>
              <CircularProgress color="inherit" />
            </div> :
            <UsersList dialogBoxType={dialogBoxType} followers={followers} followings={followings} user={user}/>
          }
          
          
        </DialogContent>
      </Dialog>
    </div>
  );
};

const UsersList = ({user, dialogBoxType, followers, followings}) => {
  return(
    <div>
      {
        (dialogBoxType==='follower' ? followers : followings).map(usersListItem => (
          <UsersListItem user={user} usersListItem={usersListItem}/>
        ))
      }
    </div>
  );
}

const UsersListItem = ({user, usersListItem}) => {
  const [isFollowing, setIsFollowing] = useState(user.followings.indexOf(usersListItem._id)>-1);
  const location = useLocation();
  const navigate = useNavigate();

  const {loginSuccess} = useContext(UserContext);

  const handleClickFollow = async() => {
    if(!user)
      navigate('/signin', { state: {from: location}});
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${usersListItem._id}/follow`,
        {userId: user._id}
      ).then(res => {
        loginSuccess(res.data);
        console.log(res.data);
        setIsFollowing(!isFollowing);
      })
    } catch(error) {
      console.log(error);
    }
    // setIsFollowing(!isFollowing);
  }
  return(
    <div style={{marginBottom: 10, paddingBottom: 15, width: '100%'}}>
      <Grid  container>
        <Grid item lg={6} md={6} sm={8} xs={8} style={{paddingRight: 10}}>
          <Grid container>
            <Grid item>
              <Avatar
                alt="profilemenu avatar"
                src={usersListItem.profilePicture ? PF+usersListItem.profilePicture : defaultUserPic}
                style={{height: 40, width: 40, marginTop: 0}}
              /> 
            </Grid>
            <Grid item style={{marginLeft: 10, paddingTop: 0}}>
              <Typography style={{fontSize: 15, color: '#000000'}}>
                {usersListItem.name}
              </Typography>
              <Typography style={{fontSize: 13, lineHeight: 1.3}}>
                @{usersListItem.username}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item  lg={6} md={6} sm={4} xs={4}>
          <Button variant="contained" onClick={handleClickFollow} style={{float: 'right', background: 'rgb(26,136,22)', width: 80, textTransform: 'none', color: '#fff', borderRadius: 100, height: 30, marginTop: 4}}>
            {!isFollowing ? 'Follow' : 'Following'}
          </Button>
        </Grid>
      </Grid>

    </div>
  );
}
export default UserFollowersFollowingsDialogBox;
{/* <Button variant="contained" style={{background: 'rgb(26,136,22)', width: 80, textTransform: 'none', color: '#fff', borderRadius: 100, height: 35, marginTop: 5}}>
            {!isFollowing ? 'Follow' : 'Following'}
          </Button> */}