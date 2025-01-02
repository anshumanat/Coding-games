const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the .env file
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
