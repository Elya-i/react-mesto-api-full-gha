require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { createUser, loginUser, logoutUser } = require('./controllers/users');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./utils/errors/NotFoundError');
const { validateLoginUser, validateCreateUser } = require('./utils/validation/requestValidation');

const app = express();

const allowedCors = [
  'https://elya-i.students.nomoredomainsicu.ru',
  'https://api.elya-i.mesto.nomoredomainsicu.ru',
  'localhost:3000',
  'http://localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
});

app.use(cookieParser());

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to DB');
});

app.use(limiter);
app.use(helmet());

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLoginUser, loginUser);
app.post('/signout', logoutUser);

app.use(auth);

app.use('/cards', cardRouter);
app.use('/users', userRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
