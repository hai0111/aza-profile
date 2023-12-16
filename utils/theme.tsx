"use client";

import { FC, ReactNode, createContext, useEffect, useState } from "react";

type types = "light" | "dark";

interface IThemeContext {
  theme: types;
  setTheme(theme: types): void;
  toggle(): void;
}

const initValue: IThemeContext = {
  theme: "light",
  setTheme() {},
  toggle() {},
};

export const ThemeContext = createContext<IThemeContext>(initValue);

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<types>("light");
  const data: IThemeContext = {
    theme,
    setTheme: (theme: types) => {
      setTheme(theme);
    },
    toggle: () => {
      setTheme(theme === "light" ? "dark" : "light");
    },
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
