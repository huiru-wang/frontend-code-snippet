import { BlogCard } from "../components/BlogCard";
import { BlogPost } from "../lib/types";

interface BlogListProps {
    blogs: BlogPost[];
}

export const BlogList: React.FC<BlogListProps> = ({ blogs }) => {

    return (
        <div className="blog-list">
            {
                blogs.map((blog) => (
                    < BlogCard blogPost={blog} />
                ))}
        </div>
    )
}