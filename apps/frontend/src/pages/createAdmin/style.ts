import BackgroundImage from '../../assets/image/20.jpg';

const signupStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: 2,
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // طبقة شفافة
      zIndex: 1,
    },
  },
  paperBox: {
    width: '100%',
    maxWidth: 400,
    padding: 4,
    borderRadius: 4,
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  title: {
    color: '#442a00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  input: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fbcc0d',
    },
  },
  button: {
    backgroundColor: '#fbcc0d',
    '&:hover': { backgroundColor: '#d9b209' },
    borderRadius: '20px',
    padding: '10px 20px',
    fontWeight: 'bold',
    marginTop: 2,
    width: '100%',
  },
  linkText: {
    color: '#442a00',
  },
};

export default signupStyles;
