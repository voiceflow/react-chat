import { assignInlineVars } from '@vanilla-extract/dynamic';

import { WIDGET_SETTINGS_DEFAULT_SETTINGS } from '@/__fixtures__/mock-assistant';
import { RuntimeProvider } from '@/contexts';
import { RenderMode } from '@/dtos/RenderOptions.dto';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

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
      ...WIDGET_SETTINGS_DEFAULT_SETTINGS,
    }}
  >
    {Story()}
  </RuntimeProvider>
);
