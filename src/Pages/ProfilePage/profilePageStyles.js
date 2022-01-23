import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  topName: {
    fontSize: 27, 
    marginBottom: 9,
    fontFamily: `'Source Sans Pro', 'sans-serif'`, 
    letterSpacing: -0.5,
  },
  followButton: {
    marginLeft: '10px',
    marginTop: '2px',
    width: '80px',
    borderRadius: 25,
    height: 37,
    textTransform: 'none',
    boxShadow: 'none',
    background: 'rgb(26,136,22)',
    color: '#fff',
    borderRadius: '100px',
    '&:hover': {
      background: 'rgb(26,136,22)'
    }
   },
  likeOrBookmark: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  postByUserWrapper: {
    paddingBottom: 50, 
    marginRight: 20, 
    borderBottom: '1px solid rgb(194, 194, 194)', 
    marginBottom: 70,
  },
  getStartedButton: {
    marginLeft: '26px',
    color: 'rgb(26,136,22)',
    marginBottom: 9,
    height: 40, 
    border: '1px solid rgb(26,136,22)', 
    textTransform: 'none', 
    borderRadius: 30,
  },
  leftBarUserDesc: {
    paddingTop: 15, 
    wordWrap: 'break-word', 
    paddingRight: 110, 
    fontSize: '14px', 
    color: '#757575', 
    fontFamily: `'PT Sans', 'sans-serif'`
  },
  leftBarUserName: {
    fontFamily: `'Roboto Condensed', 'sans-serif'`, 
    wordWrap: 'break-word', 
    paddingRight: 140, 
    fontSize: 18
  },
  leftBarFollowBnt: {
    color: '#fff', 
    textTransform: 'none', 
    borderRadius: 40, 
    background: 'rgb(26,136,22)',
    width: 80,
    '&:hover': {
      background: 'rgb(26,136,22)',
    }
  },
  signInButton: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
})

export default useStyle;