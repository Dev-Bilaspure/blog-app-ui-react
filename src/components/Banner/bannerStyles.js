import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    image: {
      background: `url(${require('./../../utils/bannerImg.jpg')})  center/100% repeat-x #000`,
      height: '66vh',
      width: '100%',      
      objectFit: 'cover',
      color: '#fff',
      paddingLeft: 40,
      paddingTop: 20,
      backgroundSize: 'cover'
    },
    heading: {
      fontSize: '4rem', 
      lineHeight: 1.1, 
      textShadow: '0px 0px 7px #000000', 
      fontFamily: `'Roboto Slab', 'serif'`,
      marginRight: 60
    },
    subHeading: {
      width: '75%', 
      fontSize: '1.3rem', 
      paddingTop: 20, 
      textShadow: '0px 0px 18px #000000'
    },
    startWritingButton: {
      background: '#fff', 
      color: '#000000', 
      marginTop: 20, 
      borderRadius: 25, 
      width: 120, 
      paddingRight: 10, 
      paddingLeft: 10, 
      boxShadow: '0px 0px 10px #000000', 
      textTransform: 'none'
    }
  })

export default useStyle;