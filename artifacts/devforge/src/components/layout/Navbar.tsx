import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { LogoIcon } from "@/components/LogoIcon";

const navLinks = [
  { href: "/projects", key: "nav.projects" },
  { href: "/articles", key: "nav.articles" },
  { href: "/members", key: "nav.members" },
  { href: "/quiz", key: "nav.quiz" },
  { href: "/leaderboard", key: "nav.leaderboard" },
];

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme, lang, setLang, t } = useApp();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="transition-transform group-hover:scale-105 duration-200">
            <LogoIcon size={36} />
          </div>
          <span className="font-black text-xl tracking-tight logo-gradient">
            DevBenin
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ href, key }) => {
            const active = location === href || location.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <div className="hidden sm:flex items-center rounded-full border border-border bg-muted p-0.5 text-xs font-bold gap-0.5">
            <button
              onClick={() => setLang("fr")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "fr"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "en"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-8 w-8 rounded-full border border-border bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
          >
            {theme === "dark"
              ? <Sun className="h-3.5 w-3.5" />
              : <Moon className="h-3.5 w-3.5" />}
          </button>

          {/* Auth buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="font-medium text-sm h-8">
                    {user?.name?.split(" ")[0]}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-sm text-muted-foreground"
                  onClick={logout}
                >
                  {t("nav.logout")}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="h-8 text-sm font-medium">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="h-8 text-sm font-semibold bg-primary text-primary-foreground glow-primary">
                    {t("nav.join")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden h-8 w-8 rounded-lg border border-border bg-muted flex items-center justify-center text-muted-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1.5">
              {navLinks.map(({ href, key }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {t(key)}
                </Link>
              ))}
              <div className="pt-3 border-t border-border mt-1 flex flex-col gap-2">
                <div className="flex gap-2">
                  {(["fr", "en"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold uppercase border transition-all ${
                        lang === l
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                {!isAuthenticated && (
                  <>
                    <Link href="/login" onClick={() => setMenuOpen(false)}>
                      <Button variant="outline" className="w-full">{t("nav.login")}</Button>
                    </Link>
                    <Link href="/register" onClick={() => setMenuOpen(false)}>
                      <Button className="w-full bg-primary text-primary-foreground">{t("nav.join")}</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
