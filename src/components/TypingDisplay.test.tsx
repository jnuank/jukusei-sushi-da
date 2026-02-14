import { render, screen } from '@testing-library/react';
import { TypingDisplay } from './TypingDisplay';
import type { CharStatus } from '../hooks/useTypingGame';

describe('TypingDisplay', () => {
  it('問題文の各文字がspan要素で表示される', () => {
    const statuses: CharStatus[] = ['pending', 'pending', 'pending'];
    render(<TypingDisplay text="abc" charStatuses={statuses} currentPosition={0} />);
    const chars = screen.getAllByTestId(/^char-/);
    expect(chars).toHaveLength(3);
    expect(chars[0]).toHaveTextContent('a');
    expect(chars[1]).toHaveTextContent('b');
    expect(chars[2]).toHaveTextContent('c');
  });

  it('correctの文字にdata-status="correct"が付く', () => {
    const statuses: CharStatus[] = ['correct', 'pending', 'pending'];
    render(<TypingDisplay text="abc" charStatuses={statuses} currentPosition={1} />);
    expect(screen.getByTestId('char-0')).toHaveAttribute('data-status', 'correct');
  });

  it('missの文字にdata-status="miss"が付く', () => {
    const statuses: CharStatus[] = ['miss', 'pending', 'pending'];
    render(<TypingDisplay text="abc" charStatuses={statuses} currentPosition={1} />);
    expect(screen.getByTestId('char-0')).toHaveAttribute('data-status', 'miss');
  });

  it('現在位置の文字にdata-current="true"が付く', () => {
    const statuses: CharStatus[] = ['correct', 'pending', 'pending'];
    render(<TypingDisplay text="abc" charStatuses={statuses} currentPosition={1} />);
    expect(screen.getByTestId('char-1')).toHaveAttribute('data-current', 'true');
  });
});
