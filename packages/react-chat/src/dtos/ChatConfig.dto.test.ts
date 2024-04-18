import { describe, expect, it } from 'vitest';

import { ChatConfig, RUNTIME_URL } from './ChatConfig.dto';
import { RenderMode } from './RenderOptions.dto';

describe('ChatConfig', () => {
  describe('parse()', () => {
    it('should accept a minimal configuration', () => {
      const projectID = 'projectID';

      const result = ChatConfig.parse({
        verify: { projectID },
      });

      expect(result).toEqual({
        autostart: true,
        allowDangerousHTML: true,
        url: RUNTIME_URL,
        verify: { projectID },
        render: { mode: RenderMode.OVERLAY },
      });
    });

    it('should accept all configuration options', () => {
      const localOptions = {
        autostart: true,
        allowDangerousHTML: false,

        url: 'local',
        userID: 'local',
        versionID: 'local',

        verify: { projectID: 'local' },
        user: { name: 'local', image: 'local' },
        render: { mode: RenderMode.OVERLAY },
        launch: { event: { type: 'local' } },
      };

      const result = ChatConfig.parse(localOptions);

      expect(result).toEqual(localOptions);
    });

    it('should accept a numeric userID', () => {
      const projectID = 'projectID';

      const result = ChatConfig.parse({
        verify: { projectID },
        userID: 123,
      });

      expect(result).toEqual({
        autostart: true,
        allowDangerousHTML: true,
        url: RUNTIME_URL,
        verify: { projectID },
        render: { mode: RenderMode.OVERLAY },
        userID: '123',
      });
    });

    it('should accept and decode a string userID', () => {
      const projectID = 'projectID';

      const result = ChatConfig.parse({
        verify: { projectID },
        userID: 'foo%20bar',
      });

      expect(result).toEqual({
        autostart: true,
        allowDangerousHTML: true,
        url: RUNTIME_URL,
        verify: { projectID },
        render: { mode: RenderMode.OVERLAY },
        userID: 'foo bar',
      });
    });
  });
});
