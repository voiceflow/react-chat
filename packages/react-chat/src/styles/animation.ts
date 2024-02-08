export const pulse = { opacity: 1 };
export const fadeIn = { opacity: 1 };

export const rotate = { transform: 'rotate(360deg)' };
export const shift = (distance: number) => ({
  transform: `translateY(${distance}px)`,
});

export const animationStyles = ({ distance = 12, duration, delay }: { distance?: number; duration: number; delay: number }) => ({
  opacity: 0,
  animation: 'fadeIn 500ms ease-out 0ms forwards',
});

// export const pulse = keyframes({
//   '50%': { opacity: 1 },
// });

// export const fadeIn = keyframes({
//   from: { opacity: 0 },
//   to: { opacity: 1 },
// });

// export const rotate = keyframes({
//   from: { transform: 'rotate(0deg)' },
//   to: { transform: 'rotate(360deg)' },
// });

// export const shift = (distance: number) =>
//   keyframes({
//     from: { transform: `translateY(${distance}px)` },
//     to: { transform: 'translateY(0px)' },
//   });

// export const animationStyles = ({ distance = 12, duration, delay }: { distance?: number; duration: number; delay: number }): CSS => ({
//   opacity: 0,
//   animation: [fadeIn, shift(distance)].map((animation) => `${animation} ${duration}ms ease-out ${delay}ms forwards`).join(', '),
// });
