import { Layout } from "@/components/layout/Layout";
import { mockQuizzes } from "@/data/quizzes";
import { useParams, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizScores } from "@/hooks/useQuizScores";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/contexts/AppContext";
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, XCircle, BrainCircuit } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function QuizTake() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { t } = useApp();
  const quiz = mockQuizzes.find(q => q.id === params.id);
  const { addScore } = useQuizScores();
  const { isAuthenticated } = useAuth();

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (quiz && started && !finished) {
      setTimeLeft(quiz.duration * 60);
    }
  }, [quiz, started, finished]);

  const handleTimeUp = useCallback(() => {
    setFinished(true);
    addScore({
      quizId: quiz!.id,
      score,
      total: quiz!.questionCount,
      completedAt: new Date().toISOString(),
    });
  }, [addScore, quiz, score]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started && !finished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { handleTimeUp(); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, finished, timeLeft, handleTimeUp]);

  if (!quiz) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center max-w-lg">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 w-fit mx-auto mb-6">
            <BrainCircuit className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t("quiz.notFound")}</h1>
          <Link href="/quiz">
            <Button variant="outline" className="mt-4">{t("quiz.backLink")}</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  const handleStart = () => {
    if (!isAuthenticated) { setLocation("/login"); return; }
    setStarted(true);
  };

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctIndex) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setFinished(true);
      addScore({ quizId: quiz.id, score, total: quiz.questionCount, completedAt: new Date().toISOString() });
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  /* ── RESULTS ─────────────────────────── */
  if (finished) {
    const percentage = (score / quiz.questionCount) * 100;
    const passed = percentage >= 70;
    const label = percentage === 100 ? t("quiz.perfect") : passed ? t("quiz.passed") : t("quiz.failed");

    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg">
            <Card className="border-border bg-card text-center p-10">
              <div className={`inline-flex p-4 rounded-2xl mb-6 ${passed ? "bg-primary/10 border border-primary/20" : "bg-destructive/10 border border-destructive/20"}`}>
                {passed
                  ? <CheckCircle2 className="h-10 w-10 text-primary" />
                  : <XCircle className="h-10 w-10 text-destructive" />}
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${passed ? "text-primary" : "text-destructive"}`}>{label}</h2>
              <p className="text-muted-foreground mb-10">{quiz.title}</p>

              <div className="relative w-44 h-44 mx-auto mb-10 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                  <motion.circle
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * percentage) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={passed ? "text-primary" : "text-destructive"}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{score}</span>
                  <span className="text-muted-foreground text-sm">/ {quiz.questionCount}</span>
                  <span className={`text-sm font-semibold mt-1 ${passed ? "text-primary" : "text-destructive"}`}>{Math.round(percentage)}%</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/quiz">
                  <Button variant="outline" className="w-full sm:w-auto">{t("quiz.backToQuiz")}</Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground glow-primary">{t("quiz.viewDashboard")}</Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </Layout>
    );
  }

  /* ── START SCREEN ────────────────────── */
  if (!started) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 max-w-2xl">
          <Link href="/quiz" className="inline-flex items-center text-muted-foreground hover:text-primary mb-10 transition-colors text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("quiz.backLink")}
          </Link>

          <div className="text-center">
            <div className="inline-flex p-4 bg-primary/10 border border-primary/20 rounded-2xl mb-6">
              <BrainCircuit className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{quiz.title}</h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto">{quiz.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-12 max-w-xs mx-auto">
              <div className="bg-card border border-border p-4 rounded-xl text-center">
                <span className="text-muted-foreground text-xs uppercase tracking-widest block mb-2">{t("quiz.duration")}</span>
                <span className="text-2xl font-bold">{quiz.duration} {t("quiz.min")}</span>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl text-center">
                <span className="text-muted-foreground text-xs uppercase tracking-widest block mb-2">Questions</span>
                <span className="text-2xl font-bold">{quiz.questionCount}</span>
              </div>
            </div>

            <Button size="lg" onClick={handleStart} className="px-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" data-testid="btn-start-quiz">
              {t("quiz.beginBtn")}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  /* ── QUIZ ────────────────────────────── */
  const timeDanger = timeLeft < 30;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium">
            <span className="text-muted-foreground">{t("quiz.question")} </span>
            <span className="text-xl font-bold text-primary">{currentIndex + 1}</span>
            <span className="text-muted-foreground"> / {quiz.questionCount}</span>
          </div>
          <div className={`flex items-center gap-2 text-xl font-bold font-mono px-4 py-2 rounded-xl border transition-all ${
            timeDanger
              ? "text-destructive border-destructive/50 bg-destructive/10 animate-pulse"
              : "text-foreground border-border bg-card"
          }`}>
            <Clock className={`h-5 w-5 ${timeDanger ? "text-destructive" : "text-primary"}`} />
            {formatTime(timeLeft)}
          </div>
        </div>

        <Progress value={((currentIndex) / quiz.questionCount) * 100} className="h-1.5 mb-10 bg-muted [&>div]:bg-primary" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-2xl font-bold mb-8 leading-relaxed">{currentQuestion.text}</h2>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, idx) => {
                let cls = "border-border bg-card hover:border-primary/50 cursor-pointer";
                if (isAnswered) {
                  if (idx === currentQuestion.correctIndex) cls = "border-primary bg-primary/15 text-primary cursor-default";
                  else if (idx === selectedAnswer) cls = "border-destructive bg-destructive/15 text-destructive cursor-default";
                  else cls = "border-border/40 bg-card/40 opacity-50 cursor-default";
                } else if (selectedAnswer === idx) {
                  cls = "border-primary bg-primary/10 cursor-pointer";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`p-4 rounded-xl border transition-all ${cls} flex items-center gap-4`}
                    data-testid={`quiz-option-${idx}`}
                  >
                    <div className="h-8 w-8 flex-shrink-0 rounded-lg bg-background border border-border flex items-center justify-center font-mono font-bold text-sm">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-base">{option}</span>
                    {isAnswered && idx === currentQuestion.correctIndex && <CheckCircle2 className="h-5 w-5 ml-auto text-primary" />}
                    {isAnswered && idx === selectedAnswer && idx !== currentQuestion.correctIndex && <XCircle className="h-5 w-5 ml-auto text-destructive" />}
                  </div>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8 p-5 rounded-xl border border-border bg-muted/30 overflow-hidden">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1 text-primary text-sm uppercase tracking-wide">{t("quiz.explanation")}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-end">
              <Button
                size="lg"
                onClick={handleNext}
                disabled={!isAnswered}
                className="min-w-[200px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
                data-testid="quiz-next-button"
              >
                {isLastQuestion ? t("quiz.finish") : t("quiz.next")}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}
