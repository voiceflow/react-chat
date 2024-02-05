import { CSS } from '@/styles/theme';

export const pulse = (keyframes) =>
  keyframes({
    '50%': { opacity: 1 },
  });

export const fadeIn = (keyframes) =>
  keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

export const rotate = (keyframes) =>
  keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  });

export const shift = (distance: number) => (keyframes) =>
  keyframes({
    from: { transform: `translateY(${distance}px)` },
    to: { transform: 'translateY(0px)' },
  });

export const animationStyles =
  (keyframes) =>
  ({ distance = 12, duration, delay }: { distance?: number; duration: number; delay: number }): CSS => ({
    opacity: 0,
    animation: [fadeIn, shift(distance)].map((animation) => `${animation(keyframes)} ${duration}ms ease-out ${delay}ms forwards`).join(', '),
  });
