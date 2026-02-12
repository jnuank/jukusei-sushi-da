import type { GameMode, Question } from '../types';
import { keywords } from './keywords';
import { symbols } from './symbols';
import { snippets } from './snippets';

export { keywords, symbols, snippets };

export function getQuestions(mode: GameMode): Question[] {
  switch (mode) {
    case 'keyword':
      return [...keywords];
    case 'symbol':
      return [...symbols];
    case 'snippet':
      return [...snippets];
    case 'mix':
      return [...keywords, ...symbols, ...snippets];
  }
}
