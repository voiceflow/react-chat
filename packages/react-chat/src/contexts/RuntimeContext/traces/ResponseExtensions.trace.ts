import { Trace } from '@voiceflow/base-types';
import { TraceDeclaration } from '@voiceflow/sdk-runtime';

import { MessageType } from '@/components/SystemResponse/constants';
import { AnyExtension, ExtensionType, ResponseExtension } from '@/dtos/Extension.dto';

import { RuntimeMessage } from '../messages';

export const ResponseExtensions = (extensions: AnyExtension[]): TraceDeclaration<RuntimeMessage, Trace.AnyTrace>[] => {
  return extensions
    .filter((extension): extension is ResponseExtension => extension.type === ExtensionType.RESPONSE)
    .map((extension) => ({
      canHandle: (trace) => extension.match({ trace }),

      handle: ({ context }, trace) => {
        context.messages.push({ type: MessageType.EXTENSION, payload: { trace, extension } });

        return context;
      },
    }));
};
