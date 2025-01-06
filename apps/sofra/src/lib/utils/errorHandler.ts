import { Response } from 'express';

export const handleResponseError = (res: Response, error: any) => {
  console.log(error);
  res.status(500).json({ message: 'Internal server error' });
};
