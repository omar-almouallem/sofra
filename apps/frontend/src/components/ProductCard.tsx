import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../config";

const ProductCard = ({ product }: any) =>
{
    console.log(product)
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () =>
    {
        setShowFullDescription(!showFullDescription);
    };

    const getShortDescription = (description: string) =>
    {
        const maxLength = 25;
        if (description.length <= maxLength) return description;
        return description.slice(0, maxLength) + "...";
    };

    const apiClient = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      apiClient.interceptors.request.use(
          (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
    const handleAddToCart = async () =>
    {
        try
        {
            
            const response = await apiClient.post(
                "/cart", // استبدل `/api/cart` بمسار الـ API الفعلي إذا لزم الأمر
                {
                    productId: product._id, // الـ ID الخاص بالمنتج
                    quantity: 1, // الكمية الافتراضية
                    price:product.price,
                    name:product.name,
                    image:product.image,

                },

            );

            if (response.status === 201)
            {
                alert("Product added to cart successfully!");
            }
            console.log(response.data)
        } catch (error)
        {
            console.error("Error adding product to cart:", error);
            alert("Failed to add product to cart. Please try again.");
        }
    };

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {showFullDescription
                        ? product.description
                        : getShortDescription(product.description)}
                </Typography>
                {product.description.length > 20 && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={toggleDescription}
                        sx={{ padding: 0, textTransform: "none", marginTop: 1 }}
                    >
                        {showFullDescription ? "عرض أقل" : "عرض المزيد"}
                    </Button>
                )}
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    ل.س{product.price}
                </Typography>
                <Button
                    variant="contained"
                    sx={{ marginTop: 2 ,backgroundColor:"#d43f11"}}
                    onClick={handleAddToCart} // استدعاء الدالة عند النقر
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
