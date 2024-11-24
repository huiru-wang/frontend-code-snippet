import { connectDB } from '../config/db';

export const getPostById = async (id: string) => {
    const db = await connectDB();
    const collection = db.collection('posts');
    return collection.findOne({ id: id });
};
