import { createContext, type ReactNode, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import type { AppContextType } from "./types.tsx";
import chroma from 'chroma-js';

const AppContext = createContext<AppContextType>({} as AppContextType);

const COLORS: {[key: string]: [number, number, number]} = {
  'accent': chroma('F94D00').hsl()
}

export function AppProvider ({ children }: { children: ReactNode | null }) {
  // State Variables
  const [theme, setTheme] = useState<"light" | "dark">((): "light" | "dark" => {
    return (localStorage.getItem('theme') as "light" | "dark") ?? "light";
  });

  // Apply CSS Variables for Theme (ie --theme-f is #ffffff)
  useLayoutEffect(() => {
    const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    hex.map((x, i) => document.documentElement.style.setProperty(`--theme-${theme === "dark" ? hex[15 - i] : hex[i]}`, `#${x.repeat(6)}`));
    hex.map((_, i) => document.documentElement.style.setProperty(`--theme-${theme === "dark" ? hex[i] : hex[15 - i]}-rgb`, `${chroma.hsl(0, 0, 1 - (i / 15)).rgb().join(',')}`));
    Object.keys(COLORS).map((c) => hex.map((_, i) => document.documentElement.style.setProperty(`--${c}-${theme === "dark" ? hex[i] : hex[15 - i]}`, `${chroma.hsl(COLORS[c][0], COLORS[c][1], 0.95 - (i * (0.90 / 15))).hex()}`)));
    Object.keys(COLORS).map((c) => hex.map((_, i) => document.documentElement.style.setProperty(`--${c}-${theme === "dark" ? hex[i] : hex[15 - i]}-rgb`, `${chroma.hsl(COLORS[c][0], COLORS[c][1], 0.95 - (i * (0.90 / 15))).rgb().join(',')}`)));
  }, [theme, COLORS]);

  const toggleTheme = () => setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");

  useEffect(() => {
    localStorage.setItem('theme', theme ?? 'light');
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [ theme, toggleTheme ]);
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);