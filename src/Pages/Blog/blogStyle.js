import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    textContent: {
      fontFamily: `'Faustina', 'serif'`,
      fontSize: 21,
      lineHeight: 1.5, 
      letterSpacing: 0.7
    },
    smallFollowButton: {
      background: 'rgb(118,136,144)', 
      color: '#fff', 
      borderRadius: 30, 
      textTransform: 'none', 
      fontSize: 14, 
      padding: 0, width: 0,
      height: 22,
      float: 'right',
      marginTop: 3,
      marginLeft: 10,
      width: 73,
      height: 25,
      '&:hover': {
        background: 'rgb(101, 116, 122)',
        
      }
    }, 
    likeFollowBookmark: {
      marginTop: 30,
      margin: 'auto',
      // background: '#000000',
      width: 180,
      marginBottom: 30,
    },
    largeFollowButton: {
      textTransform: 'none', 
      background: 'rgb(118,136,144)', 
      borderRadius: 30, 
      color: '#fff', 
      width: 90, 
      height: 45,
      '&:hover': {
        background: 'rgb(101, 116, 122)',
      },
      margin: 'auto'
    },
    likeOrFollow: {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  })

export default useStyle;