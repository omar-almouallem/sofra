import BackgroundImage from '../../assets/image/21.jpg';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: 2,
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
  formBox: {
    backgroundColor: 'rgba(255, 255, 255)',
    padding: 4,
    borderRadius: 2,
    boxShadow: 3,
  },
  title: {
    color: '#442a00',
    textAlign: 'center',
  },
  input: {
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& fieldset': { borderColor: '#fbcc0d' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6b5735' },
  },
  button: {
    mt: 2,
    backgroundColor: '#d43f11',
    '&:hover': { backgroundColor: '#442a00' },
  },
  linkText: {
    textAlign: 'center',
    color: '#6b5735',
  },
};

export default styles;
