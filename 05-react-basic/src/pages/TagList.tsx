import { BlogPost } from "../lib/types"

interface TagListProps {
    blogs: BlogPost[]
}
export const TagList: React.FC<TagListProps> = ({ blogs }) => {

    const tags: string[] = blogs.reduce((acc, blog) => {
        blog.tags.forEach(tag => {
            if (!acc.includes(tag)) {
                acc.push(tag)
            }
        })
        return acc;
    }, [] as string[])

    return (
        <div className="mt-8 w-1/2 flex justify-around">
            {
                tags.map(tag => {
                    return (
                        <div className="tag">
                            <p>#{tag}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}