import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrismPlus from 'rehype-prism-plus';
import { getPostById } from '../db';

export type Frontmatter = {
    title: string;
    keywords: string;
    date: string;
    description: string;
}

const postParentDir = "mdx";
const mdxBaseDir = path.join(process.cwd(), postParentDir);

/**
 * 根据slug读取并解析md、mdx
 * @param slug slug
 * @returns {content, frontmatter}
 */
export const getMdPostBySlug = async (slug: string): Promise<{ content, frontmatter }> => {

    let postMdxContent;
    if (Number.isInteger(Number(slug))) {
        const post = await getPostById(Number(slug));
        postMdxContent = post?.content;
    } else {
        const targetMdx = slug?.split('_').join('/');
        const targetMdxPath = path.join(mdxBaseDir, `${targetMdx}.md`);
        if (fs.existsSync(targetMdxPath)) {
            postMdxContent = fs.readFileSync(targetMdxPath, 'utf8');
        } else {
            return new Promise((resolve) => resolve({ content: "", frontmatter: {} }));
        }
    }
    return parseMdx(postMdxContent);
}

/**
 * 解析markdown内容
 * @param content 文件内容
 * @returns {content, frontmatter}
 */
export const parseMdx = async (content: string): Promise<{ content: unknown, frontmatter: Frontmatter }> => {

    return compileMDX<Frontmatter>({
        source: content || "",
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }]],
            }
        },
    });
}


// TODO Cache
export const getPostFilesMetadata = async () => {
    const result: { frontmatter: Frontmatter, slug: string }[] = [];
    const readDirRecursively = async (currentDir) => {
        const files = fs.readdirSync(currentDir);
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                await readDirRecursively(filePath);
            } else if (stats.isFile() && (path.extname(file) === '.md' || path.extname(file) === '.mdx')) {
                const parentDirName = path.basename(currentDir);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const { frontmatter } = await parseMdx(fileContent);
                const filename = file.replace(/\.md$|\.mdx$/, "");
                let slug;
                if (parentDirName === postParentDir) {
                    slug = filename;
                } else {
                    slug = `${parentDirName}_${filename}`;
                }
                result.push({
                    frontmatter: frontmatter,
                    slug: slug,
                });
            }
        }
    };
    await readDirRecursively(mdxBaseDir);

    console.log(result);
    return result;
}