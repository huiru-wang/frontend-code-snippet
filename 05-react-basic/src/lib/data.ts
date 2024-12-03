import { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "React Hooks 完全指南",
        date: "2024-02-10",
        excerpt: "深入理解React Hooks的工作原理，以及如何在实际项目中运用...",
        tags: ["React", "Hooks", "前端开发"],
        like: 10
    },
    {
        id: 2,
        title: "现代CSS技巧与最佳实践",
        date: "2024-02-08",
        excerpt: "探索现代CSS的新特性和实用技巧，提升开发效率...",
        tags: ["CSS", "前端开发", "设计"],
        like: 4
    },
    {
        id: 3,
        title: "JavaScript性能优化指南",
        date: "2024-02-05",
        excerpt: "学习JavaScript性能优化的关键技巧，让你的应用运行更快...",
        tags: ["JavaScript", "性能优化", "前端开发"],
        like: 1
    },
    {
        id: 4,
        title: "TypeScript入门到进阶",
        date: "2024-02-01",
        excerpt: "从基础概念到高级特性，全面掌握TypeScript开发...",
        tags: ["TypeScript", "前端开发"],
        like: 0
    }
];