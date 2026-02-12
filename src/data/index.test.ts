import { keywords, symbols, snippets, getQuestions } from './index';
import type { Question } from '../types';

describe('問題データ', () => {
  it('keywordsはcategoryが"keyword"のQuestion配列を返す', () => {
    expect(keywords.length).toBeGreaterThan(0);
    keywords.forEach((q: Question) => {
      expect(q.category).toBe('keyword');
      expect(q.text.length).toBeGreaterThan(0);
    });
  });

  it('symbolsはcategoryが"symbol"のQuestion配列を返す', () => {
    expect(symbols.length).toBeGreaterThan(0);
    symbols.forEach((q: Question) => {
      expect(q.category).toBe('symbol');
      expect(q.text.length).toBeGreaterThan(0);
    });
  });

  it('snippetsはcategoryが"snippet"のQuestion配列を返す', () => {
    expect(snippets.length).toBeGreaterThan(0);
    snippets.forEach((q: Question) => {
      expect(q.category).toBe('snippet');
      expect(q.text.length).toBeGreaterThan(0);
    });
  });

  describe('getQuestions', () => {
    it('モード"keyword"でキーワードの問題だけを返す', () => {
      const questions = getQuestions('keyword');
      questions.forEach((q) => {
        expect(q.category).toBe('keyword');
      });
    });

    it('モード"symbol"で記号の問題だけを返す', () => {
      const questions = getQuestions('symbol');
      questions.forEach((q) => {
        expect(q.category).toBe('symbol');
      });
    });

    it('モード"snippet"でスニペットの問題だけを返す', () => {
      const questions = getQuestions('snippet');
      questions.forEach((q) => {
        expect(q.category).toBe('snippet');
      });
    });

    it('モード"mix"で全カテゴリの問題を返す', () => {
      const questions = getQuestions('mix');
      const categories = new Set(questions.map((q) => q.category));
      expect(categories.size).toBeGreaterThanOrEqual(2);
    });
  });
});
