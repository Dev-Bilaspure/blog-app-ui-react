import {makeStyles} from '@material-ui/core';


const useStyle = makeStyles({
  navbar: {
    background: '#fff',
    height: 70,
    // marginLeft: 10,
    // marginRight: 40,
    boxShadow: 'none',
    borderBottom: '1px solid rgb(150,150,150)',
    paddingTop: 2
  },
  logoAndLogoText: {
    color: 'rgb(31,31,31)',
    marginRight: 30,
    marginLeft: 20,
  },
  logoText: {
    display: 'inline', 
    fontFamily: `'Abril Fatface', 'cursive'`, 
    fontSize: 32, 
    paddingLeft: 10,
  },
  navbarBasicMenu: {
    marginRight: 30,
    marginLeft: 10
  },
  getStartedBnt: {
    borderRadius: 100, 
    background: 'rgb(31,31,31)', 
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
  },
  signInBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
})

export default useStyle;