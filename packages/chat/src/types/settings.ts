import type {
  WidgetSettings,
  WidgetSettingsChatSettingsDTO,
  WidgetSettingsCommonSettingsDTO,
  WidgetSettingsDTO,
  WidgetSettingsVoiceSettingsDTO,
} from '@voiceflow/dtos-interact';
import type { z } from 'zod';

import type { AnyExtension } from '@/main';

export type RawWidgetSettings = z.input<typeof WidgetSettingsDTO>;
export type RawWidgetSettingsChatSettings = z.input<typeof WidgetSettingsChatSettingsDTO>;
export type RawWidgetSettingsVoiceSettings = z.input<typeof WidgetSettingsVoiceSettingsDTO>;
export type RawWidgetSettingsCommonSettings = z.input<typeof WidgetSettingsCommonSettingsDTO>;

export interface WidgetLocalSettings {
  stylesheet: string;
  extensions: AnyExtension[];
}

export interface ChatWidgetSettings extends WidgetSettings, WidgetLocalSettings {}
