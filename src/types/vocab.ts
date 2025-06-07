export interface VocabQuestion {
  answer: string;
  sentence: string;
}

export interface QuizState {
  questions: VocabQuestion[];
  currentQuestionIndex: number;
  userAnswers: string[];
  correctAnswers: boolean[];
  isCompleted: boolean;
  reviewMode: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  incorrectQuestions: VocabQuestion[];
  accuracy: number;
}