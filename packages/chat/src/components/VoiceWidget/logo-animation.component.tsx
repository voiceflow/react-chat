import type { AnimationItem } from 'lottie-web';
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';

import { logoAnimation } from './logo-animation';
import { animatedLogoStyles } from './VoiceWidget.css';

export const VoiceflowLogo: React.FC = () => {
  const [animation, setAnimation] = useState<AnimationItem | null>(null);
  const lottieRef = useRef(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyserNode = useRef<AnalyserNode | null>(null);
  const microphoneStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    const lottieAnimation = lottie.loadAnimation({
      container: lottieRef.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true, // Start animation immediately
      animationData: logoAnimation,
    });

    setAnimation(lottieAnimation);

    // Set up Web Audio API for microphone input
    audioContext.current = new AudioContext();
    analyserNode.current = audioContext.current.createAnalyser();

    // eslint-disable-next-line promise/catch-or-return
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      microphoneStream.current = stream;
      const source = audioContext.current!.createMediaStreamSource(stream);
      source.connect(analyserNode.current!);
      if (analyserNode.current) {
        analyserNode.current.fftSize = 256;
      }
      // eslint-disable-next-line promise/always-return
      if (analyserNode.current) {
        analyserNode.current.smoothingTimeConstant = 0.8;
      }
    });

    return () => {
      microphoneStream.current?.getTracks().forEach((track) => track.stop());
      audioContext.current?.close();
    };
  }, []);

  const updateSpinSpeed = () => {
    if (analyserNode.current && animation) {
      const bufferLength = analyserNode.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserNode.current.getByteFrequencyData(dataArray);

      const sum = dataArray.reduce((a, b) => a + b, 0);
      const average = sum / dataArray.length;
      const spinSpeed = Math.max(0.1, average / 25); // Minimum spin speed

      animation.setSpeed(spinSpeed); // Update animation speed
    }
  };

  useEffect(() => {
    const interval = setInterval(updateSpinSpeed, 50); // Faster updates

    return () => {
      clearInterval(interval);
    };
  }, [animation]);

  return (
    <div style={{ display: 'inline-block' }}>
      <div className={animatedLogoStyles}>
        <span ref={lottieRef} style={{ height: '54px', display: 'block' }} />
      </div>
    </div>
  );
};
