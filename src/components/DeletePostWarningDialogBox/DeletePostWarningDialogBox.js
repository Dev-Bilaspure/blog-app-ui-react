import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Button, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyle = makeStyles({
  closeIcon: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
})
const DeletePostWarningDialogBox = (props) => {
  const {openDialogBox, handleCloseDialogBox, afterDeleteNavigateLocation, postId} = props;
  const classes = useStyle();
  const navigate = useNavigate();

  const handleDeletePost = async() => {
    // api to delete this post
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`);
    } catch(error) {
      console.log(error);
    }

    handleCloseDialogBox();
    navigate(afterDeleteNavigateLocation);
    window.location.reload();
  }
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
        </DialogTitle>

        <DialogContent dividers={false}>
          <div>
            <Typography style={{fontSize: 30, fontFamily: `'Raleway', 'sans-serif'`, width: 180, margin: 'auto'}}>
              Delete Story
            </Typography>
            <Typography style={{paddingTop: 10, width: 330, margin: 'auto', color: 'rgb(77,77,77)', fontSize: 17}}>
              Are you sure you want to delete this story?
            </Typography>
            <div style={{margin: 'auto', width: 200, marginTop: 70, paddingBottom: 20}}>
              <Grid container>
                <Grid item>
                  <Button variant="outlined" onClick={handleCloseDialogBox} style={{paddingRight: 12, paddingLeft: 12, paddingTop: 9, paddingBottom: 9, borderRadius: 100, textTransform: 'none', paddingLeft: 15, paddingRight: 15}}>
                    <Typography>Cancel</Typography>
                  </Button>
                </Grid>
                <Grid item style={{marginLeft: 40}}>
                  <Button variant="contained" onClick={handleDeletePost} style={{paddingRight: 14, paddingLeft: 14, paddingTop: 9, paddingBottom: 9, color: '#fff', borShadow: 'none', background: 'rgb(201,74,74)', borderRadius: 100, textTransform: 'none', paddingLeft: 15, paddingRight: 15}}>
                    <Typography>Delete</Typography>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};


export default DeletePostWarningDialogBox;