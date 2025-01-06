import { IUserSchema } from '@sofra/types';

export class UserMapper {
  static dbToJSON (user: IUserSchema) {
    return {
      id: user._id,
      email: user.email,
    };
  }
}
