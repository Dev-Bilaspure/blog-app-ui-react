import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    navbar: {
        paddingTop: 9,
        background: '#fff',
        height: 86,
        display: 'flex',
        boxShadow: 'none',
        borderBottom: '1px solid black',
        position: 'sticky'
    },
    logo: {
      color: '#000000',
      marginLeft: 60,
      fontFamily: `'Abril Fatface', 'cursive'`,
      flex: 1,
      fontSize: 35
    },
    buttons: {
      flex: 3,
      marginRight: 70,
    },
    writeButton: {
      marginRight: 50,
      color: '#000000',
      float: 'right',
      paddingTop: 11,
    },
    signInButton: {
      marginRight: 50,
      float: 'right',
      color: '#000000',
      paddingTop: 11,
    },
    getStartedButton: {
      height: 44,
      borderRadius: 30,
      background: '#000000',
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
    }
})

export default useStyles;