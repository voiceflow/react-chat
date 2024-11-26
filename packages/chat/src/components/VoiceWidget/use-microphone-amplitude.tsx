import { useEffect, useState } from 'react';

const useMicrophoneAmplitude = (): number => {
  const [amplitude, setAmplitude] = useState<number>(0);
  const [dampenedAmplitude, setDampenedAmplitude] = useState<number>(0); // New state for smoothed amplitude
  const [_, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let microphone: MediaStreamAudioSourceNode | null = null;

    const initMicrophone = async () => {
      try {
        // Request access to the user's microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Set up the Audio Context and Analyser
        audioContext = new window.AudioContext();
        setAudioContext(audioContext);

        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        const updateAmplitude = () => {
          analyser.getByteTimeDomainData(dataArray);
          const amplitudeValue = dataArray.reduce((acc, val) => acc + Math.abs(val - 128), 0) / dataArray.length;

          setAmplitude(amplitudeValue);
          requestAnimationFrame(updateAmplitude);
        };

        updateAmplitude();
      } catch (error) {
        console.error('Error accessing the microphone:', error);
      }
    };

    initMicrophone();

    return () => {
      if (microphone) microphone.disconnect();
      if (audioContext) audioContext.close();
    };
  }, []);

  // Smooth out amplitude changes with a damping effect
  useEffect(() => {
    const smoothingFactor = 0.7; // Lower for smoother transitions, higher for faster response
    const dampen = () => {
      setDampenedAmplitude((prev) => prev + (amplitude - prev) * smoothingFactor);
      requestAnimationFrame(dampen);
    };

    dampen();
  }, [amplitude]);

  return dampenedAmplitude; // Return the smoothed amplitude
};

export default useMicrophoneAmplitude;
