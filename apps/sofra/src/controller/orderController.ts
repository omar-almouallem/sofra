import express, { Request, Response } from 'express';
import moment from 'moment';
import { decodeToken } from '@sofra/utils';
import {
  IOrderSchema,
  InvalidPasswordError,
  UserAlreadyExistsError,
  UserDoesNotExistError,
} from '@sofra/types';

import { handleResponseError } from '../lib/utils/errorHandler';
import { OrderService } from '../service/orderService';
import { getUserIdFromAccessToken } from '../lib/utils';
import { CartService } from '../service/cartService';
import { authorizeSuperAdmin } from '../middleware/authMiddleware';
import { AuthService } from '../service/authService';

const router = express.Router();
const orderService = new OrderService();
const cartService = new CartService();
const authService = new AuthService();



router.post(
  '/order',
  async (req: Request, res: Response) => {
    const userId = getUserIdFromAccessToken(req).id;
    const total_price = await cartService.getTotalPrice(userId)
    const products = await cartService.getCartItems(userId)
    const name = await authService.getUserName(userId)
    const first_name = name.first_name
    const last_name = name.last_name
    const { address,notes} = req.body;
    const body ={userId, first_name,last_name,products, total_price, address, notes};
    try {
      const order = await orderService.createOrder(body);
      console.log(order)
       await cartService.clearCart(userId)
      return res.json(order);
    } catch (e) {
      switch (true) {
        default:
          return handleResponseError(res, e);
      }
    }
  },
);

router.get(
  '/orders',
  async (req: Request, res: Response) => {
    try {
      const userId = getUserIdFromAccessToken(req).id;
      const orders = await orderService.getOrdersByUserId(userId)
      console.log(orders)
      return res.status(200).json(orders); 
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);

router.get(
  '/all/orders',
  async (req: Request,res: Response) => {
    try {
      const orders = await orderService.getProductes()
      console.log(orders)
      return res.status(200).json(orders); 
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);
router.patch(
  '/orders/:orderId/status',
  async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const { status: newStatus } = req.body;

      if (!newStatus || !['pending', 'processing', 'completed', 'canceled'].includes(newStatus)) {
        return res.status(400).json({ error: 'Invalid or missing status value' });
      }
      const updatedOrder = await orderService.updateProducte(orderId, newStatus);

      if (!updatedOrder) {
        return res.status(404).json({ error: `Order with ID ${orderId} not found` });
      }

      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating order status:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
