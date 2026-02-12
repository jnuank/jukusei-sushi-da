import type { CharStatus } from '../hooks/useTypingGame';
import styles from './TypingDisplay.module.css';

interface Props {
  text: string;
  charStatuses: CharStatus[];
  currentPosition: number;
}

export function TypingDisplay({ text, charStatuses, currentPosition }: Props) {
  return (
    <div className={styles.container}>
      {text.split('').map((char, i) => {
        const status = charStatuses[i];
        const isCurrent = i === currentPosition;
        const className = [
          styles.char,
          status === 'correct' ? styles.correct : '',
          status === 'miss' ? styles.miss : '',
          isCurrent ? styles.current : '',
        ].filter(Boolean).join(' ');

        return (
          <span
            key={i}
            data-testid={`char-${i}`}
            data-status={status}
            data-current={isCurrent ? 'true' : undefined}
            className={className}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
