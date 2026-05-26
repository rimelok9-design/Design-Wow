import { Layout } from "@/components/layout/Layout";
import { mockQuizzes } from "@/data/quizzes";
import { QuizCard } from "@/components/QuizCard";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit } from "lucide-react";

export default function Quizzes() {
  const [difficulty, setDifficulty] = useState("all");
  const [category, setCategory] = useState("all");

  const categories = Array.from(new Set(mockQuizzes.map(q => q.category))).sort();

  const filteredQuizzes = useMemo(() => {
    return mockQuizzes.filter(q => {
      const matchesDifficulty = difficulty === "all" || q.difficulty === difficulty;
      const matchesCategory = category === "all" || q.category === category;
      return matchesDifficulty && matchesCategory;
    });
  }, [difficulty, category]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-mono mb-4">
            <BrainCircuit className="h-4 w-4" /> TRAINING_GROUNDS
          </div>
          <h1 className="text-4xl font-bold font-mono tracking-tight mb-4 text-foreground">
            Skill Evaluations
          </h1>
          <p className="text-muted-foreground text-lg">
            Test your knowledge, earn points, and climb the leaderboard. Only the strongest survive the forge.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-full sm:w-[200px] font-mono bg-card">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[200px] font-mono bg-card">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredQuizzes.map((quiz, index) => (
              <QuizCard key={quiz.id} quiz={quiz} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono border border-dashed border-border rounded-xl mt-8">
            NO_EVALUATIONS_MATCH_CRITERIA
          </div>
        )}
      </div>
    </Layout>
  );
}
