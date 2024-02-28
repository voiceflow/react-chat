import { Trace } from '@voiceflow/base-types';
import { TraceDeclaration } from '@voiceflow/sdk-runtime';

import { AnyExtension, EffectExtension, ExtensionType } from '@/dtos/Extension.dto';

import { RuntimeMessage } from '../messages';

export const EffectExtensions = (extensions: AnyExtension[]): TraceDeclaration<RuntimeMessage, Trace.AnyTrace>[] => {
  return extensions
    .filter((extension): extension is EffectExtension => extension.type === ExtensionType.EFFECT)
    .map((extension) => ({
      canHandle: (trace) => extension.match({ trace }),

      handle: ({ context }, trace) => {
        // NOTE: this promise is intentionally left unhandled
        // we just want to capture and raise any errors thrown
        (async () => {
          try {
            await extension.effect?.({ trace });
          } catch (e) {
            console.error(`Extension '${extension.name}' threw an error: ${e}`);
          }
        })();

        return context;
      },
    }));
};
