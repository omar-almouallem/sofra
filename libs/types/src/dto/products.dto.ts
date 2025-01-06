import { IProductSchema } from '../db';

export type IInsertProducteInput = Pick<IProductSchema, 'name' | "price"|
"description"|
"image"|
"status"|
"category">
