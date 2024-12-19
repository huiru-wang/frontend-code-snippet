import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

// Custom components
export const customComponents = {
    h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl">{children}</h2>,
    img: ({ src, alt, ...props }) => {
        return <Image src={src} alt={alt} {...props} />
    },
}

// Global Style and Components
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components
    }
}