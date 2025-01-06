import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

import { useCartApi } from '../hooks/api/useCartApi';
import OrderDialog from './OrderDialog';

const Cart = () => {
  const {
    cart,
    totalPrice,
    updateCartItemQuantity,
    removeCartItem,
  } = useCartApi();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const areas = [
    'المزة',
    'المالكي',
    'باب توما',
    'القابون',
    'البرامكة',
    'الشعلان',
    'ركن الدين',
    'كفرسوسة',
  ];

  const handleConfirmOrder = (address: string, notes: string) => {
    console.log('Address:', address);
    console.log('Notes:', notes);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Your Shopping Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.length > 0 ? (
              cart.map((item: any) => (
                <TableRow key={item.productId}>
                  <TableCell align="left">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="left">${item.price}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}
                      sx={{ color: 'primary.main' }}
                    >
                      <Add />
                    </IconButton>
                    {item.quantity}
                    <IconButton
                      onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      sx={{ color: 'secondary.main' }}
                    >
                      <Remove />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => removeCartItem(item.productId)}
                      sx={{ color: 'error.main' }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6" color="text.secondary">
                    No items in your cart.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="h5"
        sx={{
          mt: 4,
          fontWeight: 'bold',
          backgroundColor: '#f0f0f0',
          padding: '10px 20px',
          borderRadius: '8px',
        }}
      >
        Total Price: ${totalPrice}
      </Typography>

      {/* زر فتح المربع */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={() => setIsDialogOpen(true)}
      >
        تأكيد الطلب
      </Button>

      {/* استدعاء المربع */}
      <OrderDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmOrder}
        areas={areas}
      />
    </Container>
  );
};

export default Cart;
