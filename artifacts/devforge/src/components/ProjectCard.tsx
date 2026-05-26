import { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Github, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useLikes } from "@/hooks/useLikes";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

const techColors: Record<string, string> = {
  React: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Next.js": "bg-slate-400/10 text-slate-300 border-slate-400/20",
  "Node.js": "bg-green-500/10 text-green-400 border-green-500/20",
  TypeScript: "bg-blue-600/10 text-blue-300 border-blue-600/20",
  Python: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Vue: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Svelte: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Go: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Flutter: "bg-blue-400/10 text-blue-300 border-blue-400/20",
  Firebase: "bg-orange-400/10 text-orange-300 border-orange-400/20",
};

const getTagColor = (tech: string) =>
  techColors[tech] ?? "bg-muted/60 text-muted-foreground border-border";

export function ProjectCard({ project, index, featured }: ProjectCardProps) {
  const { isLiked, toggleLike } = useLikes();
  const liked = isLiked(project.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      className="h-full"
    >
      <div className="h-full flex flex-col bg-card border border-border rounded-2xl overflow-hidden card-hover group">
        {/* Image */}
        <Link href={`/projects/${project.id}`} className="block relative overflow-hidden">
          <div className="relative h-44 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            {featured && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-primary text-primary-foreground text-xs font-semibold px-2.5">
                  En vedette
                </Badge>
              </div>
            )}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className={`text-[11px] font-medium px-2 py-0.5 rounded-md border backdrop-blur-sm ${getTagColor(tech)}`}>
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-border bg-background/60 backdrop-blur-sm text-muted-foreground">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5">
          <div className="flex justify-between items-start gap-3 mb-2">
            <Link href={`/projects/${project.id}`} className="flex-1 min-w-0">
              <h3 className="font-bold text-lg leading-snug hover:text-primary transition-colors line-clamp-1">
                {project.title}
              </h3>
            </Link>
            <button
              onClick={() => toggleLike(project.id)}
              className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg text-muted-foreground hover:text-rose-500 transition-colors"
              data-testid={`btn-like-${project.id}`}
              aria-label={liked ? "Unlike" : "Like"}
            >
              <motion.div whileTap={{ scale: 0.75 }}>
                <Heart className={`h-4.5 w-4.5 transition-colors ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
              </motion.div>
            </button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-grow">
            {project.description}
          </p>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 border border-border">
                <AvatarImage src={project.authorAvatar} />
                <AvatarFallback className="text-xs">{project.author.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground truncate max-w-[100px]">{project.author}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Heart className={`h-3 w-3 ${liked ? "text-rose-500" : ""}`} />
                {project.likes + (liked ? 1 : 0)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" /> {project.views}
              </span>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="GitHub">
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Demo">
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
