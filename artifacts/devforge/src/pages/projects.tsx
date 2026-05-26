import { Layout } from "@/components/layout/Layout";
import { mockProjects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Extract all unique tech stack items
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    mockProjects.forEach(p => p.techStack.forEach(t => techs.add(t)));
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
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-bold font-mono tracking-tight mb-2 text-foreground">
              PROJECT_REPOSITORY
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore what the African tech community is building. Open source, startups, and side projects.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-auto relative"
          >
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10 font-mono bg-card border-primary/20 focus-visible:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search-projects"
              />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Badge 
            variant={selectedTech === null ? "default" : "outline"}
            className="cursor-pointer font-mono text-sm py-1"
            onClick={() => setSelectedTech(null)}
          >
            All
          </Badge>
          {allTechs.map(tech => (
            <Badge 
              key={tech}
              variant={selectedTech === tech ? "default" : "outline"}
              className="cursor-pointer font-mono text-sm py-1"
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-border rounded-xl bg-card/30">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold font-mono mb-2">NO_RESULTS_FOUND</h3>
            <p className="text-muted-foreground">Adjust your search parameters to try again.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
