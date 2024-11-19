import React, { useEffect, useRef } from 'react';

interface CircularVisualizerProps {
  radius?: number; // Controls the radius of the circular visualizer
  lineWidth?: number; // Width of the frequency lines
  color?: string; // Color of the frequency lines
}

export const CircularVisualizer: React.FC<CircularVisualizerProps> = ({
  radius = 54,
  lineWidth = 2,
  color = '#4CAF50',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const startAudio = async () => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContextRef.current.createMediaStreamSource(stream);

      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      source.connect(analyserRef.current);
      draw();
    };

    const draw = () => {
      if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const bufferLength = analyserRef.current.frequencyBinCount;
      const { width, height } = canvas;

      ctx?.clearRect(0, 0, width, height);

      // Fill frequency data
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      // Draw circular frequency bars
      const angleIncrement = (Math.PI * 2) / bufferLength;
      ctx.save();
      ctx.translate(width / 2, height / 2);

      dataArrayRef.current.forEach((value, i) => {
        const angle = i * angleIncrement;
        const length = (value / 255) * radius;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.moveTo(radius * Math.cos(angle), radius * Math.sin(angle));
        ctx.lineTo((radius + length) * Math.cos(angle), (radius + length) * Math.sin(angle));
        ctx.stroke();
      });

      ctx.restore();
      requestAnimationFrame(draw);
    };

    startAudio();

    return () => {
      audioContextRef.current?.close();
    };
  }, [radius, lineWidth, color]);

  return <canvas ref={canvasRef} width="400" height="400" style={{ borderRadius: '50%' }} />;
};
