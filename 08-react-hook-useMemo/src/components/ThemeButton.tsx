import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * 切换主题
 */
export const ThemeButton = () => {

    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <button onClick={toggleTheme}>
            {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};