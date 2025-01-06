import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { CheckCircleOutline, Close } from '@mui/icons-material';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useCart } from '../contexts/CartContext';
import { addOrder } from '../services/order.service';

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (address: string, notes: string) => void;
  areas: string[];
}

const OrderDialog: React.FC<OrderDialogProps> = ({ open, onClose, onConfirm, areas }) => {
  const { setCart } = useCart(); 

  const handleSubmit = async (values: { address: string; notes: string }) => {

    const orderData = {
      address: values.address,
      notes: values.notes || '',
    };
console.log(orderData)
    try {
      const response = await addOrder(orderData);
      if (response.status === 200) {
        toast.success("تم إرسال الطلب بنجاح!");
        onClose(); 
        setCart([])
      }
    } catch (error) {
      toast.error("فشل في إرسال الطلب، الرجاء المحاولة لاحقاً.");
      console.error("Error while submitting order:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '90%',
          maxWidth: 500,
          padding: 2,
          borderRadius: 3,
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 'bold' }}>
        <CheckCircleOutline sx={{ fontSize: 50, color: 'green' }} />
        <Typography variant="h5" sx={{ mt: 1 }}>
          تأكيد الطلب
        </Typography>
      </DialogTitle>
      <Formik
        initialValues={{ address: '', notes: '' }}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <DialogContent>
              <Typography sx={{ mb: 2, textAlign: 'center', color: '#555' }}>
                يرجى تحديد العنوان وإضافة أي ملاحظات.
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>اختيار العنوان</InputLabel>
                <Select
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                >
                  {areas.map((area, index) => (
                    <MenuItem key={index} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
                {touched.address && errors.address && (
                  <Typography color="error" variant="caption">
                    {errors.address}
                  </Typography>
                )}
              </FormControl>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ملاحظاتك"
                name="notes"
                value={values.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="أي تفاصيل إضافية للطلب"
                error={touched.notes && Boolean(errors.notes)}
                helperText={touched.notes && errors.notes}
              />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
              <Button
                onClick={onClose}
                color="secondary"
                startIcon={<Close />}
                sx={{
                  fontWeight: 'bold',
                  borderColor: 'secondary.main',
                }}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<CheckCircleOutline />}
              >
                إرسال الطلب
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default OrderDialog;
