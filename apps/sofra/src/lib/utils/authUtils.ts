import { Request } from 'express';
import { decodeToken } from '@sofra/utils';

export const getUserIdFromAccessToken = (
  req: Request,
): { id: string; role: string } => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Authorization header is missing');
  }
  const token = authHeader.split(' ')[1];
  const decoded = decodeToken(token);
  return { id: decoded.id, role: decoded.role };
};
