import {
  WidgetSettingsChatRenderMode,
  WidgetSettingsLauncherType,
  WidgetSettingsWidgetType,
} from '@voiceflow/dtos-interact';
import { ChatPersistence, ChatPosition } from '@voiceflow/voiceflow-types/build/cjs/version';
import { z } from 'zod';

import { AnyExtension } from './Extension.dto';
import { Palette } from './Palette.dto';

export const WidgetOverrides = z.object({
  type: z.nativeEnum(WidgetSettingsWidgetType).optional(),
  renderMode: z.nativeEnum(WidgetSettingsChatRenderMode).optional(),

  // Widget header
  header: z
    .object({
      hideImage: z.boolean().optional(),
      imageUrl: z.string().optional(),
      title: z.string().optional(),
    })
    .optional(),

  // Welcome message
  banner: z
    .object({
      hide: z.boolean().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
    })
    .optional(),

  // Agent avatar
  avatar: z
    .object({
      hide: z.boolean().optional(),
      imageUrl: z.string().optional(),
    })
    .optional(),

  // input
  inputPlaceholder: z.string().optional(),

  // voice within chat
  enableVoiceInput: z.boolean().optional(),
  enableVoiceOutput: z.boolean().optional(),

  // launcher
  launcher: z
    .object({
      type: z.nativeEnum(WidgetSettingsLauncherType).optional(),
      label: z.string().optional(),
      imageUrl: z.string().optional(),
    })
    .optional(),

  // footer
  footer: z
    .object({
      hide: z.boolean().optional(),
      linkText: z.string().optional(),
      linkUrl: z.string().optional(),
    })
    .optional(),

  // palette
  color: z.string().optional(),
  palette: Palette.optional(),

  // fonts
  fontFamily: z.string().optional(),

  // position
  side: z.nativeEnum(ChatPosition).optional(),
  spacing: z
    .object({
      side: z.string().optional(),
      bottom: z.string().optional(),
    })
    .optional(),

  // ai disclaimer
  aiDisclaimer: z
    .object({
      hide: z.boolean().optional(),
      text: z.string().optional(),
    })
    .optional(),

  // misc
  persistence: z.nativeEnum(ChatPersistence).optional(),

  // external additions
  stylesheet: z.string().optional(),
  extensions: AnyExtension.array().optional(),
});

export type WidgetOverrides = z.infer<typeof WidgetOverrides>;
