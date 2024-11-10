import React from "react";


interface ThemeContext {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContext>({
    theme: "light",
    toggleTheme: () => { },
});