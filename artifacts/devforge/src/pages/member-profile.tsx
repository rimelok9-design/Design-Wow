import { Layout } from "@/components/layout/Layout";
import { mockMembers } from "@/data/members";
import { mockProjects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Trophy, FolderGit2 } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function MemberProfile() {
  const params = useParams<{ id: string }>();
  const member = mockMembers.find(m => m.id === params.id);
  
  // Find projects by this member (using string matching since we mock it)
  const memberProjects = mockProjects.filter(p => p.author === member?.name);

  if (!member) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-mono font-bold mb-4">404_OPERATIVE_NOT_FOUND</h1>
          <Link href="/members">
            <Button variant="outline" className="font-mono mt-4">Return to Directory</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Link href="/members" className="inline-flex items-center text-primary hover:text-primary/80 font-mono mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> BACK_TO_DIRECTORY
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <div className="bg-card border border-border rounded-xl p-6 text-center sticky top-24">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110" />
                <Avatar className="h-32 w-32 border-4 border-card relative z-10 mx-auto">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-3xl font-mono">{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono uppercase tracking-widest z-20 whitespace-nowrap bg-primary text-primary-foreground">
                  {member.level}
                </Badge>
              </div>
              
              <h1 className="text-2xl font-bold font-mono mb-2">{member.name}</h1>
              <p className="text-muted-foreground flex items-center justify-center gap-1 font-mono text-sm mb-6">
                <MapPin className="h-4 w-4 text-primary" /> {member.city}
              </p>

              <div className="flex justify-center gap-4 mb-8">
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <SiGithub className="h-5 w-5" />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <SiX className="h-5 w-5" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1"><FolderGit2 className="h-3 w-3 inline mr-1" />Projects</p>
                  <p className="text-xl font-bold font-mono">{member.projectCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1"><Trophy className="h-3 w-3 inline mr-1" />Score</p>
                  <p className="text-xl font-bold font-mono text-primary">{member.quizScore}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground font-mono flex items-center justify-center gap-1">
                  <Calendar className="h-3 w-3" /> Joined {new Date(member.joinedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 space-y-8"
          >
            <section className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-xl font-bold font-mono mb-4 text-primary">// BIO</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {member.bio}
              </p>
              
              <h3 className="text-sm font-bold font-mono mt-8 mb-4 text-muted-foreground uppercase tracking-wider">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="font-mono bg-muted/50 border border-border">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold font-mono mb-6 text-primary flex items-center gap-2">
                <FolderGit2 className="h-5 w-5" /> REPOSITORIES
              </h2>
              
              {memberProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {memberProjects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-border rounded-xl bg-card/30 text-muted-foreground font-mono">
                  No public repositories initialized.
                </div>
              )}
            </section>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
