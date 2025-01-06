import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ products, isLoggedIn }: any) =>
{
    return (
        <Grid container spacing={5} style={{ padding: "20px 35px" }}>
            {products.map((product: any) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <ProductCard product={product} isLoggedIn={isLoggedIn} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
