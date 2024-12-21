import React from "react";
import Link from 'next/link';

export const Header = () => {
    return (
        <header className="fixed z-30 w-full p-2.5 flex justify-center items-center bg-transparent">
            <div className="flex w-3/4 justify-between bg-gray-50 bg-opacity-30 backdrop-blur-lg p-4 rounded-2xl min-h-[2rem] border border-[#915af747] flex-wrap">
                <div>
                    <h1>Blog</h1>
                </div>
                <nav className="flex space-x-10 items-center mr-6">
                    <Link href="/about" className="link text-gray-800 text-2xl">
                        About
                    </Link>
                    <Link href="/posts" className="link text-gray-800 text-2xl">
                        Posts
                    </Link>
                    <Link href="/projects" className="link text-gray-800 text-2xl">
                        Projects
                    </Link>
                </nav>
            </div>
        </header>
    )
}
