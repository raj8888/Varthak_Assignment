import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', false);

const connection = mongoose.connect(process.env.mongoDBURL as string);

export { connection };