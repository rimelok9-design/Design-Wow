import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Code2, Users, Trophy, BookOpen, ArrowRight, Star, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { mockProjects } from "@/data/projects";
import { mockMembers } from "@/data/members";
import { mockArticles } from "@/data/articles";
import { mockQuizzes } from "@/data/quizzes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = 1800 / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const { t } = useApp();
  const featuresRef = useRef(null);

  const stats = [
    { label: t("home.statsDev"), value: mockMembers.length, suffix: "+" },
    { label: t("home.statsProjects"), value: mockProjects.length, suffix: "+" },
    { label: t("home.statsArticles"), value: mockArticles.length, suffix: "" },
    { label: t("home.statsQuizzes"), value: mockQuizzes.length, suffix: "" },
  ];

  const features = [
    { icon: Code2, titleKey: "home.feat1Title", descKey: "home.feat1Desc", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
    { icon: Users, titleKey: "home.feat2Title", descKey: "home.feat2Desc", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
    { icon: Trophy, titleKey: "home.feat3Title", descKey: "home.feat3Desc", color: "text-accent", bg: "bg-accent/10 border-accent/20" },
    { icon: BookOpen, titleKey: "home.feat4Title", descKey: "home.feat4Desc", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  ];

  const steps = [
    { nKey: "home.step1N", tKey: "home.step1T", dKey: "home.step1D" },
    { nKey: "home.step2N", tKey: "home.step2T", dKey: "home.step2D" },
    { nKey: "home.step3N", tKey: "home.step3T", dKey: "home.step3D" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="container mx-auto px-4 max-w-7xl py-20 z-10 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/25 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {t("home.badge")}
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08]">
              {t("home.hero1")}
              <br />
              <span className="gradient-text">{t("home.hero2")}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              {t("home.heroDesc")}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="h-13 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" data-testid="btn-hero-register">
                  {t("home.ctaJoin")} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="h-13 px-8 text-base font-medium border-border hover:bg-foreground/5" data-testid="btn-hero-projects">
                  {t("home.ctaExplore")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-16 flex items-center gap-4">
            <div className="flex -space-x-3">
              {mockMembers.slice(0, 6).map((m) => (
                <Avatar key={m.id} className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={m.avatar} />
                  <AvatarFallback className="text-xs bg-card">{m.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">{mockMembers.length}</span> {t("home.membersJoined")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-card/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t("home.featLabel")}</span>
            <h2 className="text-4xl font-bold mt-3 mb-4">{t("home.featTitle")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("home.featDesc")}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat, i) => (
              <motion.div key={feat.titleKey} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group">
                <div className={`inline-flex p-3 rounded-xl border ${feat.bg} mb-5`}>
                  <feat.icon className={`h-6 w-6 ${feat.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{t(feat.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(feat.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-card/20 border-y border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t("home.howLabel")}</span>
            <h2 className="text-4xl font-bold mt-3 mb-4">{t("home.howTitle")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.nKey} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%-16px)] w-full h-px bg-gradient-to-r from-border to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="text-5xl font-bold font-mono gradient-text mb-4 leading-none">{t(step.nKey)}</div>
                  <h3 className="text-xl font-bold mb-3">{t(step.tKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(step.dKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Members */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t("home.membersLabel")}</span>
              <h2 className="text-4xl font-bold mt-2">{t("home.membersTitle")}</h2>
            </motion.div>
            <Link href="/members">
              <Button variant="outline" className="border-border hover:border-primary/40 hover:text-primary" data-testid="btn-see-all-members">
                {t("home.seeAllMembers")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mockMembers.slice(0, 3).map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={`/members/${member.id}`}>
                  <div className="p-6 rounded-2xl border border-border bg-card/60 hover:border-primary/30 hover:bg-card card-hover cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-14 w-14 border-2 border-border">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="font-mono">{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.city}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.skills.slice(0, 3).map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs bg-muted/60">{s}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-primary" /> {member.quizScore} pts</span>
                      <span className="text-muted-foreground flex items-center gap-1.5"><Code2 className="h-3.5 w-3.5" /> {member.projectCount} projets</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/25 text-sm font-medium mb-6">
              <Zap className="h-4 w-4" /> {t("home.ctaBadge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t("home.ctaTitle1")}<br />
              <span className="gradient-text">{t("home.ctaTitle2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">{t("home.ctaDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="h-13 px-10 text-base font-semibold bg-primary text-primary-foreground glow-primary" data-testid="btn-cta-register">
                  {t("home.ctaButton")} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button size="lg" variant="outline" className="h-13 px-8 border-border hover:border-primary/40 hover:text-primary" data-testid="btn-cta-leaderboard">
                  <Trophy className="mr-2 h-5 w-5" /> {t("home.ctaLeaderboard")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
