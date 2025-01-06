import { IUserSchema } from '../db';

export interface IBasicSignupInput {
  email: string;
  password: string;
  first_name: string;
  last_name:string
  role?: string;
}
export interface IBasicLoginInput {
  email: string;
  password: string;
}

export type IInsertUserInput = Pick<IUserSchema, 'email' | 'password' | "first_name" | "last_name">;

export type IUpdateUserInput = Partial<IUserSchema>;
