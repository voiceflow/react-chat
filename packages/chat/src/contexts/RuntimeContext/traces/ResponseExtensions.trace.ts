import type { Trace } from '@voiceflow/base-types';
import type { TraceDeclaration } from '@voiceflow/sdk-runtime';

import { MessageType } from '@/components/SystemResponse/constants';
import type { AnyExtension, ResponseExtension } from '@/dtos/Extension.dto';
import { ExtensionType } from '@/dtos/Extension.dto';

import type { RuntimeMessage } from '../messages';

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
