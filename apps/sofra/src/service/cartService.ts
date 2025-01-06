import { ICartInput, IInsertCartInput } from '@sofra/types';

import { MongoCartRepository } from '../infra/repositories/cartRepositories';
import { MongoProducteRepository } from '../infra/repositories/productsRepositories';


export class CartService {
    cartRepository: MongoCartRepository;
    producteRepository: MongoProducteRepository;
  
    constructor() {
      this.cartRepository = new MongoCartRepository();
      this.producteRepository = new MongoProducteRepository(); 
    }
  
  async addToCart(data: ICartInput){
  
      const newCartItem = await this.cartRepository.createCart(data)
      return newCartItem
    
  }
  async getCartByUserId(userId: string) {
    const cart=  await this.cartRepository.findCartByUserId(userId);
      return cart
  }
  async getCartItems(userId: string) {
    const cartItems = await this.cartRepository.findCartByUserId(userId);
    return cartItems.map((item) => ({
      product: item.name,
      quantity: item.quantity,
      price: item.price 
    }));
  }
  async getCartById(id: string) {
    const cart=  await this.cartRepository.findCartById(id);
      return cart
  }
  async getProducteById(id: string) {
    const producte=  await this.producteRepository.getProducteById(id);
    console.log(`productexx:${producte}`)
      return producte
  }
  
  async removeFromCart(id:string,productId: string) {
    const cart = await this.cartRepository.deleteOneByUserIdAndProductId(id,productId);  
    return cart
  }


  async clearCart(userId: string) {
    const cart = await this.cartRepository.deleteCartsByUserId(userId);
    console.log(cart)
    return cart

  }
  async clearCarts(userId: string) {
    const cart = await this.cartRepository.findCartById(userId);
    return cart

  }
  async updateCart(userId: string,cartId: string,newData:any) {
    const cart = await this.cartRepository.updateCart(userId,cartId,newData);
    return cart

  }
  async getTotalPrice(userId: string):  Promise<number>  {
    const cartItems = await this.cartRepository.findCartByUserId(userId);
    const totalPrice = await Promise.all(
        cartItems.map(async (item) => {
            const productData = await this.getProducteById(item.productId);
            return productData.price * item.quantity;
        })
    ).then((prices) => prices.reduce((sum, price) => sum + price, 0));

    return  totalPrice 
}
}
