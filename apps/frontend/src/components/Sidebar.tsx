import React from 'react';
import { List, ListItem, ListItemText, Drawer, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () =>
{
    const navigate = useNavigate();

    const menuItems = [
        { text: 'عرض المنتجات', path: '/poduct/' },
        { text: 'إضافة منتج', path: '/poduct/add-product' },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" align="center">
                    لوحة التحكم
                </Typography>
            </Box>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => navigate(item.path)}
                    >
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
