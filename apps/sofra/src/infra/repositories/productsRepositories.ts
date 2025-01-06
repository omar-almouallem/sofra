import {
  IInsertProducteInput,
  IProductSchema,
  IUserRepository,
  IUserSchema,
} from '@sofra/types';

import ProducteModel from '../../models/products';
import mongoose from 'mongoose';

export class MongoProducteRepository {
  async createProducte (product: IInsertProducteInput):Promise<IProductSchema> {
    const newProduct = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...product,
    };
    await ProducteModel.create(newProduct);
    console.log(newProduct)
    return this.getProducteById(newProduct._id);
  }

  async deleteProducteById (id: string) {
    await ProducteModel.findByIdAndDelete({ _id: id });
    return this.getProducteById(id);
  }

  async updateProducte (id: string, data: Partial<IInsertProducteInput>) {
    await ProducteModel.findByIdAndUpdate({ _id: id }, data, { new: true });
    return this.getProducteById(id);
  }

  async getAllProducte () {
    const productes = await ProducteModel.find({});
    console.log(productes);
    return productes;
  }

  getProducteByName (name: string) {
    const producte = ProducteModel.findOne({ name });
    return producte;
  }
  async getProducteById (id: string) :Promise<IProductSchema> {
   const  producte = await ProducteModel.findById( id);
   console.log(producte)
    return producte
  }
 

}
