import { useEffect, useState } from 'react';

import {  getOrders } from '../../services/order.service';

export const useCartApi = () => {
  const [orders, setOrders] = useState<any>([]);  

  const getUserOrders = async () => {
    try {
      const data = await getOrders();  
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return {
    orders
  };
};
