import { getMdPostBySlug } from "@/lib/markdown";

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const { frontmatter } = await getMdPostBySlug(slug);

    return {
        title: frontmatter.title,
        description: frontmatter.description,
    };
}

export default async function Page({ params }) {

    const { slug } = await params;

    const { content, frontmatter } = await getMdPostBySlug(slug)

    return (
        <div className="w-1/2">
            <div>
                {frontmatter.title}
            </div>
            <div className="markdown-body mt-10">
                {content}
            </div>
        </div>
    )
}