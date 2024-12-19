import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// Global Style and Components
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        h1: ({ children }) => (
            <h1 style={{ color: 'red', fontSize: '48px' }}>{children}</h1>
        ),
        h2: (props) => <h2 className='text-3xl text-red-400'>{props.children}</h2>,
        img: (props) => (
            <Image
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                {...(props as ImageProps)}
            />
        ),
    }
}