import { getMdPostBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const { frontmatter } = await getMdPostBySlug(slug);

    return {
        title: frontmatter?.title,
        keywords: frontmatter?.keywords,
        description: frontmatter?.description,
    };
}

export default async function Page({ params }) {

    const { slug } = await params;

    const { content, frontmatter } = await getMdPostBySlug(slug);

    if (!content) {
        // 路由到/src/posts/[slug]/not-found.tsx
        return notFound();
    }

    return (
        <div className="w-1/2">
            <div>
                {frontmatter?.title}
            </div>
            <div className="markdown-body mt-10">
                {content}
            </div>
        </div>
    )
}