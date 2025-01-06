import {
    IInsertOrderInput
  } from '@sofra/types';
  
  import OrderModel from '../../models/orders';
  import mongoose from 'mongoose';
  
  export class MongoOrderRepository {
    async createOrder (order: IInsertOrderInput) {
      const newOrder = {
        _id: new mongoose.Types.ObjectId().toString(),
        status:"pending",
        ...order,
      };
      await OrderModel.create(newOrder);
      console.log(newOrder)
      return this.getOrderById(newOrder._id);
    }
  
    async deleteOrderById (id: string) {
      await OrderModel.findByIdAndDelete({ _id: id });
      return this.getOrderById(id);
    }
  
    async updateOrderById (id: string, status:string) {
      await OrderModel.findByIdAndUpdate({ _id: id }, {status}, { new: true });
      return this.getOrderById(id);
    }

    async getAllOrders () {
      const productes = await OrderModel.find({}).sort({_id:-1})
      console.log(productes);
      return productes;
    }
  
    getOrderByUserId (id: string) {
      const producte = OrderModel.find({ userId: id}).sort({ _id: -1 });
      return producte;
    }
    getOrderById (id: string) {
      const producte = OrderModel.findById({ _id: id });
      return producte;
    }
  }
  