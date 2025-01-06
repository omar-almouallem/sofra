import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/Home'); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: '#f9f9f9',
        padding: 3,
      }}
    >
      <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', color: '#ff4d4f', mb: 2 }}>
        غير مصرح بالدخول
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
        لا يمكنك الوصول إلى هذه الصفحة. تأكد من امتلاكك الصلاحيات اللازمة.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ padding: '10px 20px', borderRadius: '8px' }}
      >
        العودة إلى الصفحة الرئيسية
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
