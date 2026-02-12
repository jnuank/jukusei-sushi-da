export type QuestionCategory = 'keyword' | 'symbol' | 'snippet';

export type GameMode = QuestionCategory | 'mix';

export interface Question {
  text: string;
  category: QuestionCategory;
}

export interface Course {
  id: 'casual' | 'recommended' | 'premium';
  name: string;
  duration: number;
  targetScore: number;
}

export interface GameConfig {
  course: Course;
  mode: GameMode;
}

export interface GameResult {
  score: number;
  correctCount: number;
  missCount: number;
  accuracy: number;
  wpm: number;
  totalChars: number;
  elapsedTime: number;
}
