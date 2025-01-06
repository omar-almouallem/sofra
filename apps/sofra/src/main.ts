import cors from 'cors';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { PORT } from './config';
import connectToDatabase from './infra/db.provider';
import authController from './controller/authController';
import productsController from './controller/producteController';
import cartController from './controller/cartController';
import orderController from './controller/orderController';
import { GLOBALPREFIX } from './constants';
import path from 'path';

const app = express();
app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  }),
);

const cors = require('cors');
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(`/${GLOBALPREFIX}`, authController, productsController,cartController,orderController);

app.use('/uploads/images', express.static('D:/sofra/sofra/uploads/images'));

async function main () {
  try {
    await connectToDatabase();

    app.listen(PORT, async () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
main();
