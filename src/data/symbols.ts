import type { Question } from '../types';

export const symbols: Question[] = [
  '() => {}', '(a, b) => a + b', '[0, 1, 2]', '{ key: value }',
  '===', '!==', '&&', '||', '??',
  '?.', '...args', '=> {', '() =>', '!important',
  '<div>', '</div>', '<img />', '<br />', '<input />',
  '#{id}', '.className', '@media', '@keyframes', '@import',
  '#include', '/* comment */', '// TODO:', '/** @param */', '<!-- -->',
  'arr[i]', 'obj.key', 'fn(arg)', 'str`template`', '${value}',
  '{ ...obj }', '[...arr]', '(a: string)', ': void', '=> boolean',
  'a > b ? x : y', 'a ?? b', 'a?.b?.c', 'a ||= b', 'a &&= b',
  '!== undefined', '=== null', 'as const', 'satisfies', 'is string',
  'Record<K, V>', 'Map<K, V>', 'Set<T>', 'Array<T>', 'Promise<T>',
].map((text) => ({ text, category: 'symbol' }));
