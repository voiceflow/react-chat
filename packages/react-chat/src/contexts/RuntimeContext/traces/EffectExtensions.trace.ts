import { Trace } from '@voiceflow/base-types';
import { TraceDeclaration } from '@voiceflow/sdk-runtime';

import { AnyExtension, EffectExtension, ExtensionType } from '@/dtos/Extension.dto';

import { RuntimeMessage } from '../messages';

export const EffectExtensions = (extensions: AnyExtension[]): TraceDeclaration<RuntimeMessage, Trace.AnyTrace> => {
  const effectExtensions = extensions.filter((extension): extension is EffectExtension => extension.type === ExtensionType.EFFECT);

  return {
    // accept all traces to pass them on to extensions
    canHandle: () => true,

    handle: ({ context }, trace) => {
      // NOTE: these promises are intentionally left unhandled
      // we just want to capture and raise any errors thrown
      effectExtensions.forEach(async (extension) => {
        if (!extension.match({ trace })) return;

        try {
          await extension.effect?.({ trace });
        } catch (e) {
          console.error(`Extension '${extension.name}' threw an error: ${e}`);
        }
      });

      return context;
    },
  };
};
