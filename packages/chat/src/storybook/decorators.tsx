import { assignInlineVars } from '@vanilla-extract/dynamic';

import { RuntimeProvider } from '@/contexts';
import { RenderMode } from '@/dtos/RenderOptions.dto';
import { DEFAULT_AVATAR } from '@/main';
import { COLORS, createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { ChatPersistence, ChatPosition } from '@/types';

export const WithDefaultPalette = (Story: any, { args }: { args: any }) => {
  return (
    <div style={assignInlineVars(PALETTE, { colors: createPalette() })}>
      <Story args={{ ...args }} />
    </div>
  );
};

export const WithRuntimeProvider = (Story: any) => (
  <RuntimeProvider
    config={{
      verify: { projectID: 'project-id' },
      url: '',
      versionID: 'version-id',
      autostart: true,
      allowDangerousHTML: true,
      user: { name: 'User' },
      render: { mode: RenderMode.OVERLAY },
    }}
    assistant={{
      title: 'Voiceflow Assistant',
      color: COLORS.ACCENT[500],
      image: DEFAULT_AVATAR,
      avatar: DEFAULT_AVATAR,
      launcher: undefined,
      watermark: true,
      feedback: false,
      stylesheet: undefined,
      description: '',
      position: ChatPosition.RIGHT,
      persistence: ChatPersistence.LOCAL_STORAGE,
      audioInterface: false,
      defaultAudioOutput: undefined,
      spacing: {
        side: 30,
        bottom: 30,
      },
      extensions: [],
    }}
  >
    {Story()}
  </RuntimeProvider>
);
