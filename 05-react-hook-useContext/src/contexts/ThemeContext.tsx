import { createContext } from "react";
import { Theme } from "../lib/types";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// 1. 创建context
export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { }
});