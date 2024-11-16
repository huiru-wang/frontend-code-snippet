import { BlogPost } from "../lib/types"
import '../App.css'
import { Tag } from "./Tag"

interface BlogCardProps {
    blogPost: BlogPost
}

export const BlogCard: React.FC<BlogCardProps> = ({ blogPost }) => {
    return (
        <div className="blog-card">
            <div className="blog-card-title">
                <h2>{blogPost.title}</h2>
            </div>
            <div className="blog-card-excerpt">
                <p>{blogPost.excerpt}</p>
            </div>

            <div className="blog-card-tags">
                {
                    blogPost.tags.map((tag, index) => (
                        <Tag tag={tag} key={index} />
                    ))
                }
            </div>
        </div>
    )

}