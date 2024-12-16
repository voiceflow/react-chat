import { assignInlineVars } from '@vanilla-extract/dynamic';

import { DEFAULT_WIDGET_SETTINGS } from '@/__fixtures__/mock-assistant';
import { RuntimeProvider } from '@/contexts';
import { RenderMode } from '@/dtos/RenderOptions.dto';
import { createPalette } from '@/styles/colors';
import { THEME } from '@/styles/colors.css';

export const WithDefaultPalette = (Story: any, { args }: { args: any }) => {
  return (
    <div style={assignInlineVars(THEME, { colors: createPalette(), fontFamily: 'UCityProWeb' })}>
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
      ...DEFAULT_WIDGET_SETTINGS,
    }}
  >
    {Story()}
  </RuntimeProvider>
);
