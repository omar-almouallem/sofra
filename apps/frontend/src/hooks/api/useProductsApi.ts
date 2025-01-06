import { useState, useEffect } from 'react';
import {
  getProducts,
  deleteProducts,
  updateProducts,
} from '../../services/product.service';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const useProductsApi = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const deleteProduct = async (id: string) => {
    try {
      await deleteProducts(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProduct = async (id: string, updatedData: Partial<Product>) => {
    try {
      const response = await updateProducts(id, updatedData);
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? { ...product, ...response.data } : product,
        ),
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return { products, isLoading, deleteProduct, updateProduct, fetchProducts };
};
