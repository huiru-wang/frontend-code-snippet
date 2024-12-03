import { createContext } from "react";
import { Theme } from "../lib/types";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// 1. 创建一个context，指定context的内容
export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { }
});