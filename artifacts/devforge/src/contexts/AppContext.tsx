import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/i18n/translations";

export type Theme = "dark" | "light";
export type Lang = "fr" | "en";

interface AppContextType {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType>({
  theme: "light",
  lang: "fr",
  toggleTheme: () => {},
  setLang: () => {},
  t: (k) => k,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try { return (localStorage.getItem("db_theme") as Theme) ?? "light"; }
    catch { return "light"; }
  });

  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem("db_lang") as Lang) ?? "fr"; }
    catch { return "fr"; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try { localStorage.setItem("db_theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem("db_lang", lang); } catch {}
  }, [lang]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const setLang = (l: Lang) => setLangState(l);

  const t = (key: string): string => {
    const map = translations[lang];
    return map[key] ?? translations["fr"][key] ?? key;
  };

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, setLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
