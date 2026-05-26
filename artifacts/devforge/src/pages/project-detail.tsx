import { Layout } from "@/components/layout/Layout";
import { mockProjects } from "@/data/projects";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart, Eye, Github, ExternalLink, MessageSquare, Calendar } from "lucide-react";
import { useLikes } from "@/hooks/useLikes";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const project = mockProjects.find(p => p.id === params.id);
  const { isLiked, toggleLike } = useLikes();

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-mono font-bold mb-4">404_PROJECT_NOT_FOUND</h1>
          <Link href="/projects">
            <Button variant="outline" className="font-mono mt-4">Return to Repository</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const liked = isLiked(project.id);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/projects" className="inline-flex items-center text-primary hover:text-primary/80 font-mono mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> BACK_TO_PROJECTS
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 border border-border shadow-2xl">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <Badge key={tech} className="bg-primary/20 hover:bg-primary/30 text-primary border-primary/50 text-sm font-mono backdrop-blur">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold font-mono mb-4 text-primary">// ABOUT</h2>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed">{project.description}</p>
                  <p className="mt-4">
                    This is a mock description that would typically contain much more detailed information about the project's architecture, challenges faced during development, and future roadmap.
                  </p>
                  <p className="mt-4">
                    Built for the African ecosystem, prioritizing low-bandwidth environments and mobile-first accessibility.
                  </p>
                </div>
              </section>

              <section className="border-t border-border pt-8">
                <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  DISCUSSION
                </h2>
                <div className="p-6 border border-dashed border-border rounded-xl bg-card/30 text-center text-muted-foreground">
                  No comments initialized yet. Be the first to execute a response.
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={project.authorAvatar} />
                    <AvatarFallback className="font-mono">{project.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground font-mono">MAINTAINER</p>
                    <p className="font-bold">{project.author}</p>
                  </div>
                </div>

                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" /> Deployed</span>
                    <span>{project.createdAt}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2"><Eye className="h-4 w-4" /> Views</span>
                    <span>{project.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2"><Heart className="h-4 w-4" /> Likes</span>
                    <span>{(project.likes + (liked ? 1 : 0)).toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button 
                    onClick={() => toggleLike(project.id)}
                    variant={liked ? "default" : "outline"} 
                    className={`w-full font-mono ${liked ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/50' : ''}`}
                    data-testid="button-like-project"
                  >
                    <Heart className={`mr-2 h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                    {liked ? 'ACKNOWLEDGED' : 'ACKNOWLEDGE'}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {project.githubUrl && (
                      <Button variant="secondary" className="w-full font-mono" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> Source
                        </a>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button className="w-full font-mono bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Deploy
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
