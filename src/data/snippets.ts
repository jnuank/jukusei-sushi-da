import type { Question } from '../types';

export const snippets: Question[] = [
  'const result = await fetch(url);',
  'if (err !== null) { throw err; }',
  'const [state, setState] = useState(0);',
  'export default function App() {}',
  'for (let i = 0; i < arr.length; i++) {}',
  'const { name, age } = user;',
  'arr.filter((x) => x > 0).map((x) => x * 2);',
  'console.log("Hello, World!");',
  'import { useState, useEffect } from "react";',
  'const handleClick = (e: MouseEvent) => {};',
  'type Props = { children: React.ReactNode };',
  'interface User { id: number; name: string; }',
  'Object.keys(obj).forEach((key) => {});',
  'const data = JSON.parse(response.body);',
  'throw new Error("Not implemented");',
  'return items.reduce((sum, x) => sum + x, 0);',
  'const timer = setTimeout(() => {}, 1000);',
  'window.addEventListener("keydown", handler);',
  'document.querySelector("#app")?.remove();',
  'process.env.NODE_ENV === "production"',
].map((text) => ({ text, category: 'snippet' }));
