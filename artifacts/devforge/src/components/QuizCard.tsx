import { Quiz } from "@/data/quizzes";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, HelpCircle, BrainCircuit } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuizScores } from "@/hooks/useQuizScores";

interface QuizCardProps {
  quiz: Quiz;
  index: number;
}

export function QuizCard({ quiz, index }: QuizCardProps) {
  const { getScore } = useQuizScores();
  const scoreRecord = getScore(quiz.id);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10';
      case 'Medium': return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10';
      case 'Hard': return 'text-red-500 border-red-500/30 bg-red-500/10';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col bg-card hover:border-primary/50 transition-all group overflow-hidden relative">
        {scoreRecord && (
          <div className="absolute top-0 right-0 p-4 z-10">
            <div className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded shadow-lg font-mono">
              SCORE: {scoreRecord.score}/{scoreRecord.total}
            </div>
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-muted rounded-lg group-hover:bg-primary/20 transition-colors">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="outline" className={`font-mono ${getDifficultyColor(quiz.difficulty)}`}>
              {quiz.difficulty}
            </Badge>
          </div>
          <h3 className="font-bold text-xl mb-2">{quiz.title}</h3>
          <Badge variant="secondary" className="w-fit mb-2 text-xs font-mono">{quiz.category}</Badge>
        </CardHeader>
        
        <CardContent className="py-2 flex-grow">
          <p className="text-sm text-muted-foreground">{quiz.description}</p>
        </CardContent>
        
        <CardFooter className="pt-4 border-t border-border/50 flex flex-col gap-4">
          <div className="w-full flex justify-between text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1"><HelpCircle className="h-3 w-3" /> {quiz.questionCount} Questions</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {quiz.duration} Mins</span>
          </div>
          <Link href={`/quiz/${quiz.id}`} className="w-full">
            <Button className="w-full font-mono font-bold" variant={scoreRecord ? "outline" : "default"}>
              {scoreRecord ? "RETRY_EVALUATION" : "BEGIN_EVALUATION"}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
