import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    titleField: {
      overflowWrap: 'break-word',
      width: '100%',
      border: 'none',
      fontSize: 45,
      '&:focus': {
        outline: 'none !important',
        borderLeft: '0px solid rgb(172, 172, 172)',
        borderBottom: '1px solid rgb(105, 105, 105)',
        width: '99%',
      },
      fontFamily: `'Lora', 'serif'`,
      lineHeight: '60px',
      resize: 'none',
      borderLeft: '1px solid rgb(105, 105, 105)',
      paddingLeft: 3,
    },
    imageUploadButton: {
      display: 'none',
    },
    imageUploadButtonIcon: {
      border: '1px solid #000000', 
      borderRadius: 100, 
      '&:hover': {
        cursor: 'pointer'
      },
      color: 'rgb(57,57,56)'
    },
    addOrChangeImg: {
      color: 'rgb(57,57,56)', 
      lineHeight: '38px', 
      paddingLeft: 8, 
      fontSize: 17, 
      fontFamily: `'Roboto Slab', 'serif'`,
    },
    discriptionField: {
      overflowWrap: 'break-word',
      width: '100%',
      border: 'none',
      '&:focus': {
        outline: 'none !important',
        borderLeft: '1px solid rgb(208, 208, 208)',
        borderRight: '1px solid rgb(208, 208, 208)',
        width: '99%'
      },
      resize: 'none',
      fontFamily: `'Faustina', 'serif'`,
      fontSize: 21,
      lineHeight: 1.5, 
      letterSpacing: 0.7,
      minHeight: 500,
      marginBottom: 60,
    },
    rightSideBar: {
      paddingLeft: 0, 
      // borderTop: '1px solid rgb(227, 227, 228)',

      marginBottom: 50, 
      paddingRight: 30, 
      paddingBottom: 40, 
      // borderLeft: '1px solid #E6E6E6'
      // borderBottom: '1px solid rgb(227, 227, 228)',
    },
    wordCount: {
      textAlign: 'right', 
      paddingRight: 4, 
      color: 'rgb(99,98,99)', 
      fontFamily: `'Roboto Slab', 'serif'`, 
      fontSize: 20, 
      marginBottom: 7,
    }
  })

  export default useStyle;