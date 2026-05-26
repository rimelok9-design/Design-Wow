import { Member } from "@/data/members";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trophy, FolderGit2 } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface MemberCardProps {
  member: Member;
  index: number;
}

export function MemberCard({ member, index }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/members/${member.id}`}>
        <Card className="h-full flex flex-col bg-card hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,255,128,0.1)] transition-all overflow-hidden group cursor-pointer relative">
          
          {/* Hover Overlay with Socials */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
            <a href={member.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
              <SiGithub className="h-6 w-6" />
            </a>
            <a href={member.linkedin} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href={member.twitter} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
              <SiX className="h-6 w-6" />
            </a>
          </div>

          <CardHeader className="p-6 pb-4 text-center items-center relative z-0">
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
                {member.level}
              </Badge>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Avatar className="h-24 w-24 border-2 border-border group-hover:border-primary transition-colors relative z-10">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xl font-mono">{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            
            <h3 className="font-bold text-xl mt-4 font-mono">{member.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1 font-mono">
              <MapPin className="h-3 w-3" /> {member.city}
            </p>
          </CardHeader>
          
          <CardContent className="p-6 py-2 flex-grow text-center z-0 relative">
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{member.bio}</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {member.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-muted text-xs font-mono">
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 4 && (
                <Badge variant="secondary" className="bg-muted text-xs font-mono">
                  +{member.skills.length - 4}
                </Badge>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="p-4 border-t border-border/50 flex justify-between bg-muted/20 z-0 relative">
            <div className="flex flex-col items-center flex-1 border-r border-border/50">
              <span className="text-xs text-muted-foreground font-mono mb-1 flex items-center gap-1"><FolderGit2 className="h-3 w-3" /> Projects</span>
              <span className="font-bold font-mono">{member.projectCount}</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-xs text-muted-foreground font-mono mb-1 flex items-center gap-1"><Trophy className="h-3 w-3" /> Score</span>
              <span className="font-bold font-mono text-primary">{member.quizScore}</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
