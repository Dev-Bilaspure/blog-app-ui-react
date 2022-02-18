import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  image: {
    background: `url(${require('./../../utils/bannerImg.jpg')})  center/100% repeat-x #000`,
    // height: '80vh',
    width: '100%',      
    objectFit: 'cover',
    color: '#fff',
    // paddingLeft: 10,
    paddingTop: 30,
    paddingBottom: 60,
    backgroundSize: 'cover',
    // marginTop: 60
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
    textTransform: 'none',
    '&:hover': {
      background: '#fff', 
      color: '#000000', 
      boxShadow: '0px 0px 3px #000000', 
    },
  },
  toGivePadding: {
    paddingLeft: 40
  },

  '@media only screen and (max-width: 800px)': { 
    heading: {
        fontSize: '3.1rem'
    },
    subHeading: {
        fontSize: '1.2rem' 
    }
  },
  
  '@media only screen and (max-width: 600px)': { 
    heading: {
        fontSize: '2.8rem' 
    },
    subHeading: {
        fontSize: '1.1rem '
    },
    startWritingButton: {
        width: 110, 
        paddingRight: 10, 
        paddingLeft: 10, 
        fontSize: 13,
    },
    toGivePadding: {
        paddingLeft: 30
    }
  },
  
  '@media only screen and (max-width: 400px)': { 
    toGivePadding: {
      paddingLeft: 20
    }
  }
})

export default useStyle;