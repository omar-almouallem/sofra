import { ICartSchema } from "../db";

export interface ICartInput {
    userId: string; 
    productId: string; 
    quantity: number; 
    price: number;
    name: string;
    image: string;

  }
 
  export type IInsertCartInput =Pick<ICartSchema,"userId" |"productId" |"quantity" >
