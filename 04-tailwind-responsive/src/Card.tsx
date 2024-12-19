// f:\repository\frontend-code-snippet\04-tailwind-responsive\src\Card.tsx
import { Blog } from "./lib/data";

export const Card: React.FC<{ blog: Blog }> = ({ blog }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm mx-auto mb-4">
            <div className="px-6 py-4">
                <h1 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h1>
                <p className="text-gray-600 text-base mb-2">发布日期: {blog.date}</p>
                <p className="text-gray-700 text-base">{blog.description}</p>
            </div>
        </div>
    );
};