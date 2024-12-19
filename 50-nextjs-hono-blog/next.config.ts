import type { NextConfig } from "next";
import nextMdx from '@next/mdx';
import rehypePrismPlus from 'rehype-prism-plus';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  transpilePackages: ['next-mdx-remote']
};

// Markdown Plugins
const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [[rehypePrismPlus, { showLineNumbers: true }]],
  },
})

export default withMdx(nextConfig);
