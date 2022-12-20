const mongoose = require('mongoose');
const colors = require('colors');

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(
        'MongoDB connected '.green +
          `| server:`.bold +
          ` ${conn.connection.host} | `.yellow +
          `database:`.bold +
          ` ${conn.connection.db.databaseName}`.magenta
      );
    });
};

module.exports = { connectDatabase };
