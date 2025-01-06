import moment from 'moment';
import {
  IBasicLoginInput,
  IBasicSignupInput,
  InvalidPasswordError,
  UserAlreadyExistsError,
  UserDoesNotExistError,
} from '@sofra/types';
import { compareWithHash, createJwtToken, hash } from '@sofra/utils';
import { ACCESS_TOKEN_TTL_MINS, REFRESH_TOKEN_TTL_MONTHS } from '../constants';

import { MongoUsersRepository } from '../infra/repositories/usersRepositories';
import { UserMapper } from '../lib/mappers/user.mapper';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config';

export class AuthService {
  userRepository: MongoUsersRepository;
  constructor () {
    this.userRepository = new MongoUsersRepository();
  }
  async registerUser (input: IBasicSignupInput) {
    const existingUser = await this.userRepository.getUserByEmail(input.email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }
    const user = await this.userRepository.insertUser({
      ...input,
      password: await hash(input.password),
    });
    await hash(input.password);
    return user;
  }
  async createAdmin (input: IBasicSignupInput) {
    const existingUser = await this.userRepository.getUserByEmail(input.email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const admin = await this.userRepository.createAdmin({
      ...input,
      password: await hash(input.password),
    });

    await hash(input.password);
    return admin;
  }

  async loginUser (input: IBasicLoginInput) {
    const user = await this.userRepository.getUserByEmail(input.email);
    if (!user) {
      throw new UserDoesNotExistError();
    }
    const isValidPassword = await compareWithHash(
      input.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new InvalidPasswordError();
    }
    const accessTokenTTL = moment
      .duration(ACCESS_TOKEN_TTL_MINS, 'minute')
      .asSeconds();
    const accessToken = createJwtToken(
      { ...UserMapper.dbToJSON(user), role: user.role },
      ACCESS_TOKEN_SECRET,
      accessTokenTTL,
    );

    const refreshTokenTTL = moment
      .duration(REFRESH_TOKEN_TTL_MONTHS, 'months')
      .asSeconds();
    const refreshToken = createJwtToken(
      UserMapper.dbToJSON(user),
      REFRESH_TOKEN_SECRET,
      refreshTokenTTL,
    );
    await this.userRepository.updateUserById(user._id, { refreshToken });
    return {
      accessToken,
      refreshToken,
    };
  }
  async getUserName (userId: string) {
    const user = await this.userRepository.getUserById(userId);
    return {first_name:user.first_name,
      last_name:user.last_name
    }
  }
}
