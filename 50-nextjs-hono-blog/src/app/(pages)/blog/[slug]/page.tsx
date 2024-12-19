import { postsAPI } from "@/lib/hono-clent";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { parseMarkdown } from "@/lib/markdown";
import "@/styles/markdownhere.css";

type PageProps = {
    slug: string;
};

// const md = "## Hello world \n\n ```js\nconsole.log();\n```"

export default async function Page({ params }: { params: PageProps }) {
    const { slug } = await params
    const response = await postsAPI[slug].$get();
    if (!response.ok) {
        return <div>Not Found</div>
    }
    const result = await response.json();
    const content = await parseMarkdown(result.data.content);
    return (
        <div className="w-1/2">
            <MDXRemote source={content} />
        </div>
    );
}