import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  }),
);

const PORT = 3000;
const cors = require('cors');
app.use(cookieParser());
app.use(cors());
app.use(express.json());

async function main () {
  try {
    app.listen(PORT, async () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
main();
