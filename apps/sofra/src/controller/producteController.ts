import express, { Request, Response } from 'express';
import moment from 'moment';
import {
  IBasicLoginInput,
  IBasicSignupInput,
  IInsertProducteInput,
  UserAlreadyExistsError,
} from '@sofra/types';

import { ProductsService } from '../service/usersService';
import upload from '../lib/multer';
import { authorizeSuperAdmin } from '../middleware/authMiddleware';
import {
  validateSignupData,
  validateLoginData,
} from '../lib/validations/validateData';
import { handleResponseError } from '../lib/utils/errorHandler';

const router = express.Router();
const producteService = new ProductsService();

router.post(
  '/producte/create',
  upload.single('image'),
  express.static('D:/sofra/sofra/uploads'),
  async (req: any, res: Response) => {
    const body: IInsertProducteInput = req.body;
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Image is required.' });
      }

      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/images/${
        req.file.filename
      }`;

      const productData = {
        ...body,
        image: imageUrl,
      };
      const producte = await producteService.createProducte(productData);
      return res.json(producte);
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

router.put('/producte/update/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await producteService.updateProducte(id, updateData);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.delete('/producte/delete/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProduct = await producteService.deletProducte(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get('/producte/all', async (req: Request, res: Response) => {
  try {
    const products = await producteService.getProductes();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
