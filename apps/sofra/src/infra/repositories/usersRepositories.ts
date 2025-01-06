import { IInsertUserInput, IUserRepository, IUserSchema } from '@sofra/types';
import mongoose from 'mongoose';

import UsersModel from '../../models/users';

export class MongoUsersRepository implements IUserRepository {
  async insertUser (user: IInsertUserInput): Promise<IUserSchema> {
    const newUser = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...user,
    };
    await UsersModel.create(newUser);
    console.log(newUser);
    return this.getUserById(newUser._id);
  }
  async createAdmin (admin: IInsertUserInput): Promise<IUserSchema> {
    const newUser = {
      _id: new mongoose.Types.ObjectId().toString(),
      role: 'admin',
      ...admin,
    };
    await UsersModel.create(newUser);
    console.log(newUser);
    return this.getUserById(newUser._id);
  }

  async deleteUser (email: string) {
    const result = await UsersModel.deleteOne({ email });
  }
  static async deleteUserByEmail (email: string) {
    return UsersModel.deleteOne({ email });
  }
  async updateUserById (id: string, data: any): Promise<IUserSchema> {
    await UsersModel.findByIdAndUpdate({ _id: id }, data, { new: true });
    return this.getUserById(id);
  }

  async getAllUsers (): Promise<IUserSchema[]> {
    const users = await UsersModel.find({});
    return users;
  }

  async getUserByEmail (email: string): Promise<IUserSchema> {
    const user = await UsersModel.findOne({ email });
    return user;
  }

  getUserById (id: string): Promise<IUserSchema> {
    const user = UsersModel.findById({ _id: id });

    return user;
  }
}
