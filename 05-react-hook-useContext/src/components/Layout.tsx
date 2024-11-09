import { useTheme } from "../contexts/ThemeContext";
import { posts } from "../lib/data";
import { PostCard } from "./PostCard";
import '../App.css'

export const Layout: React.FC = () => {

    const { theme, toggleTheme } = useTheme();

    if (!posts) {
        return <div>Error</div>
    }

    return (
        <div>
            <div>
                <button
                    className={`${theme === 'light' ? 'button-light' : 'button-dark'}`}
                    onClick={toggleTheme}
                >
                    Change Theme
                </button>
            </div>
            <PostCard postList={posts} />
        </div>
    );
};