import { WidgetSettingsWidgetType } from '@voiceflow/dtos-interact';
import { describe, expect, it } from 'vitest';

import { WidgetOverrides } from './WidgetOverrides.dto';

describe('WidgetOverrides', () => {
  describe('parse()', () => {
    it('should create default, empty settings object', () => {
      const result = WidgetOverrides.parse({});

      expect(result).toEqual({
        type: WidgetSettingsWidgetType.CHAT,
        header: {},
        banner: {},
        avatar: {},
        launcher: {},
        footer: {},
        spacing: {},
        aiDisclaimer: {},
        extensions: [],
      });
    });
  });
});
