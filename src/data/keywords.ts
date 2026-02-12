import type { Question } from '../types';

export const keywords: Question[] = [
  'function', 'return', 'const', 'let', 'var',
  'class', 'interface', 'type', 'enum', 'extends',
  'implements', 'import', 'export', 'default', 'from',
  'async', 'await', 'Promise', 'yield', 'generator',
  'boolean', 'string', 'number', 'undefined', 'null',
  'typeof', 'instanceof', 'keyof', 'readonly', 'partial',
  'abstract', 'static', 'public', 'private', 'protected',
  'if', 'else', 'switch', 'case', 'break',
  'for', 'while', 'do', 'continue', 'forEach',
  'map', 'filter', 'reduce', 'find', 'some',
  'try', 'catch', 'finally', 'throw', 'Error',
  'new', 'this', 'super', 'constructor', 'delete',
].map((text) => ({ text, category: 'keyword' }));
