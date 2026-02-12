import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('初期表示でアプリが正常にレンダリングされる', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /Vite/i })).toBeInTheDocument();
  });
});
