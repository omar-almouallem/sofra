import React from "react";
import ProductList from "../components/ProductList";
import { useProducts } from '../contexts/ProductsContext';

const DrinksPage = () =>
{
    const { products, isLoading } = useProducts();

    const drinkProducts = products.filter((product) => product.category === "drink");
    return (
        <>
            {isLoading ? (
                <p>Loading drink products...</p>
            ) : (
                <ProductList products={drinkProducts} isLoggedIn={false} />
            )}
        </>
    );
};

export default DrinksPage;
