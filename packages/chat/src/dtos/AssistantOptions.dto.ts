import { z } from 'zod';

import { PRIMARY } from '@/styles/color';
import { ChatPersistence, ChatPosition } from '@/types';

import { AnyExtension } from './Extension.dto';

export const DEFAULT_AVATAR = 'https://cdn.voiceflow.com/assets/logo.png';

export type AssistantOptions = z.infer<typeof AssistantOptions>;
export type RawAssistantOptions = z.input<typeof AssistantOptions>;

export const AssistantOptions = z
  .object({
    title: z.string().default('Voiceflow Assistant'),
    color: z.string().default(PRIMARY),
    image: z.string().default(DEFAULT_AVATAR),
    avatar: z.string().default(DEFAULT_AVATAR),
    launcher: z.string().optional(),
    watermark: z.boolean().default(true),
    feedback: z.boolean().default(false),
    stylesheet: z.union([z.string(), z.string().array()]).optional(),
    description: z.string().default(''),
    position: z.nativeEnum(ChatPosition).default(ChatPosition.RIGHT),
    persistence: z.nativeEnum(ChatPersistence).default(ChatPersistence.LOCAL_STORAGE),

    spacing: z
      .object({
        side: z.number().default(30),
        bottom: z.number().default(30),
      })
      .default({}),

    extensions: AnyExtension.array().default([]),
  })
  .default({});
