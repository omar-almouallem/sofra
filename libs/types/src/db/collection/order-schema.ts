export interface IOrderSchema {
    _id: string;
    userId: string;
    first_name:string,
  last_name:string,
    products: Array<{
      product: string;
      quantity: number;
      price: number;
    }>;
    total_price: number 
    status: 'pending' | 'processing' | 'completed' | 'canceled';
    address: string;
    created_at:Date;
    notes?: string;
  }