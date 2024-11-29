import { Tag } from "../components/Tag";
import { BlogPost } from "../lib/types";

interface BlogListProps {
    blogs: BlogPost[];
    like: (id: number) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ blogs, like }) => {

    return (
        <div className="blog-list">
            {
                blogs.map((blog) => (
                    <div className="blog-card">
                        <div className="blog-card-title">
                            <h2>{blog.title}</h2>
                        </div>
                        <div className="blog-card-excerpt">
                            <p>{blog.excerpt}</p>
                        </div>

                        <div className="blog-card-tags">
                            {
                                blog.tags.map((tag, index) => (
                                    <Tag tag={tag} key={index} />
                                ))
                            }
                        </div>

                        <div>
                            <button
                                className="like-button"
                                onClick={() => like(blog.id)}>
                                Like {blog.like}
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}