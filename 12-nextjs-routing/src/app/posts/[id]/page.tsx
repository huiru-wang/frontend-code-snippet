'use server'
import { ApiService } from '@/lib/api'
import Link from 'next/link'

export default async function PostPage({ params }: { params: { id: string } }) {

    // 确保 params 被 await 处理
    const { id } = await params;

    const post = await ApiService.fetchPosts(id)

    return (
        <article className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4"> Dynamic Routing : /posts/[id]/page.tsx</h1>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700 mb-6">{post.content}</p>
            <div className="border-t pt-4">
                <p className="text-sm text-gray-500">Post ID: {post.id}</p>
            </div>
            <br />
            <Link className="border-2 bg-slate-200" href="/">Back to Home</Link>
        </article>
    )
}