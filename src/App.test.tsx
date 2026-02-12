import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('ゲーム画面が表示される', () => {
    render(<App />);
    expect(screen.getByText('60')).toBeInTheDocument();
  });
});
