import { Layout } from "@/components/layout/Layout";
import { mockProjects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Search, FolderOpen } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

export default function Projects() {
  const { t } = useApp();
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    mockProjects.forEach(p => p.techStack.forEach(tech => techs.add(tech)));
    return Array.from(techs).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesTech = selectedTech ? p.techStack.includes(selectedTech) : true;
      return matchesSearch && matchesTech;
    });
  }, [search, selectedTech]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t("projects.label")}</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 mb-3">{t("projects.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">{t("projects.subtitle")}</p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("projects.search")}
              className="pl-10 bg-card border-border"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search-projects"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTech(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                !selectedTech ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {t("projects.all")}
            </button>
            {allTechs.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  selectedTech === tech ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredProjects.length}</span> {t("projects.found")}
          </p>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-border rounded-2xl bg-card/30">
            <FolderOpen className="h-14 w-14 text-muted-foreground mx-auto mb-4 opacity-40" />
            <h3 className="text-xl font-bold mb-2">{t("projects.empty")}</h3>
            <p className="text-muted-foreground">{t("projects.emptyDesc")}</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
