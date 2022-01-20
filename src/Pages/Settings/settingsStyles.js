import { makeStyles } from '@material-ui/core';


const useStyle = makeStyles({
  nameField: {
    border: 'none', 
    width: '420px',
    '&:focus': {
      outline: 'none !important',
      borderLeft: '0px solid rgb(172, 172, 172)',
      
    },
    borderBottom: '1px solid rgb(242,242,242)',
    resize: 'none',
    paddingTop: 14,
    paddingBottom: 7,
    fontSize: 16,
    overflowWrap: 'break-word',
    letterSpacing: 0.2,
    fontFamily: 'Roboto',
    lineHeight: 1.5
  },
  editBtn: {
    borderRadius: 40, 
    height: 40, 
    paddingTop: 8, 
    textTransform: 'none',
  },
  saveBtn: {
    borderRadius: 100, 
    paddingTop: 8, 
    height: 40, 
    color: 'rgb(15,115,12)', 
    borderColor: 'rgb(15,115,12)', 
    textTransform: 'none',
  },
  cancelEditBtn: {
    borderRadius: 100, 
    marginLeft: 20, 
    height: 40, 
    paddingTop: 8, 
    color: 'rgb(117,117,117)', 
    textTransform: 'none',
  },
  uploadImageBtn: {
    borderRadius: 100, 
    fontSize: 25,
    paddingTop: '36px',
    paddingLeft: '34px',
    color: 'rgb(201, 201, 201)'
  },
  uploadPhoto: {
    '&:hover': {
      cursor: 'pointer',
      filter: 'blur(1px)',
      '-webkit-filter': 'blur(1px)',
    },
  },
  passwordVisibilityIcon: {
    '&:hover': {
      cursor: 'pointer'
    },
    color: 'rgb(117,117,117)'
  }
})

export default useStyle