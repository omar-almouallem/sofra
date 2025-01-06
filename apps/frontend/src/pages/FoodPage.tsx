import React from "react";
import ProductList from "../components/ProductList";
import { useProducts } from '../contexts/ProductsContext';

const FoodPage = () =>
{
    const { products, isLoading } = useProducts();
    const foodProducts = products.filter((product) => product.category === "food");

    return (
        <>
            {isLoading ? (
                <p>Loading food products...</p>
            ) : (
                <ProductList products={foodProducts} isLoggedIn={false} />
            )}
        </>
    );
};

export default FoodPage;
