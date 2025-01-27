"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore/store";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button className="py-4" onClick={() => toggleTheme()}>
      {theme === "dark" ? (
        <Sun className="text-yellow-700 h-10 w-10" />
      ) : (
        <Moon className="text-gray-700 h-10 w-10" />
      )}
    </button>
  );
};

export default ThemeToggle;
