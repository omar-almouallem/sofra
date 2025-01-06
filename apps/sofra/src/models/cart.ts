import mongoose, { Schema } from 'mongoose';
import { ICartSchema } from '@sofra/types';

const CartSchema: Schema = new Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true, unique: true },
    image: {
        type: String,
        required: true,
      },  });

const UserModel = mongoose.model<ICartSchema & Document>('Cart', CartSchema);

export default UserModel;
