import type { Question, Course, GameConfig, GameResult } from './index';

describe('型定義', () => {
  it('Questionは問題文とカテゴリを持つ', () => {
    const question: Question = {
      text: 'const result = await fetch(url);',
      category: 'snippet',
    };
    expect(question.text).toBe('const result = await fetch(url);');
    expect(question.category).toBe('snippet');
  });

  it('Courseはコース名・制限時間・目標金額を持つ', () => {
    const course: Course = {
      id: 'casual',
      name: 'お手軽',
      duration: 60,
      targetScore: 3000,
    };
    expect(course.duration).toBe(60);
    expect(course.targetScore).toBe(3000);
  });

  it('GameConfigはコースとモードの組み合わせを持つ', () => {
    const config: GameConfig = {
      course: {
        id: 'casual',
        name: 'お手軽',
        duration: 60,
        targetScore: 3000,
      },
      mode: 'keyword',
    };
    expect(config.course.id).toBe('casual');
    expect(config.mode).toBe('keyword');
  });

  it('GameResultはスコア・正確率・WPMなどの統計を持つ', () => {
    const result: GameResult = {
      score: 2500,
      correctCount: 10,
      missCount: 3,
      accuracy: 0.769,
      wpm: 45.2,
      totalChars: 130,
      elapsedTime: 60,
    };
    expect(result.score).toBe(2500);
    expect(result.accuracy).toBeCloseTo(0.769);
  });
});
