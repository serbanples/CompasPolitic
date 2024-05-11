// src/config/database.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const MONGOURL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGOURL);
        console.log('Database connected');
    } catch (err) {
        console.log('Database connection error:', err);
        process.exit(1);
    }
};

export default connectDB;
