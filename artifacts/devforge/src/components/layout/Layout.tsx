import { Navbar } from "./Navbar";
import { Link } from "wouter";
import { useApp } from "@/contexts/AppContext";
import { Github, Twitter } from "lucide-react";
import { LogoIcon } from "@/components/LogoIcon";

export function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useApp();

  const footerLinks = {
    [t("footer.platform")]: [
      { label: t("nav.projects"), href: "/projects" },
      { label: t("nav.articles"), href: "/articles" },
      { label: t("nav.members"), href: "/members" },
      { label: t("nav.quiz"), href: "/quiz" },
      { label: t("nav.leaderboard"), href: "/leaderboard" },
    ],
    [t("footer.community")]: [
      { label: t("footer.about"), href: "/" },
      { label: t("nav.register"), href: "/register" },
      { label: t("nav.login"), href: "/login" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="container mx-auto px-4 max-w-7xl py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <LogoIcon size={34} />
                <span className="font-black text-xl tracking-tight logo-gradient">DevBenin</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                {t("footer.tagline")}
              </p>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                  <Github className="h-4 w-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">{section}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} DevBenin. {t("footer.copyright")}
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              {t("footer.built")}
              <span className="font-semibold text-foreground">{t("footer.benin")}</span>
              <span className="inline-flex gap-0.5 ml-1">
                <span className="h-3 w-2 rounded-sm bg-[#008751]" />
                <span className="h-3 w-2 rounded-sm bg-[#FCD116]" />
                <span className="h-3 w-2 rounded-sm bg-[#E8112D]" />
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
