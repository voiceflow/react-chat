import { useEffect, useRef, useState } from 'react';

import { shrinkingCircle } from './ShrinkingCircle.css';

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

        const newRadius = Math.min(avgVolume, 54);
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
    <div className={shrinkingCircle}>
      <div className={shrinkingCircle} style={{ transform: `scale(${radius})` }} />
    </div>
  );
};
