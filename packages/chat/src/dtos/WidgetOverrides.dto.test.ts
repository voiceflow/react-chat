import { describe, expect, it } from 'vitest';

import { WidgetOverrides } from './WidgetOverrides.dto';

describe('WidgetOverrides', () => {
  describe('parse()', () => {
    // WidgetOverrides comes from the user, so it should be totally optional
    it('should create default, empty settings object', () => {
      const result = WidgetOverrides.parse({});
      expect(result).toEqual({});
    });
  });
});
