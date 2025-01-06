import { IInsertProducteInput } from '@sofra/types';
import { MongoProducteRepository } from '../infra/repositories/productsRepositories';
import { string } from 'yup';
import mongoose from 'mongoose';

export class ProductsService {
  producteRepository: MongoProducteRepository;

  constructor () {
    this.producteRepository = new MongoProducteRepository();
  }

  async createProducte (data: IInsertProducteInput) {
    const producte = await this.producteRepository.createProducte(data);
    console.log(`producte :${producte}`)
    return producte;
  }
  async updateProducte (id: string, data: Partial<IInsertProducteInput>) {
    const updatedProducte = await this.producteRepository.updateProducte(
      id,
      data,
    );
    return updatedProducte;
  }
  async deletProducte (id: string) {
    const deletedProducte = await this.producteRepository.deleteProducteById(
      id,
    );
    return deletedProducte;
  }
  async getProductes () {
    const allProductes = await this.producteRepository.getAllProducte();
    return allProductes;
  }

}
