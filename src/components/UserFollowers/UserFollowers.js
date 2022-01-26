import React, {useState} from "react";
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

const useStyle = makeStyles({
  closeIcon: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
})
//follower or following
const UserFollowers = ({openDialogBox, handleCloseDialogBox, dialogBoxType, user}) => {
  const followerArray = [1,2,3,4,5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const followingArray = [1,2,3,4,5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
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
            {dialogBoxType==='follower' ? `${followerArray.length} Followers` : `${followingArray.length} Followings`}
          </Typography>
        </DialogTitle>

        <DialogContent dividers={true}>
          <UsersList dialogBoxType={dialogBoxType} followerArray={followerArray} followingArray={followingArray} user={user}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const UsersList = ({user, dialogBoxType, followerArray, followingArray}) => {
  return(
    <div>
      {
        (dialogBoxType==='follower' ? followerArray : followingArray).map(usersListItem => (
          <UsersListItem user={user} key={usersListItem}/>
        ))
      }
    </div>
  );
}

const UsersListItem = ({user}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickFollow = () => {
    if(!user)
      navigate('/signin', {state: {from: location}});
    setIsFollowing(!isFollowing);
  }
  return(
    <div style={{marginBottom: 10, paddingBottom: 15, width: '100%'}}>
      <Grid  container>
        <Grid item lg={6} md={6} sm={8} xs={8} style={{paddingRight: 10}}>
          <Grid container>
            <Grid item>
              <Avatar
                alt="profilemenu avatar"
                src='https://picsum.photos/200'
                style={{height: 40, width: 40, marginTop: 0}}
              /> 
            </Grid>
            <Grid item style={{marginLeft: 10, paddingTop: 2}}>
              <Typography style={{fontSize: 13, color: '#000000'}}>
                Pari Bilaspure
              </Typography>
              <Typography style={{fontSize: 12, lineHeight: 1.3}}>
                @pari1234
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
export default UserFollowers;
{/* <Button variant="contained" style={{background: 'rgb(26,136,22)', width: 80, textTransform: 'none', color: '#fff', borderRadius: 100, height: 35, marginTop: 5}}>
            {!isFollowing ? 'Follow' : 'Following'}
          </Button> */}