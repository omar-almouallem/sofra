import React, { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'; 
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../contexts/AuthContext";
import { API_BASE_URL } from "../config";

interface Order {
  _id: string;
  products: { product: string; quantity: number; price: number; }[];
  total_price: number;
  created_at: string;
  status: string;
}

const Profile: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("يجب تسجيل الدخول للوصول إلى صفحة البروفايل", { position: "top-right" });
      return;
    }

    const apiClient = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('/orders'); 
        setOrders(response.data);
        setFilteredOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("خطأ في جلب البيانات: ", error);
        toast.error("حدث خطأ أثناء جلب البيانات", { position: "top-right" });
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const status = event.target.value as string;
    setStatusFilter(status);

    if (status === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#28a745"; // Green for completed
      case "processing":
        return "#ff9900"; // Orange for processing
      case "pending":
        return "#007bff"; // Blue for pending
      default:
        return "#6c757d"; // Grey for other statuses
    }
  };

  return (
    <Container
      style={{
        marginTop: "40px",
        background: "#f0f0f0", 
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        maxWidth: "1000px",
        overflow: "hidden"
      }}
    >
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          fontWeight: "700",
          color: "#343a40", 
          marginBottom: "20px",
          fontSize: "2rem"
        }}
      >
        صفحة الطلبات
      </Typography>

      <FormControl
        style={{
          marginBottom: "20px",
          minWidth: 200,
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          padding: "8px"
        }}
      >
        <InputLabel>حالة الطلب</InputLabel>
        <Select
          value={statusFilter}
          onChange={handleFilterChange}
          style={{
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "16px",
            color: "#495057",
          }}
        >
          <MenuItem value="all">الكل</MenuItem>
          <MenuItem value="pending">قيد الانتظار</MenuItem>
          <MenuItem value="processing">قيد التحضير</MenuItem>
          <MenuItem value="completed">مكتمل</MenuItem>
        </Select>
      </FormControl>

      {/* عرض الطلبات */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <Typography variant="h6" style={{ textAlign: "center", color: "#333", fontWeight: "bold" }}>
          لا توجد طلبات حسب الفلتر المحدد
        </Typography>
      ) : (
        filteredOrders.map((order) => (
          <Box
            key={order._id} 
            style={{
              backgroundColor: "#ffffff",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow: "0 4px 25px rgba(0, 0, 0, 0.1)",
              transform: "scale(1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
              }
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                color: statusColor(order.status),
                textAlign: "center",
                marginBottom: "15px",
                fontSize: "1.2rem"
              }}
            >
              {order.status === "pending" && "قيد الانتظار"}
              {order.status === "processing" && "قيد التحضير"}
              {order.status === "completed" && "مكتمل"}
            </Typography>

            <Typography
              variant="body2"
              style={{
                marginBottom: "10px",
                textAlign: "center",
                color: "#6c757d",
              }}
            >
              التاريخ: {new Date(order.created_at).toLocaleDateString()}
            </Typography>

            {order.products?.map((product, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                  padding: "10px",
                  borderBottom: "1px solid #dee2e6"
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "bold",
                    color: "#d43f11" // تغيير اللون هنا
                  }}
                >
                  {product.product}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: "#d43f11", // تغيير اللون هنا
                    fontWeight: "600"
                  }}
                >
                  {product.quantity} × {product.price} ل.س
                </Typography>
              </Box>
            ))}

            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#495057",
                fontSize: "1.2rem"
              }}
            >
              السعر الإجمالي: {order.total_price} ل.س
            </Typography>
          </Box>
        ))
      )}

      <ToastContainer />
    </Container>
  );
};

export default Profile;
