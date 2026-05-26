import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useLikes } from "@/hooks/useLikes";
import { useQuizScores } from "@/hooks/useQuizScores";
import { mockProjects } from "@/data/projects";
import { mockQuizzes } from "@/data/quizzes";
import { ProjectCard } from "@/components/ProjectCard";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Activity, CheckCircle2, Heart, BrainCircuit } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { likedProjectIds } = useLikes();
  const { scores } = useQuizScores();
  const { t } = useApp();

  useEffect(() => {
    if (!isAuthenticated) setLocation("/login");
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated || !user) return null;

  const likedProjects = mockProjects.filter(p => likedProjectIds.includes(p.id));
  const completedQuizzes = scores.map(s => {
    const quiz = mockQuizzes.find(q => q.id === s.quizId);
    return { ...s, quizTitle: quiz?.title ?? s.quizId };
  });
  const totalScore = scores.reduce((acc, curr) => acc + curr.score, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-72 flex-shrink-0">
            <Card className="border-border bg-card sticky top-24">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xl font-bold">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-5 w-5 bg-emerald-500 rounded-full border-2 border-background" />
                </div>
                <h2 className="text-xl font-bold mb-0.5">{user.name}</h2>
                <p className="text-muted-foreground text-sm mb-6 truncate">{user.email}</p>

                <div className="grid grid-cols-2 gap-3 mb-6 pt-4 border-t border-border">
                  <div className="bg-muted/40 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-1">{t("dashboard.score")}</p>
                    <p className="text-2xl font-bold text-primary">{totalScore}</p>
                  </div>
                  <div className="bg-muted/40 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-1">{t("dashboard.quizzes")}</p>
                    <p className="text-2xl font-bold">{scores.length}</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Button variant="outline" className="w-full border-border hover:border-primary/40">{t("dashboard.editProfile")}</Button>
                  <Button variant="destructive" className="w-full" onClick={logout}>{t("dashboard.logout")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">{t("dashboard.title")}</h1>
            </div>

            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border rounded-xl">
                <TabsTrigger value="activity">{t("dashboard.activity")}</TabsTrigger>
                <TabsTrigger value="likes">{t("dashboard.saved")}</TabsTrigger>
                <TabsTrigger value="scores">{t("dashboard.scores")}</TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Activity className="h-5 w-5 text-primary" /> {t("dashboard.recentActivity")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {scores.length === 0 && likedProjects.length === 0 ? (
                        <p className="text-muted-foreground text-center py-10">{t("dashboard.noActivity")}</p>
                      ) : (
                        <>
                          {scores.slice(0, 3).map((score, i) => (
                            <div key={`score-${i}`} className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border items-center">
                              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 flex-shrink-0">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{t("dashboard.completedQuiz")} <strong>{mockQuizzes.find(q => q.id === score.quizId)?.title ?? score.quizId}</strong></p>
                                <p className="text-xs text-muted-foreground mt-0.5">Score: {score.score}/{score.total} · {new Date(score.completedAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                          ))}
                          {likedProjects.slice(0, 2).map((project, i) => (
                            <div key={`like-${i}`} className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border items-center">
                              <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20 flex-shrink-0">
                                <Heart className="h-5 w-5 text-rose-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{t("dashboard.likedProject")} <strong>{project.title}</strong></p>
                                <p className="text-xs text-muted-foreground mt-0.5">{t("dashboard.by")} {project.author}</p>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="likes">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {likedProjects.length === 0 ? (
                    <div className="py-24 text-center border border-dashed border-border rounded-2xl bg-card/30">
                      <Heart className="h-14 w-14 text-muted-foreground mx-auto mb-4 opacity-40" />
                      <h3 className="text-xl font-bold mb-2">{t("dashboard.noSaved")}</h3>
                      <p className="text-muted-foreground mb-6">{t("dashboard.noSavedDesc")}</p>
                      <Link href="/projects">
                        <Button className="bg-primary text-primary-foreground">{t("dashboard.exploreProjects")}</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {likedProjects.map((project, idx) => (
                        <ProjectCard key={project.id} project={project} index={idx} />
                      ))}
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="scores">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BrainCircuit className="h-5 w-5 text-primary" /> {t("dashboard.evalHistory")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {completedQuizzes.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <p className="mb-4">{t("dashboard.noScores")}</p>
                          <Link href="/quiz">
                            <Button variant="outline">{t("dashboard.goToQuiz")}</Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {completedQuizzes.map((score, i) => {
                            const pct = Math.round((score.score / score.total) * 100);
                            return (
                              <div key={i} className="flex justify-between items-center p-4 border border-border rounded-xl bg-muted/20 hover:border-primary/30 transition-colors">
                                <div className="flex-1 min-w-0 mr-4">
                                  <h4 className="font-semibold truncate">{score.quizTitle}</h4>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {new Date(score.completedAt).toLocaleString()}
                                  </p>
                                  <div className="h-1.5 bg-muted rounded-full mt-2 w-32">
                                    <div className={`h-full rounded-full ${pct >= 70 ? "bg-primary" : "bg-destructive"}`} style={{ width: `${pct}%` }} />
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <span className={`text-2xl font-bold ${pct >= 70 ? "text-primary" : "text-destructive"}`}>{score.score}</span>
                                  <span className="text-muted-foreground">/{score.total}</span>
                                  <p className="text-xs text-muted-foreground mt-0.5">{pct}%</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
