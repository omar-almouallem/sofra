import { Request, Response, NextFunction } from 'express';

import { getUserIdFromAccessToken } from '../lib/utils';

export function authorizeSuperAdmin (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { role } = getUserIdFromAccessToken(req);
    if (role !== 'superAdmin') {
      return res
        .status(403)
        .json({ message: 'Forbidden: Insufficient privileges' });
    }
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}
