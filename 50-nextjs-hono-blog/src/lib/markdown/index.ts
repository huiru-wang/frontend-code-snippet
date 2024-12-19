import { serialize } from "next-mdx-remote/serialize";
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

export async function parseMarkdown(content: string) {
    const source = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrismPlus, { showLineNumbers: true }]],
        }
    });
    return source;
}