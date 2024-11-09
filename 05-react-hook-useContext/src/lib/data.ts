import { Post } from "./types";

export const posts: Post[] = [
    {
        id: 1,
        title: "Welcome to Theme Switching",
        content: "This card demonstrates theme context usage. The appearance changes based on the selected theme.",
    },
    {
        id: 2,
        title: "How it works",
        content: "We use React Context to manage the theme state globally and allow any component to access and modify it.",
    },
    {
        id: 3,
        title: "Context Benefits",
        content: "Using context prevents prop drilling and makes theme management much easier across the entire application.",
    },
    {
        id: 4,
        title: "Try it out",
        content: "Click the theme toggle button above to switch between light and dark modes!",
    }
]