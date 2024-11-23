import { posts } from '@/lib/data';
import Link from 'next/link';

const BlogList = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">博客列表</h1>
            <ul className="space-y-2">
                {posts.map(post => (
                    <li key={post.id} className="border-b pb-2">
                        <Link href={`/posts/${post.id}`} className="text-black-500 hover:underline">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;