// lib/mongodb.js
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    const mongodbUri = process.env.MONGODB_URI;
    await mongoose.connect(mongodbUri);
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};
