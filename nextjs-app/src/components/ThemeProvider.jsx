"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = "bk_theme";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(STORAGE_KEY) || "light";
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } catch {}
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
