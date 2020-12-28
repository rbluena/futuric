const mongoose = require('mongoose');

function connectDB() {
  const isProduction = process.env.NODE_ENV === 'production';

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  options.dbName = process.env.DB_NAME;

  if (isProduction) {
    options.user = process.env.DB_USER;
    options.pass = process.env.DB_PASS;
  }

  mongoose.connect(process.env.DB_HOST, options);

  mongoose.connection
    .once('open', () => {
      // eslint-disable-next-line no-console
      console.log('Database connection established!');
    })
    .on('error', (error) => {
      // eslint-disable-next-line no-console
      console.log('Connection error: ', error);
    });
}

module.exports = connectDB;
