import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI || '';
if (!uri) {
    throw new Error('MONGO_URI environment variable not set');
}

const client = new MongoClient(uri);

export const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};