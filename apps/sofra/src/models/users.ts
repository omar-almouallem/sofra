import mongoose, { Schema } from 'mongoose';
import { IUserSchema } from '@sofra/types';

const UsersSchema: Schema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  first_name:{
    type:String,
    required: true,
  },
  last_name:{
    type:String,
    required: true,
  },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  refreshToken: { type: String },
});

const UserModel = mongoose.model<IUserSchema & Document>('Users', UsersSchema);

export default UserModel;
