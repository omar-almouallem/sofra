import { IOrderSchema } from '@sofra/types';
import mongoose, { Schema } from 'mongoose';

const OrdersSchema: Schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  products: [
    {
      product: { type: String,  required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ],
  total_price: {
    type: Number,
    required: true,
    min: 0,
  },
  first_name:{
    type:String,
    required: true,
  },
  last_name:{
    type:String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'canceled'],
    default: 'pending',
  },
  address: {
    type: String,
  },
  notes: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
},
{ timestamps: true },
);

const OrderModel = mongoose.model<IOrderSchema & Document>('Orders', OrdersSchema);
export default OrderModel;











