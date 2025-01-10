import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ThemeType = "dark" | "light";

interface ThemeContextType {
    toggleTheme: () => void;
    getTheme: () => ThemeType;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>(() => {
        const savedTheme = localStorage.getItem("theme") as ThemeType;
        if (savedTheme) {
            return savedTheme;
        } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "dark";
    });

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    const getTheme = () => theme;

    return (
        <ThemeContext.Provider value={{ toggleTheme, getTheme }}>{children}</ThemeContext.Provider>
    );
};
