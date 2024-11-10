import { ThemeContext } from "../contexts/ThemeContext";
import { posts } from "../lib/data";
import { PostCard } from "./PostCard";
import '../App.css'
import { useContext, useState } from "react";

export const Layout: React.FC = () => {

    // 使用Context
    const { toggleTheme } = useContext(ThemeContext);

    const [checked, setChecked] = useState(true)

    if (!posts) {
        return <div>Error</div>
    }

    const changeTheme = () => {
        toggleTheme()
        setChecked(!checked)
    }

    return (
        <div>
            <input type="checkbox" className="theme-switch" checked={checked} onChange={changeTheme} />
            <PostCard postList={posts} />
        </div>
    );
};