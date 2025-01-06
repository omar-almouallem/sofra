import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Select, MenuItem, FormControl, Button, CircularProgress, Box 
} from '@mui/material';
import axios from 'axios';

interface Order {
  _id: string;
  userId: string;
  products: { product: string; quantity: number; price: number }[];
  total_price: number;
  first_name: string;
  last_name: string;
  status: string;
  address?: string;
  notes?: string;
  created_at: string;
}

const statusOptions = ['pending', 'processing', 'completed', 'canceled'];
const statusLabels = {
  'pending': 'قيد الانتظار',
  'processing': 'قيد المعالجة',
  'completed': 'مكتمل',
  'canceled': 'ملغي'
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:27017/api/all/orders');
        setOrders(response.data);
      } catch (error) {
        setError('فشل في جلب الطلبات');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await axios.patch(`http://localhost:27017/api/orders/${orderId}/status`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.status } : order
        )
      );
    } catch (error) {
      setError('فشل في تحديث حالة الطلب');
    }
  };

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleNotes = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        طلبات المستخدمين
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>تحديث</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>الملاحظات</TableCell>
              <TableCell>إجمالي السعر</TableCell>
              <TableCell>الطلبية</TableCell>
              <TableCell>الاسم الأخير</TableCell>
              <TableCell>الاسم الأول</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStatusChange(order._id, order.status)}
                  >
                    تحديث
                  </Button>
                </TableCell>
                
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {statusLabels[status]} {/* عرض الحالة بالعربية */}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  {order.notes ? (
                    <>
                      <Box
                        sx={{
                          maxHeight: expandedOrderId === order._id ? 'none' : '100px',
                          maxWidth :"300px",
                          overflow: 'hidden',
                        }}
                      >
                        <Typography variant="body2">
                          {expandedOrderId === order._id ? order.notes : order.notes.length > 50 ? `${order.notes.substring(0, 50)}...` : order.notes}
                        </Typography>
                      </Box>
                      {order.notes.length > 100 && (
                        <Button
                          onClick={() => toggleNotes(order._id)}
                          size="small"
                        >
                          {expandedOrderId === order._id ? 'عرض أقل' : 'عرض المزيد'}
                        </Button>
                      )}
                    </>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      لا توجد ملاحظات
                    </Typography>
                  )}
                </TableCell>
                <TableCell>${order.total_price.toFixed(2)}</TableCell>
                <TableCell>
                  {order.products.map((product, index) => (
                    <Typography key={index}>
                      {product.product} (x{product.quantity}) - ${product.price}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>{order.last_name}</TableCell>
                <TableCell>{order.first_name}</TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrdersPage;
