import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    navbar: {
        paddingTop: 5,
        background: '#fff',
        height: 76,
        display: 'flex',
        boxShadow: 'none',
        borderBottom: '1px solid black',
        position: 'sticky',
    },
    logo: {
      color: 'rgb(41,41,41)',
      marginLeft: '20px',
      fontFamily: `'Abril Fatface', 'cursive'`,
      flex: 1,
    },
    buttons: {
      flex: 3,
      marginRight: 20,
    },
    writeButton: {
      marginRight: 40,
      color: '#000000',
      float: 'right',
      paddingTop: 11,
    },
    signInButton: {
      marginRight: 40,
      float: 'right',
      color: '#000000',
      paddingTop: 11,
    },
    getStartedButton: {
      height: 44,
      borderRadius: 30,
      background: 'rgb(41,41,41)',
      color: '#fff',
      fontSize: 13,
      width: 125,
      float: 'right',
      paddingTop: 5,
      textTransform: "none",
      '&:hover': {
        background: '#fff',
        color: '#000000',
        border: '1px solid black',
      }
    },
    reverseTxt: {
      transform: 'scale(-1, 1)',
      '-moz-transform': 'scale(-1, 1)',
      '-webkit-transform': 'scale(-1, 1)',
      '-o-transform': 'scale(-1, 1)',
      '-ms-transform': 'scale(-1, 1)',
      transform: 'scale(-1, 1)',
      float: 'left',
      marginRight: 6
    }
})

export default useStyles;