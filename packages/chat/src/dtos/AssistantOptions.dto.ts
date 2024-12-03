import { z } from 'zod';

import { DEFAULT_PRIMARY } from '@/styles/colors';
import { ChatPersistence, ChatPosition } from '@/types';

import { AnyExtension } from './Extension.dto';

export const DEFAULT_AVATAR = 'https://cdn.voiceflow.com/assets/logo.png';

// TODO: Update this with new default avatar image
export const DEFAULT_CHAT_AVATAR = 'https://cdn.voiceflow.com/assets/logo.png';

export type AssistantOptions = z.infer<typeof AssistantOptions>;
export type RawAssistantOptions = z.input<typeof AssistantOptions>;

export const AssistantOptions = z
  .object({
    title: z.string().default('Voiceflow Assistant'),
    color: z.string().default(DEFAULT_PRIMARY),
    image: z.string().default(DEFAULT_AVATAR),
    avatar: z.string().default(DEFAULT_AVATAR),
    launcher: z.string().optional(),
    watermark: z.boolean().default(true),
    feedback: z.boolean().default(false),
    stylesheet: z.union([z.string(), z.string().array()]).optional(),
    description: z.string().default(''),
    position: z.nativeEnum(ChatPosition).default(ChatPosition.RIGHT),
    persistence: z.nativeEnum(ChatPersistence).default(ChatPersistence.LOCAL_STORAGE),
    audioInterface: z.boolean().default(false),
    defaultAudioOutput: z.boolean().optional(),

    spacing: z
      .object({
        side: z.number().default(30),
        bottom: z.number().default(30),
      })
      .default({}),

    extensions: AnyExtension.array().default([]),
  })
  .default({});
