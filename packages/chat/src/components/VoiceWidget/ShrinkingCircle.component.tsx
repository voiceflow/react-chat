import { useEffect, useRef, useState } from 'react';

export const ShrinkingCircle = () => {
  const [radius, setRadius] = useState(54);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      if (audioContextRef.current) return;

      audioContextRef.current = new AudioContext();
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const animate = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);
        const avgVolume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

        const newRadius = Math.max(10, 54 - avgVolume / 10); // Minimum fill radius of 10
        setRadius(newRadius);

        requestAnimationFrame(animate);
      };

      animate();
    };

    initAudio();

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <svg height={54} width={54}>
      <circle r="54" stroke="black" strokeWidth="2" fill="none" />
      <circle r={radius} fill="blue" style={{ transition: 'r 0.1s' }} />
    </svg>
  );
};
