import { Layout } from "@/components/layout/Layout";
import { mockQuizzes } from "@/data/quizzes";
import { useParams, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizScores } from "@/hooks/useQuizScores";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function QuizTake() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const quiz = mockQuizzes.find(q => q.id === params.id);
  const { addScore } = useQuizScores();
  const { isAuthenticated } = useAuth();

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
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
      score: score,
      total: quiz!.questionCount,
      completedAt: new Date().toISOString()
    });
  }, [addScore, quiz, score]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started && !finished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, finished, timeLeft, handleTimeUp]);

  if (!quiz) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-mono font-bold mb-4">404_EVALUATION_NOT_FOUND</h1>
          <Link href="/quiz">
            <Button variant="outline" className="font-mono mt-4">Return to Training Grounds</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  const handleStart = () => {
    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }
    setStarted(true);
  };

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setFinished(true);
      addScore({
        quizId: quiz.id,
        score: selectedAnswer === currentQuestion.correctIndex ? score : score, // already updated in handleSelectAnswer but just to be sure
        total: quiz.questionCount,
        completedAt: new Date().toISOString()
      });
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  if (finished) {
    const percentage = (score / quiz.questionCount) * 100;
    let message = "";
    if (percentage === 100) message = "PERFECT_EXECUTION";
    else if (percentage >= 70) message = "EVALUATION_PASSED";
    else message = "EVALUATION_FAILED";

    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg"
          >
            <Card className="border-border bg-card/50 backdrop-blur text-center p-8">
              <h2 className="text-3xl font-mono font-bold mb-2">{message}</h2>
              <p className="text-muted-foreground mb-8">{quiz.title}</p>
              
              <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/30" />
                  <motion.circle
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * percentage) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={percentage >= 70 ? "text-primary" : "text-destructive"}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold font-mono">{score}</span>
                  <span className="text-muted-foreground font-mono text-sm">/ {quiz.questionCount}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quiz">
                  <Button variant="outline" className="w-full font-mono">Return to Evaluations</Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="w-full font-mono bg-primary text-primary-foreground">View Dashboard</Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (!started) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
          <Link href="/quiz" className="inline-flex items-center text-muted-foreground hover:text-primary font-mono mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> ABORT
          </Link>
          
          <h1 className="text-4xl font-bold font-mono tracking-tight mb-4">{quiz.title}</h1>
          <p className="text-xl text-muted-foreground mb-12">{quiz.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-12 max-w-sm mx-auto">
            <div className="bg-card border border-border p-4 rounded-xl">
              <span className="text-muted-foreground text-sm font-mono block mb-1">Duration</span>
              <span className="text-2xl font-bold font-mono">{quiz.duration} min</span>
            </div>
            <div className="bg-card border border-border p-4 rounded-xl">
              <span className="text-muted-foreground text-sm font-mono block mb-1">Questions</span>
              <span className="text-2xl font-bold font-mono">{quiz.questionCount}</span>
            </div>
          </div>
          
          <Button size="lg" onClick={handleStart} className="font-mono text-lg px-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,128,0.2)]">
            INITIALIZE EVALUATION
          </Button>
        </div>
      </Layout>
    );
  }

  const timeDanger = timeLeft < 30;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <div className="font-mono">
            <span className="text-muted-foreground">QUESTION </span>
            <span className="text-xl font-bold text-primary">{currentIndex + 1}</span>
            <span className="text-muted-foreground"> / {quiz.questionCount}</span>
          </div>
          
          <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg border ${timeDanger ? 'text-destructive border-destructive/50 bg-destructive/10 animate-pulse' : 'text-foreground border-border bg-card'}`}>
            <Clock className={`h-5 w-5 ${timeDanger ? 'text-destructive' : 'text-primary'}`} />
            {formatTime(timeLeft)}
          </div>
        </div>

        <Progress value={((currentIndex) / quiz.questionCount) * 100} className="h-2 mb-12 bg-muted [&>div]:bg-primary" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-sans font-bold mb-8 leading-relaxed">
              {currentQuestion.text}
            </h2>

            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, idx) => {
                let stateClass = "border-border bg-card hover:border-primary/50 cursor-pointer";
                if (isAnswered) {
                  if (idx === currentQuestion.correctIndex) {
                    stateClass = "border-primary bg-primary/20 text-primary cursor-default";
                  } else if (idx === selectedAnswer) {
                    stateClass = "border-destructive bg-destructive/20 text-destructive cursor-default";
                  } else {
                    stateClass = "border-border/50 bg-card/50 opacity-50 cursor-default";
                  }
                } else if (selectedAnswer === idx) {
                  stateClass = "border-primary bg-primary/10 cursor-pointer";
                }

                return (
                  <div 
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`p-4 rounded-xl border transition-all ${stateClass} flex items-center gap-4`}
                    data-testid={`quiz-option-${idx}`}
                  >
                    <div className="h-8 w-8 flex-shrink-0 rounded bg-background flex items-center justify-center font-mono font-bold text-sm">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="font-sans text-lg">{option}</span>
                    
                    {isAnswered && idx === currentQuestion.correctIndex && (
                      <CheckCircle2 className="h-6 w-6 ml-auto text-primary" />
                    )}
                    {isAnswered && idx === selectedAnswer && idx !== currentQuestion.correctIndex && (
                      <XCircle className="h-6 w-6 ml-auto text-destructive" />
                    )}
                  </div>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-8 p-6 rounded-xl border border-border bg-muted/30"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-mono font-bold mb-2 uppercase text-primary">Explanation</h4>
                    <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-end">
              <Button 
                size="lg" 
                onClick={handleNext} 
                disabled={!isAnswered}
                className="font-mono min-w-[200px]"
                data-testid="quiz-next-button"
              >
                {isLastQuestion ? "COMPLETE EVALUATION" : "NEXT QUESTION"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}
