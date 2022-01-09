import { Avatar, Box, Button, Grid, Table, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './blogStyle.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const useStyle = makeStyles({
  textContent: {
    fontFamily: `'Faustina', 'serif'`,
    fontSize: 21,
    lineHeight: 1.5, 
    letterSpacing: 0.7
  },
  followButton: {
    background: 'rgb(27,137,22)', 
    color: '#fff', 
    borderRadius: 30, 
    textTransform: 'none', 
    fontSize: 11, 
    padding: 0, width: 0,
    height: 22,
    float: 'right',
    marginTop: 3,
    marginLeft: 10,
    border: '1px solid #000000',
    '&:hover': {
      background: 'rgb(27,137,22)',
      border: '0px solid #000000',
    }
  }, 
  likeFollowBookmark: {
    marginTop: 30,
    margin: 'auto',
    // background: '#000000',
    width: 180
  }
})
const Blog = () => {
  const location = useLocation();
  console.log(location);
  const classes = useStyle();
  const [likes, setLikes] = useState(500);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleLikeButton = (e) => {
    e.preventDefault();
    if(isLiked) 
      setLikes(likes-1);
    else
      setLikes(likes+1);
    setIsLiked(!isLiked);
  }
  const handleBookmarkButton = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  }
  return (
    <Grid container style={{marginTop: 30}}>
      <Grid item lg={3}>
        <Box className={classes.likeFollowBookmark}>
          <Button style={{textTransform: 'none', background: 'rgb(27,137,22)', borderRadius: 30, color: '#fff', width: 75}}>
            Follow
          </Button>
          <Box style={{marginTop: 15, borderTop: '1px solid rgb(240,240,241)', paddingTop: 10, paddingLeft: 6}}>
            <Grid container style={{ fontSize: 18}}>
              <Grid item style={{ float: 'left', color: 'rgb(246,55,55)'}} >
                {
                  isLiked 
                  ? <i class="fas fa-heart" style={{marginRight: 6}} onClick={handleLikeButton}></i> 
                  : <i class="far fa-heart" style={{marginRight: 6}} onClick={handleLikeButton}></i>
                }
                {likes}
              </Grid>
              <Grid item style={{color: 'rgb(27,137,22)'}}>
                {
                  isBookmarked 
                  ? <i class="fas fa-bookmark" style={{marginLeft: 40}} onClick={handleBookmarkButton}></i>
                  : <i class="far fa-bookmark" style={{marginLeft: 40}} onClick={handleBookmarkButton}></i>
                }
              </Grid>
            </Grid> 
            
          </Box>
        </Box>
      </Grid>
      <Grid item lg={6} style={{width: '100%'}}>
        <Typography style={{fontSize: 48, lineHeight: '60px'}}>
          How to use React Router in your React js project.
        </Typography>
        <Box style={{marginTop: 26}}>
          <Grid container style={{height: 'auto'}}>
            <Grid item>
              <Avatar
                alt="author avatar"
                src='https://picsum.photos/200'
                style={{width: 53, height: 53}}
              />
            </Grid>
            <Grid item style={{marginLeft: 13}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <Typography style={{fontSize: 15, marginTop: 3, float: 'left'}}>Dev Bilaspure</Typography>
                    <Button className={classes.followButton}>
                      Follow
                    </Button>
                  </TableRow>
                  <TableRow>
                    <Typography style={{fontSize: 15, color: 'rgb(117,117,117)'}}>Oct 23, 2021</Typography>
                  </TableRow>
                </TableHead>
              </Table>
            </Grid>
            {/* <Grid item >
              <Button variant="outlined" startIcon={<EditIcon />} className={classes.editButton}>
                Edit
              </Button>
              <Button variant="outlined" startIcon={<DeleteIcon />} className={classes.deleteButton} >
                Delete
              </Button>
            </Grid> */}
          </Grid>
          <Box style={{marginTop: 30}}>
            <img 
              src="https://miro.medium.com/max/1400/1*TVd_sNhpc7JDPBHAsAOQZg.jpeg" 
              alt="blog-post-image" 
              style={{objectFit: 'cover', width: '100%'}}
            />
            <Box style={{marginTop: 35}}>
              <Typography className={classes.textContent}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, laboriosam repudiandae voluptatibus, harum accusantium corporis earum quas, consectetur necessitatibus labore quis repellat iste magnam nulla? Quisquam fugit dignissimos aperiam error, fuga veritatis enim earum blanditiis nemo. Non saepe quod alias, aliquid accusamus voluptatum laborum laboriosam totam architecto. Officiis, praesentium quibusdam provident culpa, mollitia sint quas quae deleniti, placeat fugit totam?
                  <br />
                  <br />
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ad alias enim ipsa illo voluptatum dolores suscipit animi inventore corporis aspernatur rem nulla modi ipsam facere quo, eos adipisci, rerum aut nemo mollitia et praesentium. Officia dignissimos ullam assumenda explicabo velit nulla. Facilis animi dolorem earum libero eum nam minus inventore voluptatum tenetur. Voluptates nihil tempora alias, nam quo expedita architecto nisi minima facilis non! Qui voluptas odio, itaque soluta dolores repellat tempore earum hic commodi aliquid laboriosam id. Sint.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={3}>
        
      </Grid>
    </Grid>
  )
}

export default Blog
