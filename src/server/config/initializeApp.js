const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const dbConfiguration = require('./db');

module.exports = function initializedApp(router) {
  const isProduction = process.env.NODE_ENV === 'production';

  /** Database setup */
  const dbConnection = dbConfiguration();

  const app = express();

  /** Middlewares */
  app.use(morgan('tiny'));
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      unset: 'destroy',
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: app.get('env') === 'production',
      },
      store: new MongoStore({
        mongooseConnection: dbConnection,
        touchAfter: 24 * 3600,
        clear_interval: 3600 * 2,
      }),
    })
  );

  // const whitelist = ['https://www.asteyo.com', 'https://asteyo.com'];

  app.use(
    cors({
      origin: isProduction ? 'https://www.asteyo.com' : '*',
      methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    })
  );

  app.use('/api/static', express.static(path.join(__dirname, '../uploads/')));

  /** API endpoints */
  app.use('/api/v1', router);

  // Avoiding favicon returning 404
  app.get('/favicon.ico', (req, res) => res.status(204));

  // Handling unreachable routes
  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  // error handler middleware
  app.use((error, req, res) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  });

  return app;
};
