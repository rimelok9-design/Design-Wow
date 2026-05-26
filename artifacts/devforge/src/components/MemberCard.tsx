import { Member } from "@/data/members";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trophy, FolderGit2 } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberCardProps {
  member: Member;
  index: number;
}

const levelConfig = {
  Junior: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Mid: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Senior: "bg-primary/10 text-primary border-primary/20",
};

export function MemberCard({ member, index }: MemberCardProps) {
  const [, navigate] = useLocation();

  const handleCardClick = () => navigate(`/members/${member.id}`);

  const stopProp = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <div
        className="bg-card border border-border rounded-2xl overflow-hidden card-hover cursor-pointer group relative"
        onClick={handleCardClick}
        data-testid={`card-member-${member.id}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
      >
        {/* Top accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-accent/40 to-transparent" />

        {/* Social buttons — use stopPropagation so click on them doesn't navigate */}
        <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 translate-y-2 group-hover:translate-y-0">
          <a
            href={member.github}
            onClick={stopProp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-card/80 backdrop-blur rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <SiGithub className="h-3.5 w-3.5" />
          </a>
          <a
            href={member.linkedin}
            onClick={stopProp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-card/80 backdrop-blur rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
          <a
            href={member.twitter}
            onClick={stopProp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-card/80 backdrop-blur rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-colors"
            aria-label="Twitter / X"
          >
            <SiX className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-lg scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Avatar className="h-16 w-16 border-2 border-border group-hover:border-primary/50 transition-colors relative z-10">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-lg font-bold">{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base leading-tight truncate">{member.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 flex-shrink-0" /> {member.city}
              </p>
              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mt-1.5 ${levelConfig[member.level]}`}>
                {member.level}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{member.bio}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {member.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs bg-muted/40 text-muted-foreground border-border/60">
                {skill}
              </Badge>
            ))}
            {member.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs bg-muted/40">+{member.skills.length - 4}</Badge>
            )}
          </div>

          {/* Stats */}
          <div className="flex border border-border rounded-xl overflow-hidden">
            <div className="flex-1 py-2.5 px-3 flex flex-col items-center border-r border-border">
              <span className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1 uppercase tracking-wide">
                <FolderGit2 className="h-3 w-3" /> Projets
              </span>
              <span className="font-bold text-sm">{member.projectCount}</span>
            </div>
            <div className="flex-1 py-2.5 px-3 flex flex-col items-center">
              <span className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1 uppercase tracking-wide">
                <Trophy className="h-3 w-3" /> Score
              </span>
              <span className="font-bold text-sm text-primary">{member.quizScore}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
