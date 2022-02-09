import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    textContent: {
      fontFamily: `'Faustina', 'serif'`,
      fontSize: 21,
      lineHeight: 1.5, 
      letterSpacing: 0.7
    },
    smallFollowButton: {
      background: 'rgb(26,136,22)', 
      color: '#fff', 
      borderRadius: 30, 
      textTransform: 'none', 
      fontSize: 14, 
      padding: 0, width: 0,
      height: 22,
      float: 'right',
      marginTop: 3,
      marginLeft: 10,
      width: 90,
      height: 25,
      '&:hover': {
        background: 'rgb(26,136,22)',
        
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
      background: 'rgb(26,136,22)', 
      borderRadius: 30, 
      color: '#fff', 
      width: 90, 
      height: 38,
      '&:hover': {
        background: 'rgb(26,136,22)',
      },
      margin: 'auto'
    },
    likeOrFollow: {
      '&:hover': {
        cursor: 'pointer',
        // textShadow: '0px 0px 4px rgb(27,137,22)'
      }
    },
    categoryTag: {
      boxShadow: 'none',
      fontSize: 12, 
      borderRadius: 40, 
      textTransform: 'none', 
      height: 17, 
      marginRight: 10, 
      paddingRight: 7, 
      paddingLeft: 7,
      '&:active': {
        boxShadow: 'none',
        background: 'rgb(163, 163, 163)'
      },
      marginBottom: 8,
    }
  })

export default useStyle;