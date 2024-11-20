import React, { useEffect } from 'react';

import { g1, g2, g3, g4, g5, gradientBg, gradientsContainer, interactive } from './VoiceWidget.css';

interface CircularVisualizerProps {
  baseRadius?: number;
  maxRadius?: number;
  color?: string;
}

export const CircularVisualizer: React.FC<CircularVisualizerProps> = () => {
  const interactiveRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const interBubble = document.querySelector<HTMLDivElement>(interactive)!;
    let curX = 0;
    let curY = 0;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function animate() {
          analyser.getByteFrequencyData(dataArray);
          const avgVolume = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;

          // Map the volume to translation values with reduced multiplier
          const tgX = avgVolume - 128; // Adjusted multiplier for smaller movements
          const tgY = avgVolume - 128;

          // Introduce a dampening effect by averaging movements
          curX += (tgX - curX) / 5; // Higher divisor means slower, smaller changes
          curY += (tgY - curY) / 5;

          if (interactiveRef.current) {
            const radius = 27; // Half of the 54px circle
            const distance = Math.sqrt(curX * curX + curY * curY);
            if (distance > radius) {
              const angle = Math.atan2(curY, curX);
              curX = radius * Math.cos(angle);
              curY = radius * Math.sin(angle);
            }
            const newValue = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            console.log({ newValue });
            interactiveRef.current.style.transform = newValue;
          }
          requestAnimationFrame(animate);
        }

        animate();
      })
      .catch((err) => {
        console.log({ err });
      });

    return () => {
      // Cleanup
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        // eslint-disable-next-line promise/always-return
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch((err) => {
          console.log({ err });
        });
    };
  }, []);

  return (
    <div className={gradientBg}>
      <svg xmlns="http://www.w3.org/2000/svg" width={54} height={54}>
        <defs>
          <filter id="goo">
            {/* <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /> */}
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={gradientsContainer}>
        <div className={g1}></div>
        <div className={g2}></div>
        <div className={g3}></div>
        <div className={g4}></div>
        <div className={g5}></div>
        <div className={interactive} ref={interactiveRef}></div>
      </div>
    </div>
  );
};
