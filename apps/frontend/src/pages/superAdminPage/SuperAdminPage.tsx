import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { ManageAccounts, Add, ListAlt, PendingActions, ExitToApp } from '@mui/icons-material'; 
import { Link } from 'react-router-dom';
import Master from "../../assets/image/Master.png";
import superAdminPageStyles from './style'; 
import { useAuth } from '../../contexts/AuthContext';

const SuperAdminPage: React.FC = () => {
  const { logout } = useAuth(); 
const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/home')
};  return (
    <div>
      <Box
        component="main"
        sx={{
          paddingLeft: "300px"
        }}
      >
        {/* Default Content if no Outlet */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mt: 4 }}>
          أهلاً بك في لوحة تحكم السوبر أدمن
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          استخدم الشريط الجانبي للتنقل بين الخيارات مثل إدارة المنتجات، إنشاء حسابات مدير جديدة، أو عرض الطلبات.
        </Typography>

        {/* Renders child components */}
        <Outlet />
      </Box>
      <Box display="flex">
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          anchor="left"
          sx={superAdminPageStyles.drawer} 
        >
          <Toolbar sx={superAdminPageStyles.toolbar}>
            <img
              src={Master}
              alt="Logo"
              style={superAdminPageStyles.logo}
            />
            <Typography variant="h6" component="div" color="inherit" sx={superAdminPageStyles.title}>
              لوحة التحكم
            </Typography>
          </Toolbar>

          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/super-admin/products">
                <ListItemIcon>
                  <ListAlt sx={superAdminPageStyles.icon} />
                </ListItemIcon>
                <ListItemText primary="عرض المنتجات" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/super-admin/creat/admin">
                <ListItemIcon>
                  <ManageAccounts sx={superAdminPageStyles.icon} />
                </ListItemIcon>
                <ListItemText primary="انشاء حساب مدير" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/super-admin/add-product">
                <ListItemIcon>
                  <Add sx={superAdminPageStyles.icon} />
                </ListItemIcon>
                <ListItemText primary="إضافة منتج" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/super-admin/orders">
                <ListItemIcon>
                  <PendingActions sx={superAdminPageStyles.icon} />
                </ListItemIcon>
                <ListItemText primary="الطلبات" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              {/* Logout Button */}
              <ListItemButton onClick={(e) =>handleLogout()}>
                <ListItemIcon>
                  <ExitToApp sx={superAdminPageStyles.icon} />
                </ListItemIcon>
                <ListItemText primary="تسجيل الخروج" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default SuperAdminPage;
