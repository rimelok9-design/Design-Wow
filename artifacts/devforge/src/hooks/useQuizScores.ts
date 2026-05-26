import { useLocalStorage } from "./useLocalStorage";

export interface QuizScore {
  quizId: string;
  score: number;
  total: number;
  completedAt: string;
}

export function useQuizScores() {
  const [scores, setScores] = useLocalStorage<QuizScore[]>(
    "devbenin_quiz_scores",
    []
  );

  const addScore = (score: QuizScore) => {
    setScores((prev) => [...prev, score]);
  };

  const getScore = (quizId: string) => {
    return scores.find((s) => s.quizId === quizId);
  };

  return { scores, addScore, getScore };
}
