import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { Theme } from "../lib/types";

/**
 * 2. 创建一个ThemeProvider组件
 * 这个组件向下层组件提供主题、切换主题的功能
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}