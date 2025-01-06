import React from 'react';
import { BrowserRouter as Router, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/signup/SignupPage';
import LoginPage from '../pages/login/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import AddProductPage from '../pages/AddProductPage';
import AdminPage from '../pages/AdminPage';
import Cart from '../components/Cart';
import { ProductsProvider } from '../contexts/ProductsContext';
import Profile from '../pages/Profile';
import OrdersPage from '../pages/Orders';
import SuperAdminPage from '../pages/superAdminPage/SuperAdminPage';
import CreateAdminPage from '../pages/createAdmin/CreateAdminPage';
import PrivateRoute from './SuperAdminRoute';
import UnauthorizedPage from '../pages/UnauthorizedPage';

const Routes: React.FC = () => {
  return (
    <ProductsProvider>
      
      <Router>
        <RouterRoutes>
          <Route path="auth">
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="admin" element={
  <PrivateRoute allowedRoles={['admin']}>
  <AdminPage />
          </PrivateRoute>
        }>
            <Route path="products" element={<ProductsPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
          <Route
            path="super-admin"
            element={
              <PrivateRoute allowedRoles={['superAdmin']}>
              <SuperAdminPage />
              </PrivateRoute>
            }
          >
            <Route path="products" element={<ProductsPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="creat/admin" element={<CreateAdminPage />} />
          </Route>
          <Route path="Cart" element={<Cart />} />
          <Route path="Unauthorized" element={<UnauthorizedPage />} />
          <Route path="Home" element={<HomePage />} />
          <Route path="Profile" element={<Profile />} />
        </RouterRoutes>
      </Router>
    </ProductsProvider>
  );
};

export default Routes;
