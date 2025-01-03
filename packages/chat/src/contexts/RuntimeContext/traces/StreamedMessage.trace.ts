import type { TraceDeclaration } from '@voiceflow/sdk-runtime';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';

import type { StreamedMessageProps } from '@/components/SystemResponse';

import type { RuntimeMessage } from '../messages';

enum CompletionState {
  START = 'start',
  CONTENT = 'content',
  END = 'end',
}

interface StartEvent {
  state: CompletionState.START;
}

interface EndEvent {
  state: CompletionState.END;
}

interface ContentEvent {
  state: CompletionState.CONTENT;
  content: string;
}

interface CompletionTrace {
  type: 'completion';
  payload: StartEvent | EndEvent | ContentEvent;
}

export const StreamedMessage = (): TraceDeclaration<RuntimeMessage, any> => {
  let message:
    | (StreamedMessageProps & {
        stream: TransformStream;
      })
    | null = null;

  return {
    canHandle: ({ type }) => type === 'completion',
    handle: ({ context }, trace: CompletionTrace) => {
      match(trace.payload)
        .with({ state: CompletionState.START }, () => {
          const stream = new TransformStream();

          message = {
            type: 'stream',
            text: '',
            stream,
            useStream: () => {
              const [state, setState] = useState('');

              useEffect(() => {
                try {
                  const reader = stream.readable.getReader();

                  const read = async () => {
                    const { done, value } = await reader.read();

                    if (done) return;

                    setState((prev) => prev + value);
                  };

                  read();

                  return () => {
                    reader.cancel();
                  };
                } catch (e) {
                  console.error('cannot read stream', e);
                }

                return undefined;
              }, []);

              return state;
            },
          };
          context.messages.push(message);
        })
        .with({ state: CompletionState.END }, () => {
          if (!message) return;

          message.stream.writable.close();
          message = null;
        })
        .with({ state: CompletionState.CONTENT }, ({ content }) => {
          if (!message) return;

          const writer = message.stream.writable.getWriter();
          writer.write(content);
          writer.releaseLock();

          message.text += content;

          console.log('message', message.text);
        })
        .exhaustive();

      return context;
    },
  };
};
