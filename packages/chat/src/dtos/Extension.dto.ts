import type { Trace } from '@voiceflow/base-types';
import { z } from 'zod';

export enum ExtensionType {
  EFFECT = 'effect',
  RESPONSE = 'response',
}

export type EffectExtension = z.infer<typeof EffectExtension>;
export type ResponseExtension = z.infer<typeof ResponseExtension>;
export type AnyExtension = z.infer<typeof AnyExtension>;

const Extension = <Type extends ExtensionType>(type: Type) =>
  z.object({
    name: z.string(),
    type: z.literal(type),
    match: z.function().transform((f) => f as (context: { trace: Trace.AnyTrace }) => boolean),
  });

export const EffectExtension = Extension(ExtensionType.EFFECT).extend({
  effect: z
    .function()
    .transform((f) => f as (context: { trace: Trace.AnyTrace }) => Promise<void> | void)
    .optional(),
});

export const ResponseExtension = Extension(ExtensionType.RESPONSE).extend({
  render: z
    .function()
    .transform((f) => f as (context: { trace: Trace.AnyTrace; element: HTMLElement }) => (() => void) | void)
    .optional(),
});

export const AnyExtension = z.discriminatedUnion('type', [EffectExtension, ResponseExtension]);
