import type { MDXComponents } from 'mdx/types';

// Global Style and Components
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components
    }
}