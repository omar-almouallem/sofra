import { useState } from 'react';

export const useProductsUi = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [updatedData, setUpdatedData] = useState<any>({});

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const openDialog = (product: any) => {
    setSelectedProduct(product);
    setUpdatedData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
    setUpdatedData({});
  };

  const handleInputChange = (field: string, value: string | number) => {
    setUpdatedData((prev: any) => ({ ...prev, [field]: value }));
  };

  return {
    searchQuery,
    dialogOpen,
    selectedProduct,
    updatedData,
    handleSearchChange,
    openDialog,
    closeDialog,
    handleInputChange,
  };
};
