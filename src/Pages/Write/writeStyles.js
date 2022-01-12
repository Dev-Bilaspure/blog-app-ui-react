import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    titleField: {
      overflowWrap: 'break-word',
      width: '100%',
      border: 'none',
      fontSize: 50,
      '&:focus': {
        outline: 'none !important',
      },
      fontFamily: `'Lora', 'serif'`,
      lineHeight: '60px',
      resize: 'none'
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
      },
      resize: 'none',
      fontFamily: `'Faustina', 'serif'`,
      fontSize: 21,
      lineHeight: 1.5, 
      letterSpacing: 0.7,
      minHeight: 400
    },
    rightSideBar: {
      width: '85%',
      paddingLeft: 5, 
      borderTop: '1px solid rgb(227, 227, 228)', 
      paddingTop: 20,
      marginTop: 10, 
      marginBottom: 50, 
      paddingRight: 0, 
      paddingBottom: 40, 
      borderBottom: '1px solid rgb(227, 227, 228)',
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