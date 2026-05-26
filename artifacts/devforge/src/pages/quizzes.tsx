import { Layout } from "@/components/layout/Layout";
import { mockQuizzes } from "@/data/quizzes";
import { QuizCard } from "@/components/QuizCard";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function Quizzes() {
  const { t } = useApp();
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
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
            <BrainCircuit className="h-4 w-4" /> {t("quiz.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("quiz.title")}</h1>
          <p className="text-muted-foreground text-lg">{t("quiz.subtitle")}</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-full sm:w-[200px] bg-card border-border">
              <SelectValue placeholder={t("quiz.allDiff")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("quiz.allDiff")}</SelectItem>
              <SelectItem value="Easy">{t("quiz.easy")}</SelectItem>
              <SelectItem value="Medium">{t("quiz.medium")}</SelectItem>
              <SelectItem value="Hard">{t("quiz.hard")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[200px] bg-card border-border">
              <SelectValue placeholder={t("quiz.allCats")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("quiz.allCats")}</SelectItem>
              {categories.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredQuizzes.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-border rounded-2xl bg-card/30">
            <BrainCircuit className="h-14 w-14 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground">{t("quiz.empty")}</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredQuizzes.map((quiz, index) => (
                <QuizCard key={quiz.id} quiz={quiz} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
