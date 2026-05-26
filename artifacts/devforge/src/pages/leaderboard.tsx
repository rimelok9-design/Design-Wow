import { Layout } from "@/components/layout/Layout";
import { mockLeaderboard } from "@/data/leaderboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Trophy, MapPin, Zap, Crown, Medal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";

export default function Leaderboard() {
  const { t } = useApp();
  const topThree = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);

  const podiumOrder = [topThree[1], topThree[0], topThree[2]];

  const podiumConfig = {
    1: {
      gradient: "from-[#FCD116] via-yellow-400 to-yellow-600",
      border: "border-yellow-400/60",
      avatarBorder: "border-yellow-400",
      glow: "shadow-[0_0_60px_rgba(252,209,22,0.4),0_0_120px_rgba(252,209,22,0.15)]",
      textColor: "text-yellow-400",
      height: "h-40 md:h-52",
      avatarSize: "h-20 w-20 md:h-24 md:w-24",
      topLabel: t("leaderboard.1st"),
    },
    2: {
      gradient: "from-slate-300 via-slate-200 to-slate-400",
      border: "border-slate-400/50",
      avatarBorder: "border-slate-300",
      glow: "shadow-[0_0_30px_rgba(200,210,220,0.2)]",
      textColor: "text-slate-300",
      height: "h-28 md:h-40",
      avatarSize: "h-16 w-16 md:h-20 md:w-20",
      topLabel: t("leaderboard.2nd"),
    },
    3: {
      gradient: "from-[#E8112D]/70 via-rose-600 to-rose-800",
      border: "border-rose-500/50",
      avatarBorder: "border-rose-500",
      glow: "shadow-[0_0_30px_rgba(232,17,45,0.2)]",
      textColor: "text-rose-400",
      height: "h-20 md:h-32",
      avatarSize: "h-14 w-14 md:h-16 md:w-16",
      topLabel: t("leaderboard.3rd"),
    },
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/25 text-sm font-medium mb-6">
            <Trophy className="h-4 w-4" /> {t("leaderboard.badge")}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {t("leaderboard.title")} <span className="gradient-text">{t("leaderboard.titleAccent")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("leaderboard.subtitle")}
          </p>
        </motion.div>

        {/* Podium */}
        <div className="relative mb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="flex items-end justify-center gap-3 md:gap-8 px-4">
            {podiumOrder.map((user, podiumIndex) => {
              if (!user) return null;
              const isWinner = user.rank === 1;
              const cfg = podiumConfig[user.rank as 1 | 2 | 3];
              const delay = isWinner ? 0.5 : podiumIndex === 0 ? 0.3 : 0.7;

              return (
                <motion.div
                  key={user.userId}
                  initial={{ opacity: 0, y: 80, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay, type: "spring", stiffness: 120, damping: 20 }}
                  className="flex flex-col items-center w-[28%] max-w-[180px]"
                >
                  {isWinner && (
                    <motion.div
                      initial={{ scale: 0, rotate: -30, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 15 }}
                      className="mb-2"
                    >
                      <Crown className="h-10 w-10 text-[#FCD116] drop-shadow-[0_0_12px_rgba(252,209,22,0.9)]" />
                    </motion.div>
                  )}
                  {!isWinner && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: delay + 0.4 }}
                      className="mb-2 h-8"
                    >
                      <Medal className={`h-7 w-7 ${cfg.textColor}`} />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
                    className="relative mb-3"
                  >
                    {isWinner && (
                      <div className="absolute inset-0 rounded-full bg-[#FCD116]/20 blur-xl scale-150" />
                    )}
                    <Avatar className={`${cfg.avatarSize} ${cfg.avatarBorder} relative z-10`} style={{ borderWidth: isWinner ? 3 : 2 }}>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="font-bold">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-card border ${cfg.border} ${cfg.textColor} whitespace-nowrap z-20`}>
                      {cfg.topLabel}
                    </div>
                  </motion.div>

                  <div className="text-center mb-4 mt-4">
                    <p className={`font-bold text-sm md:text-base truncate w-full px-1 ${isWinner ? "text-foreground" : "text-foreground/80"}`}>
                      {user.name.split(" ")[0]}
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: delay + 0.6 }}
                      className={`text-sm font-mono font-bold ${cfg.textColor}`}
                    >
                      {user.totalScore.toLocaleString()} pts
                    </motion.p>
                  </div>

                  <div className={`w-full rounded-t-2xl bg-gradient-to-t ${cfg.gradient} ${cfg.height} ${isWinner ? cfg.glow : ""} flex items-start justify-center pt-4 relative overflow-hidden`}>
                    <span className="text-4xl md:text-6xl font-black opacity-15 select-none font-mono">
                      {user.rank}
                    </span>
                    {isWinner && (
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="h-4 bg-gradient-to-r from-transparent via-border to-transparent mx-8 rounded-b-lg" />
        </div>

        {/* Rest of leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-1 text-center">{t("leaderboard.rank")}</div>
            <div className="col-span-5 md:col-span-5">{t("leaderboard.developer")}</div>
            <div className="col-span-3 hidden md:block">{t("leaderboard.city")}</div>
            <div className="col-span-4 md:col-span-2 text-right md:text-left">{t("leaderboard.score")}</div>
            <div className="col-span-1 hidden md:flex justify-end">{t("leaderboard.streak")}</div>
          </div>

          <div className="divide-y divide-border">
            {rest.map((user, index) => (
              <motion.div
                key={user.userId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.1 + index * 0.04 }}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-foreground/[0.02] transition-colors group"
              >
                <div className="col-span-1 text-center font-mono text-sm font-medium text-muted-foreground">
                  {user.rank}
                </div>

                <div className="col-span-8 md:col-span-5 flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-border group-hover:border-primary/40 transition-colors flex-shrink-0">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xs">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 md:hidden">
                      <MapPin className="h-3 w-3" /> {user.city}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex col-span-3 items-center text-sm text-muted-foreground gap-1">
                  <MapPin className="h-3 w-3 flex-shrink-0" /> {user.city}
                </div>

                <div className="col-span-3 md:col-span-2">
                  <Badge variant="outline" className="font-mono border-primary/30 text-primary text-xs">
                    {user.totalScore.toLocaleString()}
                  </Badge>
                </div>

                <div className="hidden md:flex col-span-1 justify-end items-center gap-1 text-sm font-mono text-accent">
                  <Zap className="h-3.5 w-3.5" /> {user.streak}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
