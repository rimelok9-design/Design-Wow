import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  Code2, Users, Trophy, BookOpen, ArrowRight, Star,
  Zap, CheckCircle2, Globe, Shield, ChevronRight,
  GitBranch, TrendingUp, Award, MapPin, Layers
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { mockProjects } from "@/data/projects";
import { mockMembers } from "@/data/members";
import { mockArticles } from "@/data/articles";
import { mockQuizzes } from "@/data/quizzes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";
import { LogoIcon } from "@/components/LogoIcon";

/* ─── ANIMATED COUNTER ─────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 50;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── LIVE TERMINAL ────────────────────────────────────────────── */
const terminalLines = [
  { text: "✓ Marcel Houngbédji — Quiz Python complété   +95pts", color: "text-green-500" },
  { text: "✓ Rosine Dossou — Projet AgroConnect publié  🚀", color: "text-green-600" },
  { text: "✓ Théodore Gbèdji — Badge Senior Dev obtenu  🏆", color: "text-green-500" },
  { text: "✓ Sylvie Kpêdékpo — Article React Native posté", color: "text-green-600" },
  { text: "✓ Kofi Adjovi — 1er au classement général  👑", color: "text-green-500" },
  { text: "✓ Aïssatou Sègnon — Quiz Sécurité terminé  +88pts", color: "text-green-600" },
  { text: "✓ 23 développeurs en ligne maintenant  ⚡", color: "text-green-500" },
];

function LiveTerminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([0]);
  const [currentChar, setCurrentChar] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const line = terminalLines[lineIndex];
    if (currentChar < line.text.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        const next = (lineIndex + 1) % terminalLines.length;
        setLineIndex(next);
        setCurrentChar(0);
        setVisibleLines(prev => {
          const updated = [...prev, next];
          return updated.length > 5 ? updated.slice(-5) : updated;
        });
      }, 900);
      return () => clearTimeout(t);
    }
  }, [currentChar, lineIndex]);

  const displayLines = visibleLines.slice(0, -1);
  const typingLine = terminalLines[lineIndex];

  return (
    <div className="bg-gray-950 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="h-3 w-3 rounded-full bg-[#E8112D]/80" />
        <div className="h-3 w-3 rounded-full bg-[#FCD116]/80" />
        <div className="h-3 w-3 rounded-full bg-[#008751]/80" />
        <span className="ml-3 text-xs text-gray-500 font-mono">devbenin — live activity</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-mono">LIVE</span>
        </span>
      </div>
      {/* Terminal body */}
      <div className="p-5 font-mono text-sm space-y-2 min-h-[220px]">
        <div className="text-gray-500 text-xs mb-3">$ devbenin stream --live</div>
        {displayLines.map((li, i) => (
          <motion.div
            key={`${li}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${terminalLines[li].color} text-xs leading-relaxed`}
          >
            {terminalLines[li].text}
          </motion.div>
        ))}
        <div className={`${typingLine.color} text-xs leading-relaxed`}>
          {typingLine.text.slice(0, currentChar)}
          <span className="inline-block w-0.5 h-3.5 bg-green-400 ml-0.5 cursor-blink align-middle" />
        </div>
      </div>
    </div>
  );
}

/* ─── HOME PAGE ────────────────────────────────────────────────── */
export default function Home() {
  const { t } = useApp();
  const featuredProjects = mockProjects.slice(0, 3);
  const topMembers = mockMembers.filter(m => m.level === "Senior").slice(0, 6);
  const latestArticles = mockArticles.slice(0, 3);
  const featuredQuiz = mockQuizzes[0];

  const stats = [
    { value: 500, suffix: "+", label: t("home.statMembers"), icon: Users, color: "text-[#008751]", bg: "bg-[#008751]/8" },
    { value: 200, suffix: "+", label: t("home.statProjects"), icon: Code2, color: "text-[#FCD116]", bg: "bg-[#FCD116]/10" },
    { value: 50, suffix: "+", label: t("home.statMentors"), icon: Award, color: "text-[#E8112D]", bg: "bg-[#E8112D]/8" },
    { value: 12, suffix: "", label: t("home.statCities"), icon: MapPin, color: "text-[#008751]", bg: "bg-[#008751]/8" },
  ];

  const features = [
    {
      icon: GitBranch,
      title: t("home.feat1Title"),
      desc: t("home.feat1Desc"),
      color: "text-[#008751]",
      bg: "bg-[#008751]/8 border-[#008751]/15",
    },
    {
      icon: TrendingUp,
      title: t("home.feat2Title"),
      desc: t("home.feat2Desc"),
      color: "text-[#FCD116]",
      bg: "bg-[#FCD116]/8 border-[#FCD116]/15",
    },
    {
      icon: Shield,
      title: t("home.feat3Title"),
      desc: t("home.feat3Desc"),
      color: "text-[#E8112D]",
      bg: "bg-[#E8112D]/8 border-[#E8112D]/15",
    },
  ];

  const testimonials = [
    {
      name: "Marcel Houngbédji",
      role: "Senior Dev · IA & NLP",
      city: "Cotonou",
      text: "DevBenin a transformé ma carrière. En 6 mois j'ai pu collaborer avec des équipes tech à Paris et Lagos grâce au réseau de la communauté.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&auto=format",
      score: 1120,
    },
    {
      name: "Rosine Dossou",
      role: "Frontend Engineer",
      city: "Porto-Novo",
      text: "Les quiz techniques m'ont aidée à me préparer pour des entretiens dans des entreprises internationales. La qualité du contenu est exceptionnelle.",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format",
      score: 780,
    },
    {
      name: "Fabrice Zinsou",
      role: "UI/UX Engineer",
      city: "Cotonou",
      text: "Ce que j'aime c'est la bienveillance. Ici on partage sans complexe. Des seniors expérimentés qui prennent le temps d'aider les juniors.",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face&auto=format",
      score: 980,
    },
  ];

  const skills = ["React", "Python", "TypeScript", "Go", "Kubernetes", "PostgreSQL", "Vue", "Node.js", "Flutter", "AWS", "Docker", "Next.js", "Rust", "Redis", "GraphQL", "FastAPI", "Solidity", "TensorFlow"];

  return (
    <Layout>

      {/* ════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════ */}
      <section className="hero-bg relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-20 text-center">

          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#008751]/25 bg-[#008751]/6 text-[#008751] text-sm font-semibold mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-[#008751] animate-pulse" />
            {t("home.heroBadge")}
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto"
          >
            {t("home.heroLine1")}{" "}
            <span className="logo-gradient">{t("home.heroAccent")}</span>
            <br />
            {t("home.heroLine2")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t("home.heroSubtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-base font-bold bg-primary text-primary-foreground glow-primary group">
                {t("home.heroCta1")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold border-border hover:border-primary/40">
                {t("home.heroCta2")}
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center justify-center gap-3 mb-16"
          >
            <div className="flex -space-x-2.5">
              {mockMembers.slice(0, 6).map((m) => (
                <Avatar key={m.id} className="h-9 w-9 border-2 border-background shadow-sm">
                  <AvatarImage src={m.avatar} />
                  <AvatarFallback className="text-xs">{m.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">500+</span> {t("home.socialProof")}
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#FCD116] text-[#FCD116]" />
              ))}
            </div>
          </motion.div>

          {/* ── THE UNIQUE ELEMENT: Split Live Studio ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6"
          >
            {/* Left: Live terminal */}
            <div className="text-left">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Activité en direct
              </p>
              <LiveTerminal />
            </div>

            {/* Right: Community stats card */}
            <div className="text-left flex flex-col gap-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-0 flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-[#FCD116]" />
                Impact de la communauté
              </p>

              {/* Benin flag accent bar */}
              <div className="h-1 rounded-full bg-gradient-to-r from-[#008751] via-[#FCD116] to-[#E8112D]" />

              <div className="grid grid-cols-2 gap-3 flex-1">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.08 }}
                    className="bg-card border border-border rounded-xl p-4"
                  >
                    <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                      <s.icon className={`h-4.5 w-4.5 ${s.color}`} />
                    </div>
                    <p className={`text-3xl font-black ${s.color} leading-none mb-1`}>
                      <AnimatedCounter target={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Top dev preview */}
              <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-[#FCD116]/40">
                  <AvatarImage src={mockMembers[2].avatar} />
                  <AvatarFallback>MH</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{mockMembers[2].name}</p>
                  <p className="text-xs text-muted-foreground truncate">{mockMembers[2].bio.substring(0, 48)}…</p>
                </div>
                <Badge className="bg-[#FCD116]/15 text-[#9B7A00] dark:text-[#FCD116] border-0 text-xs font-bold flex-shrink-0">
                  #1
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SKILLS MARQUEE
      ════════════════════════════════════ */}
      <div className="border-y border-border bg-muted/40 py-4 overflow-hidden">
        <div className="flex gap-6 animate-marquee whitespace-nowrap w-max">
          {[...skills, ...skills].map((s, i) => (
            <span key={i} className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          FEATURES SECTION
      ════════════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t("home.featBadge")}</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{t("home.featTitle")}</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t("home.featSubtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl border ${f.bg} card-hover`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-background border border-border shadow-sm`}>
                  <f.icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TOP MENTORS / MEMBERS
      ════════════════════════════════════ */}
      <section className="py-24 section-divider bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4"
          >
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t("home.membersBadge")}</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t("home.membersTitle")}</h2>
            </div>
            <Link href="/members">
              <Button variant="outline" className="group flex-shrink-0">
                {t("home.membersAll")} <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMembers.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/members/${m.id}`}>
                  <div className="bg-card border border-border rounded-2xl p-6 card-hover cursor-pointer h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-14 w-14 border-2 border-border flex-shrink-0">
                        <AvatarImage src={m.avatar} />
                        <AvatarFallback className="font-bold">{m.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate">{m.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 flex-shrink-0" /> {m.city}
                        </p>
                        <Badge
                          className="mt-2 text-xs"
                          style={{
                            background: m.level === "Senior" ? "rgba(0,135,81,0.1)" : m.level === "Mid" ? "rgba(252,209,22,0.1)" : "rgba(232,17,45,0.08)",
                            color: m.level === "Senior" ? "#006b41" : m.level === "Mid" ? "#9B7A00" : "#c00",
                            border: "none",
                          }}
                        >
                          {m.level}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{m.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.skills.slice(0, 3).map(s => (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground font-medium">
                          {s}
                        </span>
                      ))}
                      {m.skills.length > 3 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground">
                          +{m.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FEATURED PROJECTS
      ════════════════════════════════════ */}
      <section className="py-24 bg-background section-divider">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4"
          >
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t("home.projectsBadge")}</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t("home.projectsTitle")}</h2>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="group flex-shrink-0">
                {t("home.projectsAll")} <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/projects/${p.id}`}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden card-hover cursor-pointer h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                        {p.techStack.slice(0, 2).map(t => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-base mb-2 line-clamp-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-1">{p.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 border border-border">
                            <AvatarImage src={p.authorAvatar} />
                            <AvatarFallback className="text-[10px]">{p.author.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{p.author.split(" ")[0]}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Star className="h-3 w-3" />{p.likes}</span>
                          <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{p.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          QUIZ CHALLENGE BANNER
      ════════════════════════════════════ */}
      <section className="py-20 bg-[#008751] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-white/30 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full border border-white/20 -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-bold mb-6 border border-white/20">
              <Zap className="h-4 w-4 text-[#FCD116]" />
              {t("home.quizBadge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {t("home.quizTitle")}
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              {t("home.quizSubtitle")}
            </p>
            {featuredQuiz && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
                <Badge className="bg-[#FCD116] text-black border-0 text-xs font-bold mb-3">
                  {t("home.quizFeatured")}
                </Badge>
                <h3 className="text-white font-bold text-lg mb-1">{featuredQuiz.title}</h3>
                <p className="text-white/70 text-sm mb-4">{featuredQuiz.questionCount} questions · {featuredQuiz.duration} min</p>
                <Link href={`/quiz/${featuredQuiz.id}`}>
                  <Button className="w-full bg-white text-[#008751] font-bold hover:bg-white/90">
                    {t("home.quizStart")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          LATEST ARTICLES
      ════════════════════════════════════ */}
      <section className="py-24 bg-background section-divider">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4"
          >
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t("home.articlesBadge")}</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t("home.articlesTitle")}</h2>
            </div>
            <Link href="/articles">
              <Button variant="outline" className="group flex-shrink-0">
                {t("home.articlesAll")} <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestArticles.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/articles/${a.id}`}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden card-hover cursor-pointer h-full flex flex-col">
                    <div className="h-44 overflow-hidden">
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs text-primary border-primary/30">{a.category}</Badge>
                        <span className="text-xs text-muted-foreground">{a.readTime} min</span>
                      </div>
                      <h3 className="font-bold text-base mb-2 line-clamp-2 flex-1">{a.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{a.excerpt}</p>
                      <div className="flex items-center gap-2 pt-3 border-t border-border">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={a.authorAvatar} />
                          <AvatarFallback className="text-[10px]">{a.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{a.author}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════ */}
      <section className="py-24 bg-muted/20 section-divider">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t("home.testiBadge")}</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{t("home.testiTitle")}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-7 card-hover flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[#FCD116] text-[#FCD116]" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Avatar className="h-11 w-11 border-2 border-border">
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs font-bold text-primary">{t.score.toLocaleString()} pts</p>
                    <p className="text-[10px] text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHY US — CHECKLIST
      ════════════════════════════════════ */}
      <section className="py-24 bg-background section-divider">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t("home.whyBadge")}</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">{t("home.whyTitle")}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t("home.whyDesc")}</p>
              <Link href="/register">
                <Button className="bg-primary text-primary-foreground font-bold glow-primary">
                  {t("home.whyCta")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { text: t("home.why1"), color: "text-[#008751]" },
                { text: t("home.why2"), color: "text-[#FCD116]" },
                { text: t("home.why3"), color: "text-[#E8112D]" },
                { text: t("home.why4"), color: "text-[#008751]" },
                { text: t("home.why5"), color: "text-[#FCD116]" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card"
                >
                  <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 ${item.color}`} />
                  <span className="text-sm font-medium leading-relaxed">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════ */}
      <section className="py-28 bg-background section-divider">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-8">
              <LogoIcon size={72} />
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              {t("home.ctaTitle")}
              <br />
              <span className="logo-gradient">{t("home.ctaAccent")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10">
              {t("home.ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="h-13 px-10 text-base font-bold bg-primary text-primary-foreground glow-primary group">
                  {t("home.ctaBtn")} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/quiz">
                <Button size="lg" variant="outline" className="h-13 px-10 text-base font-semibold border-border hover:border-primary/40">
                  {t("home.ctaQuiz")}
                </Button>
              </Link>
            </div>

            {/* Benin flag bar */}
            <div className="mt-14 flex items-center justify-center gap-0 overflow-hidden rounded-full h-1.5 max-w-xs mx-auto">
              <div className="flex-1 h-full bg-[#008751]" />
              <div className="flex-1 h-full bg-[#FCD116]" />
              <div className="flex-1 h-full bg-[#E8112D]" />
            </div>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
