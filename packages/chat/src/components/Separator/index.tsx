import { line, separatorContainer, separatorText } from './styles.css';

export const Separator = ({ text }: { text: string }) => (
  <div className={separatorContainer}>
    <div className={line} />
    <div className={separatorText}>{text}</div>
    <div className={line} />
  </div>
);
