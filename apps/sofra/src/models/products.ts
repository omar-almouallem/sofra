import mongoose, { Schema } from 'mongoose';
import { IProductSchema } from '@sofra/types';

const ProductsSchema: Schema = new Schema({
    _id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 500 },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['available', 'unavailable'],
    default: 'available',
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'drink'],
    default: 'food',
  },
  isNewProduct: { type: Boolean, default: false },
});


const ProductsModel = mongoose.model<IProductSchema & Document>('Products', ProductsSchema);
export default ProductsModel;
