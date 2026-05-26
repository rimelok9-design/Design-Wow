import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Articles from "@/pages/articles";
import ArticleDetail from "@/pages/article-detail";
import Members from "@/pages/members";
import MemberProfile from "@/pages/member-profile";
import Quizzes from "@/pages/quizzes";
import QuizTake from "@/pages/quiz-take";
import Leaderboard from "@/pages/leaderboard";
import Dashboard from "@/pages/dashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/articles" component={Articles} />
      <Route path="/articles/:id" component={ArticleDetail} />
      <Route path="/members" component={Members} />
      <Route path="/members/:id" component={MemberProfile} />
      <Route path="/quiz" component={Quizzes} />
      <Route path="/quiz/:id" component={QuizTake} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
