import type { Trace } from '@voiceflow/base-types';
import { useEffect, useRef } from 'react';

import type { ResponseExtension } from '@/dtos/Extension.dto';

import Message from '../Message';

export interface ExtensionMessageProps {
  extension: ResponseExtension;
  trace: Trace.AnyTrace;
}

export const ExtensionMessage: React.FC<ExtensionMessageProps> = ({ extension, trace }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    try {
      const unmount = extension.render?.({ trace, element: ref.current as HTMLElement });
      if (!unmount) return undefined;

      return () => {
        try {
          unmount?.();
        } catch (e) {
          console.error(`Extension '${extension.name}' threw an error while unmounting: ${e}`);
        }
      };
    } catch (e) {
      console.error(`Extension '${extension.name}' threw an error while mounting: ${e}`);
      return undefined;
    }
  }, []);

  return (
    <Message from="system" className={`vfrc-message--extension-${extension.name}`}>
      <span ref={ref} />
    </Message>
  );
};
