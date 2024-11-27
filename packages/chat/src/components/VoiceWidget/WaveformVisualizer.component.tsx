import { useEffect, useRef } from 'react';

export const WaveFormVisualizer = () => {
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
      analyserRef.current.fftSize = 1024;

      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      source.connect(analyserRef.current);

      let previousTimestamp = 0;
      const smoothingFactor = 0.1;

      const draw = (timestamp: number) => {
        if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const { width, height } = canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2;

        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

        // Time-based smoothing
        const deltaTime = timestamp - previousTimestamp;
        previousTimestamp = timestamp;
        const smoothing = Math.min(1, deltaTime * smoothingFactor);

        if (canvasCtx) {
          canvasCtx.clearRect(0, 0, width, height);

          // Draw the circle
          canvasCtx.beginPath();
          canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'white';
          canvasCtx.fill();
          canvasCtx.lineWidth = 6;
          canvasCtx.strokeStyle = '#0099cc';
          canvasCtx.stroke();

          // Draw the smoothed waveform
          canvasCtx.beginPath();
          dataArrayRef.current.forEach((value, i) => {
            const angle = (i / (dataArrayRef?.current?.length || 1)) * 2 * Math.PI;
            const amplitude = (value / 128.0 - 1) * 40;

            // Apply smoothing to amplitude
            const smoothedAmplitude = amplitude * smoothing;

            const x = centerX + (radius + smoothedAmplitude) * Math.cos(angle);
            const y = centerY + (radius + smoothedAmplitude) * Math.sin(angle);

            if (i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }
          });

          // Close the path and stroke the waveform
          canvasCtx.closePath();
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

  return <canvas ref={canvasRef} width={58} height={58} style={{ borderRadius: '50%', border: '1px solid black' }} />;
};
