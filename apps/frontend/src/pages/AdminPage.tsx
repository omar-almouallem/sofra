import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Home, Add, ListAlt,PendingActions   } from '@mui/icons-material'; // أيقونات MUI
import { Link } from 'react-router-dom';
import Master from "../assets/image/Master.png";


const drawerWidth = 240; 

const AdminPage: React.FC = () =>
{
    return (
        <Box display="flex">
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#1e293b',
                        color: '#f1f5f9',
                    },
                }}
            >
                <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                    <img
                        src={Master}
                        alt="Logo"
                        style={{ width: '80%', maxHeight: '60px', objectFit: 'contain' }}
                    />
                    <Typography variant="h6" component="div" color="inherit" sx={{ marginTop: '10px' }}>
                        لوحة التحكم
                    </Typography>
                </Toolbar>

                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/admin/products">
                            <ListItemIcon>
                                <ListAlt sx={{ color: '#f1f5f9' }} /> {/* أيقونة عرض المنتجات */}
                            </ListItemIcon>
                            <ListItemText primary="عرض المنتجات" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/admin/add-product">
                            <ListItemIcon>
                                <Add sx={{ color: '#f1f5f9' }} /> {/* أيقونة إضافة منتج */}
                            </ListItemIcon>
                            <ListItemText primary="إضافة منتج" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/admin/orders">
                            <ListItemIcon>
                                <PendingActions  sx={{ color: '#f1f5f9' }} /> {/* أيقونة إضافة منتج */}
                            </ListItemIcon>
                            <ListItemText primary="الطلبات" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            {/* محتوى الصفحة */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#eee', // خلفية فاتحة للمحتوى
                    p: 3,
                    minHeight: '100vh',
                }}
            >
                <Outlet /> {/* هون رح تنعرض الصفحات الفرعية */}
            </Box>
        </Box>
    );
};

export default AdminPage;
