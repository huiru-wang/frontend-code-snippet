import { CreatePostRequest } from '@/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get post by id
 * 
 * @param id id
 * @returns post
 */
export const getPostById = async (id: number) => {
    return await prisma.post.findUnique({
        where: { id: id }
    });
}

/**
 * Create post
 * 
 * @param createRequest createRequest
 * @returns created post
 */
export const createPost = async (createRequest: CreatePostRequest) => {

    const post = await prisma.post.create({
        data: {
            title: createRequest.title,
            content: createRequest.content,
            tags: createRequest.tags,
            category: createRequest.category,
            published: createRequest.published,
            author: createRequest.author,
        },
    });
    return post;
}
