import { dot1, dot2, dot3, loadingDotContainer } from './LoadingDots.css';

export const LoadingDots = () => {
  return (
    <div className={loadingDotContainer}>
      <span className={dot1} />
      <span className={dot2} />
      <span className={dot3} />
    </div>
  );
};
