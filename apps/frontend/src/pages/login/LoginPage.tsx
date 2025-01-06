import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  
} from '@mui/material';

import styles from './style';
import { BasicLogin } from '../../services/auth.service';
import { basicLoginValidationSchema } from '@sofra/validation';
import { useAuth } from '../../contexts/AuthContext';
import { decodeToken } from '../../utils/auth-utils';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const {  setIsAuthenticated} = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: basicLoginValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await BasicLogin(values);
        const token = localStorage.getItem('accessToken');
        if (token) {
          const role = decodeToken(token).role;
          {
            navigate(
              role === 'superAdmin'
                ? '/super-admin'
                : role === 'admin'
                ? '/admin'
                : '/home',
            )
          }
        }
        if (response.status === 200) {
          setIsAuthenticated(true)
        } else {
          toast.error('فشل تسجيل الدخول، الرجاء المحاولة مرة أخرى.');
        }
      } catch (error: any) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          errorMessage === 'Invalid password'
            ? setErrors({ password: errorMessage })
            : setErrors({ email: errorMessage });
        }
      }
    
    },
    
  });

  return (
    <Box sx={styles.container}>
      <Paper elevation={6} sx={styles.paperBox}>
        <Typography variant='h4' mb={3} sx={styles.title}>
          تسجيل الدخول
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label='الإيميل'
            variant='outlined'
            fullWidth
            margin='normal'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={styles.input}
          />
          <TextField
            label='كلمة المرور'
            type='password'
            variant='outlined'
            fullWidth
            margin='normal'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={styles.input}
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={styles.button}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'تسجيل الدخول'
            )}
          </Button>
        </form>
        <Typography mt={2} sx={styles.linkText}>
          <Link style={{ color: '#442a00' }} to='/auth/signup'>
            Signup
          </Link>
          ما عندك حساب؟ سجل الان
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
