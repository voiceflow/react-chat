import { createConfig } from '@voiceflow/dependency-cruiser-config';

export default createConfig({
  allowTypeCycles: true,
  orphans: {
    ignore: [
      'src/components/VoiceWidget/WaveformVisualizer.component.tsx',
      'src/components/VoiceWidget/MovingGradient.component.tsx',
      'src/components/VoiceWidget/MockVoiceWidgetImage.tsx',
    ],
  },
});
