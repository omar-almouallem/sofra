import React, { useState } from 'react';
import
{
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { styled } from '@mui/system';

interface ProductInput
{
    name: string;
    description: string;
    price: number;
    category: string;
    status: string;
    image: File | null;
}

const themeColors = {
    primary: '#fbcc0d',
    secondary: '#442a00',
    border: '#6b5735',
    text: '#000000',
    background: '#FFFFFF',
};

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: '20px',
    maxWidth: '700px',
    margin: '40px auto',
    borderRadius: '10px',
    backgroundColor: themeColors.background,
    color: themeColors.text,
    border: `1px solid ${ themeColors.border }`,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
}));

const AddProductPage: React.FC = () =>
{
    const [product, setProduct] = useState<ProductInput>({
        name: '',
        description: '',
        price: 0,
        category: '',
        status: '',
        image: null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
    {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (
        e: React.ChangeEvent<{ name?: string; value: unknown; }>
    ) =>
    {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name as string]: value as string }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (e.target.files && e.target.files[0]) {
            setProduct((prev) => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        formData.append('category', product.category);
        formData.append('status', product.status);
        if (product.image) formData.append('image', product.image);

        await fetch('http://localhost:27017/api/producte/create', {
            method: 'POST',
            body: formData,
        });
        alert('تمت إضافة المنتج بنجاح!');
    };

    return (
        <Box
            sx={{
                backgroundColor: themeColors.background,
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <FormContainer elevation={3}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    style={{ color: themeColors.primary }}
                >
                    إضافة منتج جديد
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                    <TextField
                        label="اسم المنتج"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: { color: themeColors.text } }}
                    />
                    <TextField
                        label="الوصف"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: { color: themeColors.text } }}
                    />
                    <TextField
                        label="السعر"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: { color: themeColors.text } }}
                    />
                    <FormControl fullWidth>
                        <InputLabel style={{ color: themeColors.text }}>التصنيف</InputLabel>
                        <Select
                            value={product.category}
                            onChange={handleSelectChange}
                            name="category"
                            required
                        >
                            <MenuItem value="food">طعام</MenuItem>
                            <MenuItem value="drink">شراب</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel style={{ color: themeColors.text }}>الحالة</InputLabel>
                        <Select
                            value={product.status}
                            onChange={handleSelectChange}
                            name="status"
                            required
                        >
                            <MenuItem value="available">متاح</MenuItem>
                            <MenuItem value="unavailable">غير متاح</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        component="label"
                        style={{
                            backgroundColor: themeColors.primary,
                            color: themeColors.secondary,
                        }}
                    >
                        تحميل صورة المنتج
                        <input type="file" hidden onChange={handleImageChange} />
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{
                            backgroundColor: themeColors.primary,
                            color: themeColors.secondary,
                        }}
                    >
                        إضافة المنتج
                    </Button>
                </form>
            </FormContainer>
        </Box>
    );
};

export default AddProductPage;
