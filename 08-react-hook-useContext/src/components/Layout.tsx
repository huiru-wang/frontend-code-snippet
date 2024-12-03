import { ThemeContext } from "../contexts/ThemeContext";
import { posts } from "../lib/data";
import { PostCard } from "./PostCard";
import '../App.css'
import { useContext, useState } from "react";

export const Layout: React.FC = () => {

    // 4. 使用useContext，并传入要使用的主题context
    // 从themeContext中取出：由ThemeProvider传递下来的主题变更函数
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