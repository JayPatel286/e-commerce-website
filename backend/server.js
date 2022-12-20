const app = require('./app');
const colors = require('colors');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

const { connectDatabase } = require('./config/database');

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setting configuration for the env file
dotenv.config({ path: 'backend/config/config.env' });

// Listening for requests
const server = app.listen(process.env.PORT, () => {
  console.log(
    `\nServer is running,`.green +
      ` You can make request on: ` +
      `http://localhost:${process.env.PORT}`.bold.blue
  );
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: `.white + `${err.message}`.red.bold);
  console.log('\nShutting down the server'.red.bold);

  server.close(() => {
    process.exit(1);
  });
});
