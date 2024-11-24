import { connectDB } from '../config/db';

export const getUserById = async (id: string) => {
    const db = await connectDB();
    const collection = db.collection('users');
    return collection.findOne({ id: id });
};

export const createUser = async (userData: { name: string; email: string }) => {
    const db = await connectDB();
    const collection = db.collection('users');
    const result = await collection.insertOne(userData);
    return result.insertedId;
};