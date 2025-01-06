import {
    ICartInput, ICartSchema, IInsertCartInput
  } from '@sofra/types';
  
  import CartModel from '../../models/cart';
  import mongoose from 'mongoose';
  
  export class MongoCartRepository {
     async createCart(cart: ICartInput):Promise<ICartSchema> {
          const newCart = {
              _id: new mongoose.Types.ObjectId().toString(),
              ...cart,
            };
            await CartModel.create(newCart);
            return this.findCartById(newCart._id);
            
        }
        
        async findCartByUserId(userId: string) {
          return await CartModel.find({ userId });
        }
        
        async updateCart(userId: string, cartId: string, updateData: Partial<IInsertCartInput>) {
          const cart  = await CartModel.findOneAndUpdate(
            { _id: cartId, userId },  
            updateData,               
            { new: true }             
          ); 
          return this.findCartById(cartId)
        }
        async deleteCart(cartId: string) {
          return await CartModel.findByIdAndDelete(cartId);
        }
        async findCartById(cartId: string) :Promise<ICartSchema>{
          const ca =  await CartModel.findById(cartId);
          console.log(ca)
          return ca
        }
        async findOneByUserIdAndProductId(
          userId: string,
          productId: string
        ) {
          return await CartModel.findOne({ userId, productId });
        }
        async deleteOneByUserIdAndProductId(
          userId: string,
          productId: string
        ) {
          return await CartModel.deleteOne({ userId, productId });
        }
        async deleteCartsByUserId(userId: string): Promise<void> {
          await CartModel.deleteMany({ userId });
      }
  }
 