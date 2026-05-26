import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <footer className="border-t border-border py-8 mt-12 bg-background/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm font-mono">
          <p>© {new Date().getFullYear()} DevForge. Built for African Builders.</p>
        </div>
      </footer>
    </div>
  );
}
