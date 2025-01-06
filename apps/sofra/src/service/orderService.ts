import { IInsertOrderInput } from '@sofra/types';
import { MongoOrderRepository } from '../infra/repositories/orderRepositories';
import { calculateTotalPrice } from '../lib/utils/calculateOrder';
import { MongoUsersRepository } from '../infra/repositories/usersRepositories';

export class OrderService {
  orderRepository: MongoOrderRepository;
  

  constructor () {
    this.orderRepository = new MongoOrderRepository();
  }

  async createOrder (data: IInsertOrderInput) {
    const producte = await this.orderRepository.createOrder(data);
    return producte;
  }
  async updateProducte (orderId: string, newStatus:string) {
    const updatedProducte = await this.orderRepository.updateOrderById(
      orderId,
      newStatus,
    );
    return updatedProducte;
  }
  async deletProducte (id: string) {
    const deletedProducte = await this.orderRepository.deleteOrderById(
      id,
    );
    return deletedProducte;
  }
  async getProductes () {
    const allProductes = await this.orderRepository.getAllOrders();
    return allProductes;
  }
  async getOrdersByUserId(id:string) {
    const allUserOrders = await this.orderRepository.getOrderByUserId(id);
    return allUserOrders;
  }
}
