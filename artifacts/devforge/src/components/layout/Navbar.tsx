import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";

function BeninFlagLogo() {
  return (
    <svg viewBox="0 0 36 24" width="36" height="24" className="rounded-sm overflow-hidden flex-shrink-0" aria-hidden="true">
      <rect x="0" y="0" width="12" height="24" fill="#008751" />
      <rect x="12" y="0" width="24" height="12" fill="#FCD116" />
      <rect x="12" y="12" width="24" height="12" fill="#E8112D" />
    </svg>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { t, lang, setLang, theme, toggleTheme } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/projects", key: "nav.projects" },
    { href: "/articles", key: "nav.articles" },
    { href: "/members", key: "nav.members" },
    { href: "/quiz", key: "nav.quiz" },
    { href: "/leaderboard", key: "nav.leaderboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" data-testid="link-home">
          <BeninFlagLogo />
          <span className="font-bold text-xl tracking-tight">
            Dev<span className="text-primary">Benin</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors z-0 ${
                location === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
              data-testid={`nav-link-${link.key}`}
            >
              {t(link.key)}
              {location === link.href && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-primary/10 rounded-md border border-primary/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language toggle */}
          <div className="flex items-center bg-muted/50 border border-border rounded-lg p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLang("fr")}
              className={`px-2.5 py-1 rounded-md transition-all ${lang === "fr" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Français"
            >
              FR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-md transition-all ${lang === "en" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="English"
            >
              EN
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 border border-border transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" data-testid="btn-dashboard">
                  {t("nav.dashboard")}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-border hover:border-destructive/50 hover:text-destructive"
                data-testid="btn-logout"
              >
                {t("nav.logout")}
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" data-testid="btn-login">
                  {t("nav.login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold" data-testid="btn-register">
                  {t("nav.register")}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground border border-border"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="btn-mobile-menu"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="py-4 px-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors ${
                    location === link.href
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}

              {/* Language toggle mobile */}
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="text-xs text-muted-foreground font-medium">Langue :</span>
                <div className="flex items-center bg-muted/50 border border-border rounded-lg p-0.5 text-xs font-semibold">
                  <button onClick={() => setLang("fr")} className={`px-2.5 py-1 rounded-md transition-all ${lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>FR</button>
                  <button onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-md transition-all ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>EN</button>
                </div>
              </div>

              <div className="h-px bg-border my-1" />

              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">{t("nav.dashboard")}</Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                    {t("nav.logout")}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">{t("nav.login")}</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground">{t("nav.register")}</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
