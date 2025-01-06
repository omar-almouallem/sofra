import React from 'react';
import
{
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Grid,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    InputAdornment,
    TextField as MuiTextField,
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import { useProductsApi } from '../hooks/api/useProductsApi';
import { useProductsUi } from '../hooks/ui/useProductsUI';

interface Product
{
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

const ProductsPage: React.FC = () =>
{
    const { products, isLoading, deleteProduct, updateProduct } = useProductsApi();
    const {
        searchQuery,
        dialogOpen,
        selectedProduct,
        updatedData,
        handleSearchChange,
        openDialog,
        closeDialog,
        handleInputChange,
    } = useProductsUi();
    const filteredProducts = products?.filter((product: any) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px', color: '#f7bc0b69' }}>
            {/* Header and Search Bar */}
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#d43f11' }}>
                المنتجات
            </Typography>
            <MuiTextField
                placeholder="ابحث عن منتج..."
                variant="outlined"
                fullWidth
                sx={{
                    marginBottom: '20px',
                    backgroundColor: '#d43f1',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#442a00',
                        },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search sx={{ color: '#442a00' }} />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => handleSearchChange(e.target.value)}
            />

            {/* Products Grid */}
            <Grid container spacing={3}>
                {filteredProducts?.map((product: any) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <Card sx={{ border: `1px solid #d9b209`, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image}
                                alt={product.name}
                                sx={{ objectFit: 'cover', backgroundColor: '#fbcc0d' }}
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" color="#442a00">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="#442a00">
                                    {product.description}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        marginTop: '10px',
                                        color: '#d9b209',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {product.price} ل.س
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', padding: '0 16px 16px' }}>
                                <IconButton
                                    size="small"
                                    sx={{ color: '#d9b209' }}
                                    onClick={() => openDialog(product)}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    sx={{ color: '#fbcc0d' }}
                                    onClick={() => deleteProduct(product._id)}
                                >
                                    <Delete />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Edit Product Dialog */}
            <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ backgroundColor: '#d9b209', color: '#442a00' }}>تعديل المنتج</DialogTitle>
                <DialogContent>
                    <TextField
                        label="اسم المنتج"
                        fullWidth
                        margin="normal"
                        value={updatedData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <TextField
                        label="الوصف"
                        fullWidth
                        margin="normal"
                        value={updatedData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <TextField
                        label="السعر"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={updatedData.price || ''}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    />
                    <TextField
                        label="رابط الصورة"
                        fullWidth
                        margin="normal"
                        value={updatedData.image || ''}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#fbcc0d' }}>
                    <Button onClick={closeDialog} sx={{ color: '#442a00' }}>
                        إلغاء
                    </Button>
                    <Button
                        onClick={() =>
                        {
                            updateProduct(selectedProduct._id, updatedData);
                            closeDialog();
                        }}
                        variant="contained"
                        sx={{ backgroundColor: '#442a00', color: '#fbcc0d' }}
                    >
                        حفظ
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProductsPage;
