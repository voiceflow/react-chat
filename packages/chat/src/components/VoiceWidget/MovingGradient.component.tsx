import React from 'react';

const randomizeDuration = (base: number) => `${(Math.random() * 2 + base).toFixed(1)}s`;

export const MovingGradient = ({ speedVector = 1 }) => {
  // Calculate animation durations based on the speed vector
  const duration1 = randomizeDuration(6 * speedVector);
  const duration2 = randomizeDuration(8 * speedVector);
  const duration3 = randomizeDuration(7 * speedVector);

  return (
    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <radialGradient id="myGradient" cx="0.35" cy="0.4" r="1.5">
          <stop offset="10%" stopColor="#387DFF" />
          <stop offset="95%" stopColor="#A238FF" />
        </radialGradient>
        <radialGradient id="greenPurple" cx="0.5" cy="0.5" r="1.5">
          <stop offset="10%" stopColor="#387DFF" />
          <stop offset="95%" stopColor="#A238FF" />
        </radialGradient>
        <radialGradient id="blueOrange" cx="0.4" cy="0.4" r="1.5">
          <stop offset="10%" stopColor="blue" stopOpacity="0.8" />
          <stop offset="95%" stopColor="orange" stopOpacity="0.8" />
        </radialGradient>

        <filter id="blurFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5">
            <animate
              attributeName="stdDeviation"
              values="0.2;0.7;0.3;0.6;0.5"
              dur={duration1}
              repeatCount="indefinite"
            />
          </feGaussianBlur>
          {/* <feTurbulence type="turbulence" baseFrequency="0.09" numOctaves="10" result="turbulence">
            <animate
              attributeName="baseFrequency"
              values="0.2;0.7;0.3;0.6;0.5"
              dur={duration1}
              repeatCount="indefinite"
            />
          </feTurbulence> */}
          {/* <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="50" xChannelSelector="G" yChannelSelector="G" /> */}
        </filter>
      </defs>

      <g filter="url(#blurFilter)">
        {/* Circle 1 */}
        <circle cx="2" cy="2" r="8" fill="url(#myGradient)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 1.5 0.5; -2 -1; 0.5 -0.5"
            dur={duration2}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 5 5;180 5 5;360 5 5;540 5 5"
            dur={duration1}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1; 1.4; 0.9; 1.3; 1"
            dur={duration3}
            repeatCount="indefinite"
          />
        </circle>

        {/* Circle 2 */}
        <circle cx="6" cy="4" r="3.5" fill="url(#greenPurple)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -1 0.8; 0.3 -0.7; -0.5 1.2"
            dur={duration2}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 5 5; -180 5 5; -90 5 5; -360 5 5"
            dur={duration1}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="skewX"
            values="0; 10; -15; 7; -5; 0"
            dur={duration3}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="skewY"
            values="0; -5; 10; -8; 5; 0"
            dur={duration2}
            repeatCount="indefinite"
          />
        </circle>

        {/* Circle 3 */}
        <circle cx="8" cy="8" r="2.5" fill="url(#blueOrange)">
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1; 0.7; 1.3; 0.9; 1.2; 1"
            dur={duration1}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 5 5; 90 5 5; 270 5 5; 360 5 5"
            dur={duration3}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0.3 1.2; -0.8 -0.5; 1 -1; -0.3 0.5"
            dur={duration2}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};
