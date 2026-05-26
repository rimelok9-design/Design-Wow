import { Layout } from "@/components/layout/Layout";
import { mockLeaderboard } from "@/data/leaderboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Trophy, Medal, MapPin, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Leaderboard() {
  const topThree = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);

  // Reorder for podium: 2nd, 1st, 3rd
  const podiumOrder = [topThree[1], topThree[0], topThree[2]];

  const getPodiumColor = (rank: number) => {
    switch (rank) {
      case 1: return "from-yellow-400 to-yellow-600 shadow-[0_0_30px_rgba(250,204,21,0.3)]";
      case 2: return "from-slate-300 to-slate-500 shadow-[0_0_20px_rgba(203,213,225,0.2)]";
      case 3: return "from-amber-600 to-orange-800 shadow-[0_0_20px_rgba(217,119,6,0.2)]";
      default: return "";
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return "h-48 md:h-64";
      case 2: return "h-40 md:h-48";
      case 3: return "h-32 md:h-40";
      default: return "";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-mono mb-4">
            <Trophy className="h-4 w-4" /> HALL_OF_FAME
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-4">
            Top Operatives
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The highest scoring members based on quiz evaluations and platform contributions.
          </p>
        </motion.div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-2 md:gap-6 mb-20 px-2">
          {podiumOrder.map((user, index) => {
            if (!user) return null;
            const isCenter = index === 1; // 1st place
            const delay = isCenter ? 0.4 : index === 0 ? 0.2 : 0.6;
            
            return (
              <motion.div 
                key={user.userId}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay }}
                className="flex flex-col items-center relative w-1/3 max-w-[200px]"
              >
                {isCenter && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute -top-12 z-20"
                  >
                    <Trophy className="h-10 w-10 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                  </motion.div>
                )}
                
                <div className="relative mb-4 z-10">
                  <Avatar className={`${isCenter ? 'h-20 w-20 md:h-24 md:w-24 border-4 border-yellow-400' : 'h-16 w-16 md:h-20 md:w-20 border-2 border-border'}`}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="font-mono">{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full h-6 w-6 flex items-center justify-center font-bold font-mono text-xs bg-background border ${isCenter ? 'border-yellow-400 text-yellow-400' : 'border-border'}`}>
                    {user.rank}
                  </div>
                </div>

                <div className="text-center mb-4 hidden md:block">
                  <p className="font-bold font-mono text-sm truncate w-full px-2">{user.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{user.totalScore} PTS</p>
                </div>

                <div className={`w-full rounded-t-xl bg-gradient-to-t ${getPodiumColor(user.rank)} ${getPodiumHeight(user.rank)} flex flex-col items-center justify-start pt-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                  <span className="text-3xl md:text-5xl font-bold text-white/50 font-mono mix-blend-overlay">
                    {user.rank}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* List */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/50 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <div className="col-span-2 md:col-span-1 text-center">Rank</div>
            <div className="col-span-8 md:col-span-5">Operative</div>
            <div className="col-span-2 md:col-span-2 hidden md:block">Location</div>
            <div className="col-span-2 md:col-span-2 text-right md:text-left">Score</div>
            <div className="col-span-2 md:col-span-2 hidden md:block text-right">Streak</div>
          </div>
          
          <div className="divide-y divide-border">
            {rest.map((user, index) => (
              <motion.div 
                key={user.userId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + (index * 0.05) }}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-colors group"
              >
                <div className="col-span-2 md:col-span-1 text-center font-mono font-bold text-muted-foreground">
                  #{user.rank}
                </div>
                
                <div className="col-span-8 md:col-span-5 flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border group-hover:border-primary transition-colors">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold font-sans">{user.name}</p>
                    <p className="text-xs text-muted-foreground font-mono flex items-center gap-1 md:hidden mt-1">
                      <MapPin className="h-3 w-3" /> {user.city}
                    </p>
                  </div>
                </div>
                
                <div className="col-span-2 md:col-span-2 hidden md:flex items-center text-sm text-muted-foreground font-mono">
                  <MapPin className="h-3 w-3 mr-1" /> {user.city}
                </div>
                
                <div className="col-span-2 md:col-span-2 text-right md:text-left">
                  <Badge variant="outline" className="font-mono border-primary/30 text-primary">
                    {user.totalScore}
                  </Badge>
                </div>
                
                <div className="col-span-2 md:col-span-2 hidden md:flex justify-end items-center text-sm font-mono text-orange-400">
                  <Zap className="h-4 w-4 mr-1" /> {user.streak}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
