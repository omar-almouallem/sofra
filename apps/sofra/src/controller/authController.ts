import express, { Request, Response } from 'express';
import moment from 'moment';
import { decodeToken } from '@sofra/utils';
import {
  IBasicLoginInput,
  IBasicSignupInput,
  InvalidPasswordError,
  UserAlreadyExistsError,
  UserDoesNotExistError,
} from '@sofra/types';

import { AuthService } from '../service/authService';
import { UserMapper } from '../lib/mappers/user.mapper';
import { authorizeSuperAdmin } from '../middleware/authMiddleware';
import {
  validateSignupData,
  validateLoginData,
} from '../lib/validations/validateData';
import { handleResponseError } from '../lib/utils/errorHandler';

const router = express.Router();
const authService = new AuthService();


router.post(
  '/signup/basic',
  validateSignupData,
  async (req: Request, res: Response) => {
    const body: IBasicSignupInput = req.body;
    try {
      const user = await authService.registerUser(body);
      console.log(user)
      const userJson = await UserMapper.dbToJSON(user);
      return res.json(userJson);
    } catch (e) {
      switch (true) {
        case e instanceof UserAlreadyExistsError:
          return res.status(409).json({ message: e.message });
        default:
          return handleResponseError(res, e);
      }
    }
  },
);

router.post('/login/basic', validateLoginData, async (req: any, res: any) => {
  try {
    const body: IBasicLoginInput = req.body;
    const { accessToken, refreshToken } = await authService.loginUser(body);
    const refreshTokenExpiryDate = moment().add(1, 'days').toDate();
    decodeToken(accessToken);
    return res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        expires: refreshTokenExpiryDate,
      })
      .status(200)
      .json({ message: 'Login successful', accessToken });
  } catch (e) {
    switch (true) {
      case e instanceof UserDoesNotExistError:
        return res.status(409).json({ message: e.message });
      case e instanceof InvalidPasswordError:
        return res.status(409).json({ message: e.message });
      default:
        return handleResponseError(res, e);
    }
  }
});

router.post(
  '/create/admin',
  authorizeSuperAdmin,
  validateSignupData,
  async (req: Request, res: Response) => {
    const body: IBasicSignupInput = req.body;
    try {
      const user = await authService.createAdmin(body);
      const userJson = await UserMapper.dbToJSON(user);
      return res.json(userJson);
    } catch (e) {
      switch (true) {
        case e instanceof UserAlreadyExistsError:
          return res.status(409).json({ message: e.message });
        default:
          return handleResponseError(res, e);
      }
    }
  },
);

export default router;
