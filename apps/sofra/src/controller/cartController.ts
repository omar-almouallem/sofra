import express, { Request, Response } from 'express';

import {
  IBasicLoginInput,
  IBasicSignupInput,
  ICartInput,
  IInsertCartInput,
  InvalidPasswordError,
  UserAlreadyExistsError,
  UserDoesNotExistError,
} from '@sofra/types';

import { UserMapper } from '../lib/mappers/user.mapper';

import { handleResponseError } from '../lib/utils/errorHandler';
import { CartService } from '../service/cartService';
import { getUserIdFromAccessToken } from '../lib/utils';

const router = express.Router();
const cartService = new CartService();

router.post(
  '/cart',
  async (req: Request, res: Response) => {
    try {
      const userId = getUserIdFromAccessToken(req).id;
      const { productId, quantity, price,
        name,
        image} = req.body;
      const data: ICartInput = { userId, productId, quantity, price,name,image,};
      const cart = await cartService.addToCart(data);
      return res.status(201).json(cart); 
    } catch (error) {
      console.error("Error ", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);
router.put('/cart', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromAccessToken(req).id; 
    const { cartId, newData } = req.body;  
    const updatedCart = await cartService.updateCart(userId, cartId, newData);
    console.log(cartId)
    console.log(newData)
    console.log(updatedCart)
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error in updating cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.get(
  '/cart',
  async (req: Request, res: Response) => {
    try {
      const user = getUserIdFromAccessToken(req);
      const cart = await cartService.getCartByUserId(user.id);
      return res.status(201).json(cart); 
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);
router.get(
  '/cart/total',
  async (req: Request, res: Response) => {
    try {
      const userId = getUserIdFromAccessToken(req).id
      const totalPrice = await cartService.getTotalPrice(userId);
      console.log(totalPrice)
      return res.status(200).json({ totalPrice }); 
    } catch (error) {
      console.error("Error calculating total price:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);
router.delete('/cart/', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromAccessToken(req).id;
    const { productId } = req.body; 
    const result = await cartService.removeFromCart(userId, productId);
    console.log('Product removed:', result);
    return res.status(200).json({ message: 'Product removed successfully', result });
  } catch (error) {
    console.error('Error removing product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
