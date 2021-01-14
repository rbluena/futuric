const mongoose = require('mongoose');

function connectDB() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  options.dbName = process.env.DB_NAME;

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
