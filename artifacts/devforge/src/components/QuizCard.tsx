import { Quiz } from "@/data/quizzes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, HelpCircle, BrainCircuit, CheckCircle2, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuizScores } from "@/hooks/useQuizScores";

interface QuizCardProps {
  quiz: Quiz;
  index: number;
}

const difficultyConfig = {
  Easy: { label: "Facile", cls: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", dot: "bg-emerald-400" },
  Medium: { label: "Moyen", cls: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10", dot: "bg-yellow-400" },
  Hard: { label: "Difficile", cls: "text-rose-400 border-rose-500/30 bg-rose-500/10", dot: "bg-rose-400" },
};

export function QuizCard({ quiz, index }: QuizCardProps) {
  const { getScore } = useQuizScores();
  const scoreRecord = getScore(quiz.id);
  const cfg = difficultyConfig[quiz.difficulty as keyof typeof difficultyConfig] ?? difficultyConfig.Medium;
  const pct = scoreRecord ? Math.round((scoreRecord.score / scoreRecord.total) * 100) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      className="h-full"
    >
      <div className="h-full flex flex-col bg-card border border-border rounded-2xl overflow-hidden card-hover group relative">
        {/* Completed badge */}
        {scoreRecord && pct !== null && (
          <div className="absolute top-4 right-4 z-10">
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
              pct >= 70
                ? "bg-primary/10 text-primary border-primary/25"
                : "bg-rose-500/10 text-rose-400 border-rose-500/25"
            }`}>
              <CheckCircle2 className="h-3 w-3" />
              {scoreRecord.score}/{scoreRecord.total}
            </div>
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          {/* Icon + difficulty */}
          <div className="flex items-start justify-between mb-5">
            <div className="p-3 bg-muted/60 rounded-xl border border-border group-hover:bg-primary/10 group-hover:border-primary/25 transition-all duration-300">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.cls}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>

          <h3 className="font-bold text-lg mb-1.5 group-hover:text-primary transition-colors">{quiz.title}</h3>
          <Badge variant="secondary" className="w-fit mb-3 text-xs bg-muted/40 text-muted-foreground border-border/60">
            {quiz.category}
          </Badge>
          <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-5">{quiz.description}</p>

          {/* Progress bar if completed */}
          {pct !== null && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Score obtenu</span>
                <span className={pct >= 70 ? "text-primary font-semibold" : "text-rose-400 font-semibold"}>{pct}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${pct >= 70 ? "bg-primary" : "bg-rose-500"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="flex justify-between text-xs text-muted-foreground mb-4 py-3 border-y border-border">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5" /> {quiz.questionCount} questions
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {quiz.duration} min
            </span>
          </div>

          <Link href={`/quiz/${quiz.id}`} className="w-full" data-testid={`btn-start-quiz-${quiz.id}`}>
            <Button
              className={`w-full font-semibold ${scoreRecord ? "" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
              variant={scoreRecord ? "outline" : "default"}
            >
              {scoreRecord ? (
                <><RotateCcw className="mr-2 h-4 w-4" /> Recommencer</>
              ) : (
                "Démarrer le quiz"
              )}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
