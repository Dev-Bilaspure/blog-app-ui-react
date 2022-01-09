import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import './postStyle.css';
import React from 'react'
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
  paper: {
    padding: 20,
    paddingTop: 0,
    borderRadius: 10,
    paddingRight: 0,
    paddingLeft: 0
  }
})
const Post = ({id}) => {
  const { paper }= useStyle();
  const img = 'https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';
  return (
    <Box style={{paddingLeft: 10, marginBottom: 30,paddingRight: 10}}>
      <Link to={`/blog/${id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <Paper elevation={5} className={paper}>
          <div className="post">
            <img
              className="postImg"
              src={img}
              alt=""
            />
            <div className="postInfo">
              <div className="postCats">
                <span className="postCat">
                  {/* <Link className="link" to="/posts?cat=Music"> */}
                    Music
                  {/* </Link> */}
                </span>
                <span className="postCat">
                  {/* <Link className="link" to="/posts?cat=Music"> */}
                    Life
                  {/* </Link> */}
                </span>
              </div>
              <span className="postTitle">
                {/* <Link to="/post/abc" className="link"> */}
                  Lorem ipsum dolor sit amet
                {/* </Link> */}
              </span>
              <hr />
              <span className="postDate">1 hour ago</span>
            </div>
            <div className='descWraper'>
              <p className="postDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
                officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
                fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
                atque, exercitationem quibusdam, reiciendis odio laboriosam? m dolor sit amet, consectetur adipisicing elit. Assumenda
                officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
                fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
                atque, exercitationem quibusdam, reiciendis odio laboriosam?
              </p>
            </div>
          </div>
        </Paper>
      </Link>
      
    </Box>
  )
}

export default Post
