import { Tag } from "../components/Tag";
import { BlogPost } from "../lib/types";

interface BlogListProps {
    blogs: BlogPost[];
    like: (id: number) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ blogs, like }) => {

    return (
        <div className="mt-10 flex flex-col items-center">
            {
                blogs.map((blog) => (
                    <div className="flex flex-col items-start w-full max-w-[1000px] bg-white rounded-md shadow-md p-6 mb-6 transition duration-100 ease-in-out hover:-translate-y-1">
                        <div className="text-xl">
                            <h2>{blog.title}</h2>
                        </div>
                        <div>
                            <p>{blog.excerpt}</p>
                        </div>

                        <div className="flex">
                            {
                                blog.tags.map((tag, index) => (
                                    <Tag tag={tag} key={index} />
                                ))
                            }
                        </div>

                        <div>
                            <button
                                className="mt-1 inline-flex items-center justify-center border-none rounded-md px-4 py-2 bg-gray-200 cursor-pointer transition duration-300 ease-in-out hover:bg-red-300"
                                onClick={() => like(blog.id)}>
                                Like {blog.like}
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}