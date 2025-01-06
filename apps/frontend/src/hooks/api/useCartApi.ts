import { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext'; 
import { calculateTotalPrice, handleQuantityChange, handleRemoveProduct } from '../../services/cart.service';

export const useCartApi = () => {
  const { cart, fetchCart } = useCart(); 
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotal = async () => {
    try {
      const total = await calculateTotalPrice();
      setTotalPrice(total.totalPrice); 
    } catch (error) {
      console.error('Error calculating total price:', error);
    }
  };

  const updateCartItemQuantity = async (cartId: string, newQuantity: number) => {
    try {
      await handleQuantityChange(cartId, newQuantity);
      await fetchCart(); 
      await calculateTotal(); 
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  // Remove a cart item
  const removeCartItem = async (productId: string) => {
    try {
      await handleRemoveProduct(productId);
      await fetchCart(); // Re-fetch the cart after removal
      await calculateTotal(); // Recalculate the total after removal
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  useEffect(() => {
    calculateTotal(); // Recalculate total price on component mount
  }, [cart]);

  return {
    cart,
    totalPrice,
    fetchCart,
    updateCartItemQuantity,
    removeCartItem,
  };
};
