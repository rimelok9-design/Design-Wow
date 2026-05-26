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
import { Terminal, Activity, CheckCircle2, Heart } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { likedProjectIds } = useLikes();
  const { scores } = useQuizScores();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated || !user) {
    return null; // redirecting
  }

  const likedProjects = mockProjects.filter(p => likedProjectIds.includes(p.id));
  
  const completedQuizzes = scores.map(s => {
    const quiz = mockQuizzes.find(q => q.id === s.quizId);
    return { ...s, quizTitle: quiz?.title || "Unknown Evaluation" };
  });

  const totalScore = scores.reduce((acc, curr) => acc + curr.score, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Profile */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card className="border-border bg-card/50 backdrop-blur sticky top-24">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-primary">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xl font-mono">{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold font-mono">{user.name}</h2>
                <p className="text-muted-foreground text-sm font-mono mb-6">{user.email}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono uppercase">Score</p>
                    <p className="text-xl font-bold text-primary font-mono">{totalScore}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono uppercase">Evals</p>
                    <p className="text-xl font-bold font-mono">{scores.length}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full font-mono">Edit Profile</Button>
                  <Button variant="destructive" className="w-full font-mono" onClick={logout}>Logout</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold font-mono">Command Center</h1>
            </div>

            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border">
                <TabsTrigger value="activity" className="font-mono">Activity</TabsTrigger>
                <TabsTrigger value="likes" className="font-mono">Saved Projects</TabsTrigger>
                <TabsTrigger value="scores" className="font-mono">Evaluations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="font-mono flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" /> Recent Logs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {scores.length === 0 && likedProjects.length === 0 ? (
                        <p className="text-muted-foreground font-mono text-center py-8">No recent activity detected.</p>
                      ) : (
                        <>
                          {scores.slice(0, 3).map((score, i) => (
                            <div key={`score-${i}`} className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-border items-center">
                              <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0" />
                              <div>
                                <p className="font-sans">Completed evaluation: <strong>{mockQuizzes.find(q => q.id === score.quizId)?.title ?? score.quizId}</strong></p>
                                <p className="text-xs text-muted-foreground font-mono mt-1">Score: {score.score}/{score.total} • {new Date(score.completedAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                          ))}
                          {likedProjects.slice(0, 2).map((project, i) => (
                            <div key={`like-${i}`} className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-border items-center">
                              <Heart className="h-8 w-8 text-red-500 fill-red-500 flex-shrink-0" />
                              <div>
                                <p className="font-sans">Acknowledged project: <strong>{project.title}</strong></p>
                                <p className="text-xs text-muted-foreground font-mono mt-1">By {project.author}</p>
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
                    <div className="py-20 text-center border border-dashed border-border rounded-xl bg-card/30">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-bold font-mono mb-2">NO_SAVED_PROJECTS</h3>
                      <p className="text-muted-foreground mb-6">You haven't acknowledged any projects yet.</p>
                      <Link href="/projects">
                        <Button className="font-mono bg-primary text-primary-foreground">Explore Repository</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <CardTitle className="font-mono">Evaluation History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {completedQuizzes.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground font-mono">
                          No evaluations completed yet.
                          <div className="mt-4">
                            <Link href="/quiz">
                              <Button variant="outline" className="font-mono">Enter Training Grounds</Button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {completedQuizzes.map((score, i) => (
                            <div key={i} className="flex justify-between items-center p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
                              <div>
                                <h4 className="font-bold font-sans">{score.quizTitle}</h4>
                                <p className="text-xs text-muted-foreground font-mono mt-1">
                                  {new Date(score.completedAt).toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-2xl font-bold font-mono text-primary">{score.score}</span>
                                <span className="text-muted-foreground font-mono">/{score.total}</span>
                              </div>
                            </div>
                          ))}
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
