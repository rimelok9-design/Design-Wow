import { Project } from "@/data/projects";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Github, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useLikes } from "@/hooks/useLikes";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { isLiked, toggleLike } = useLikes();
  const liked = isLiked(project.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col bg-card hover:border-primary/50 transition-colors overflow-hidden group">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-background/80 backdrop-blur text-xs font-mono border-primary/20 text-primary">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs font-mono">
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>
        </div>
        
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start mb-2">
            <Link href={`/projects/${project.id}`} className="hover:text-primary transition-colors block">
              <h3 className="font-bold text-xl font-mono line-clamp-1">{project.title}</h3>
            </Link>
            <button 
              onClick={(e) => { e.preventDefault(); toggleLike(project.id); }}
              className="text-muted-foreground hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
              data-testid={`btn-like-${project.id}`}
            >
              <motion.div whileTap={{ scale: 0.8 }}>
                <Heart className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              </motion.div>
            </button>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        </CardHeader>
        
        <CardContent className="p-4 py-2 flex-grow">
          <div className="flex items-center gap-2 mt-4">
            <Avatar className="h-6 w-6 border border-primary/20">
              <AvatarImage src={project.authorAvatar} />
              <AvatarFallback className="text-xs font-mono">{project.author.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground font-mono">{project.author}</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-2 border-t border-border/50 flex justify-between items-center bg-muted/20">
          <div className="flex gap-4 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {project.likes + (liked ? 1 : 0)}</span>
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {project.views}</span>
          </div>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-1" aria-label="GitHub Repository">
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-1" aria-label="Live Demo">
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
