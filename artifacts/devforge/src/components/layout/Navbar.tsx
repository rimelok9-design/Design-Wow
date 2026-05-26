import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/articles", label: "Articles" },
    { href: "/members", label: "Members" },
    { href: "/quiz", label: "Quizzes" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary/20 transition-colors">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <span className="font-mono font-bold text-xl tracking-tight text-foreground">
            DEV<span className="text-primary">FORGE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative py-1 ${
                location === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {location === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="font-mono">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={logout} className="font-mono">Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="font-mono">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="font-mono bg-primary text-primary-foreground hover:bg-primary/90">Join</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-medium p-2 rounded-md ${
                location === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-border my-2" />
          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start font-mono">Dashboard</Button>
              </Link>
              <Button variant="destructive" onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full justify-start font-mono">Logout</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start font-mono">Login</Button>
              </Link>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full justify-start font-mono bg-primary text-primary-foreground">Join DevForge</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
