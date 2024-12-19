import { CreatePostRequest, Post, UpdatePostRequest } from '@/types';
import { PrismaClient } from '@prisma/client';
import { success, fail } from '@/util/result';

const prisma = new PrismaClient();

/**
 * Get post by id
 * 
 * @param id id
 * @returns post
 */
export const getPostById = async (id: string) => {
    const post = await prisma.post.findUnique({
        where: { id: Number(id) }
    });
    if (post) {
        return success(post);
    } else {
        return fail(100001, `Post ${id} Not Exsits`);
    }
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
    return success(post);
}

/**
 * Update post
 * 
 * @param updateRequest updateRequest
 * @returns updated post
 */
export const updatePost = async (updateRequest: UpdatePostRequest) => {
    const id = updateRequest.id;
    const serviceResult = await getPostById(id.toString());
    if (!serviceResult?.success) {
        return fail(100001, `Post ${id} Not Exsits`);
    }
    const post = serviceResult.data! as Post;
    const updatedPost = await prisma.post.update({
        where: {
            id: post.id
        },
        data: {
            title: updateRequest.title || post.title,
            content: updateRequest.content || post.content,
            tags: updateRequest.tags || post.tags,
            category: updateRequest.category || post.category,
            published: updateRequest.published || post.published,
            author: updateRequest.author || post.author,
        }
    })
    return success(updatedPost);
}

/**
 * Delete post by id
 * 
 * @param id id
 * @returns delete result
 */
export const deletePost = async (id: string) => {
    const serviceResult = await getPostById(id);
    if (!serviceResult?.success) {
        return fail(10001, "Post Not Exsits");
    }
    const result = await prisma.post.delete({
        where: { id: Number(id) }
    });
    if (result) {
        return success(result);
    } else {
        return fail(100004, `Post ${id} Delelte Fail`);
    }
}