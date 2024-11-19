import React, { useEffect, useRef } from 'react';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/constants';
import { controlSection, titleStyle, voiceWidgetContainer } from './VoiceWidget.css';

export const VoiceWidget = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const startAudio = async () => {
      audioContextRef.current = new AudioContext();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 512; // Adjusted for smoother circular waveform

      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      source.connect(analyserRef.current);
      let lastTime = 0;

      const draw = (timestamp: number) => {
        if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const { width, height } = canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2; // Radius of the circle

        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

        // Calculate time difference for smoother animations
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        // Apply smoothing factor to the animation
        const smoothFactor = Math.min(deltaTime / 36, 1); // Ensures that we don't slow down too much on slow frames

        if (canvasCtx) {
          canvasCtx.clearRect(0, 0, width, height);

          // Draw the circle
          canvasCtx.beginPath();
          canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'white'; // Light grey fill
          canvasCtx.fill();
          canvasCtx.lineWidth = 2;
          canvasCtx.strokeStyle = '#0099cc';
          canvasCtx.stroke();

          // Draw the waveform and fill the area between the waveform and the circle
          canvasCtx.beginPath();
          if (dataArrayRef.current) {
            dataArrayRef.current.forEach((value, i) => {
              const angle = (i / dataArrayRef.current.length) * 2 * Math.PI;
              const amplitude = (value / 128.0 - 1) * 40;
              const smoothedAmplitude = amplitude * smoothFactor;
              const x = centerX + (radius + smoothedAmplitude) * Math.cos(angle);
              const y = centerY + (radius + smoothedAmplitude) * Math.sin(angle);

              if (i === 0) {
                canvasCtx.moveTo(x, y);
              } else {
                canvasCtx.lineTo(x, y);
              }
            });
          }

          // Close the path and fill the area
          canvasCtx.closePath();
          canvasCtx.fill();

          // Stroke the path for the waveform
          canvasCtx.stroke();
        }

        requestAnimationFrame(draw);
      };

      requestAnimationFrame(draw);
    };

    startAudio();

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className={voiceWidgetContainer}>
      <canvas ref={canvasRef} width={58} height={58} style={{ borderRadius: '50%', border: '1px solid black' }} />
      <div className={controlSection}>
        <div className={titleStyle}>How can I help you?</div>
        <Button variant={ButtonVariant.PRIMARY}>Start</Button>
      </div>
    </div>
  );
};
