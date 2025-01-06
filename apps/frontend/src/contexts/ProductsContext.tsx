import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts } from '../services/product.service';

interface Product
{
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

interface ProductsContextProps
{
    products: Product[];
    isLoading: boolean;
    fetchProducts: () => void;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) =>
{
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchProducts = async () =>
    {
        try {
            setIsLoading(true);
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() =>
    {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, isLoading, fetchProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () =>
{
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};
