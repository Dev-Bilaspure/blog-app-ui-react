import {makeStyles} from '@material-ui/core';


const useStyle = makeStyles({
  navbar: {
    background: '#fff',
    height: 65,
    // marginLeft: 10,
    // marginRight: 40,
    boxShadow: 'none',
    borderBottom: '1px solid rgb(150,150,150)'
  },
  logoAndLogoText: {
    color: 'rgb(51,51,51)',
    marginRight: 30,
    marginLeft: 20,
  },
  logoText: {
    display: 'inline', 
    fontFamily: `'Abril Fatface', 'cursive'`, 
    fontSize: 30, 
    paddingLeft: 10,
  },
  navbarBasicMenu: {
    marginRight: 30,
    marginLeft: 10
  },
  getStartedBnt: {
    borderRadius: 100, 
    background: 'rgb(51,51,51)', 
    color: '#fff', 
    textTransform: 'none',
    fontSize: 14,
    '&:hover': {
      background: 'rgb(61,61,61)',
    },
    marginRight: 5
  },
  writeBtn: {
    '&:hover': {
      cursor: 'pointer'
    },
    color: '#000000', 
    paddingRight: 45, 
    paddingTop: 10
  }
})

export default useStyle;