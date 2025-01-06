import { IUserSchema } from '../collection/user-schema';
import { IInsertUserInput, IUpdateUserInput } from '../../dto';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<IUserSchema | undefined>;
  insertUser(data: IInsertUserInput): Promise<IUserSchema>;
  updateUserById(id: string, data: IUpdateUserInput): Promise<IUserSchema>;
  getUserById(id: string): Promise<IUserSchema>;
  deleteUser(id: string);
  getAllUsers(): Promise<IUserSchema[]>;
}
