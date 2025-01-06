import { useFormik } from 'formik';
import React from "react";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { basicSignupValidationSchema } from '@sofra/validation';

import signupStyles from "./style";
import { BasicSignup } from '../../services/auth.service';

const SignupPage = () =>
{
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            first_name:'',
            last_name:'',
            confirmPassword: '',
        },
        validationSchema: basicSignupValidationSchema,
        validate: (values) =>
        {
            const errors: Record<string, string> = {};
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
            return errors;
        },
        onSubmit: async (values, { setErrors }) =>
        {
            try {
                const { confirmPassword, ...dataToSend } = values;
                const signupResponse = await BasicSignup(dataToSend);
                if (signupResponse.status === 200) {
                    navigate('/auth/login');
                    toast.success('Registration successful! You can now log in.');
                } else {
                    toast.error('Registration failed. Please try again.');
                }
            } catch (error: any) {
                if (error.response) {
                    const errorMessage = error.response.data.message;
                    setErrors({ email: errorMessage });
                }
            }
        },
    });

    return (
        <Box sx={signupStyles.container}>
            <Paper elevation={6} sx={signupStyles.paperBox}>
                <Typography variant="h4" mb={3} sx={signupStyles.title}>
                    تسجيل مستخدم جديد
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="الإيميل"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={signupStyles.input}
                    />
                    <TextField
                        label="الاسم الاول"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                        sx={signupStyles.input}
                    />
                    <TextField
                        label="الاسم الأخير"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && formik.errors.last_name}
                        sx={signupStyles.input}
                    />

                    <TextField
                        label="كلمة المرور"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        sx={signupStyles.input}
                    />
                    <TextField
                        label="تأكيد كلمة المرور"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        sx={signupStyles.input}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={signupStyles.button}
                        disabled={formik.isSubmitting}

                    >

                        {formik.isSubmitting ? (
                            <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                            "تسجيل الدخول"
                        )}
                    </Button>
                </form>
                <Typography mt={2} sx={signupStyles.linkText}>

                    {/* <a href="/login" style={{ color: "#fbcc0d", textDecoration: "none" }}>
                        سجل الدخول
                    </a>d */}
                    <Link style={{ color: "#442a00" }} to='/auth/login'>Login</Link>
                    عندك حساب؟{" "}
                </Typography>
            </Paper>
        </Box>
    );
};

export default SignupPage;
