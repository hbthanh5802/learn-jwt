const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:4010',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));

const useRoutes = require('./routes/index.routes');
useRoutes(app);

app.use((error, req, res, next) => {
  console.log('===> Error', error);
  res.sendStatus(500);
});

const PORT = process.env.PORT;
const database = require('./database/db');
database
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Sever is running at http://localhost:' + PORT);
    });
  })
  .catch((error) => console.log(error));
