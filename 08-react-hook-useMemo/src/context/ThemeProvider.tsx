import { useState } from "react";
import { ThemeContext } from "./ThemeContext";


export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [theme, setTheme] = useState<string>('light');

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};