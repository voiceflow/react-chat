import { Trace } from '@voiceflow/base-types';
import { TraceDeclaration } from '@voiceflow/sdk-runtime';

import { MessageType } from '@/components/SystemResponse/constants';
import { AnyExtension, ExtensionType, ResponseExtension } from '@/dtos/Extension.dto';

import { RuntimeMessage } from '../messages';

export const ResponseExtensions = (extensions: AnyExtension[]): TraceDeclaration<RuntimeMessage, Trace.AnyTrace> => {
  const responseExtensions = extensions.filter((extension): extension is ResponseExtension => extension.type === ExtensionType.RESPONSE);

  return {
    // accept all traces to pass them on to extensions for matching
    canHandle: () => true,

    handle: ({ context }, trace) => {
      const matching = responseExtensions.filter((extension) => extension.match({ trace }));

      // only add a message node if there's going to be an extension rendering in it
      if (matching.length) {
        context.messages.push({ type: MessageType.EXTENSION, payload: { trace, extensions: matching } });
      }

      return context;
    },
  };
};
