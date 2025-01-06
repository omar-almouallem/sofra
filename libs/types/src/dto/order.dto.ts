import { IOrderSchema } from '../db';


export type IInsertOrderInput = Pick<IOrderSchema, |'userId'| 'first_name'
|   "last_name"|'products'|'total_price'|'address'|'notes'>
