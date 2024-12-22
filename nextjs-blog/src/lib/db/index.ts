
import { PrismaClient } from '@prisma/client';
import { CreatePostRequest, UpdatePostRequest } from '../types';

const prisma = new PrismaClient();

/**
 * Get post by id
 * 
 * @param id id
 * @returns post
 */
export const getPostById = async (id: number) => {
    const post = await prisma.post.findUnique({
        where: { id: id }
    });
    return post;
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

/**
 * Update post
 * 
 * @param updateRequest updateRequest
 * @returns updated post
 */
export const updatePost = async (updateRequest: UpdatePostRequest) => {
    const id = updateRequest.id;
    const post = await getPostById(id);
    if (!post) {
        return;
    }
    const updatedPost = await prisma.post.update({
        where: {
            id: post?.id
        },
        data: {
            title: updateRequest.title || post?.title,
            content: updateRequest.content || post?.content,
            tags: updateRequest.tags || post?.tags,
            category: updateRequest.category || post?.category,
            published: updateRequest.published || post?.published,
            author: updateRequest.author || post?.author,
        }
    })
    return updatedPost;
}

/**
 * Delete post by id
 * 
 * @param id id
 * @returns delete result
 */
export const deletePost = async (id: number) => {
    const post = await getPostById(id);
    if (!post) {
        return;
    }
    const result = await prisma.post.delete({
        where: { id: id }
    });
    if (result) {
        return true;
    } else {
        return false;
    }
}