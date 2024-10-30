import type { Trace } from '@voiceflow/base-types';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import { ClassName } from '@/constants';
import type { ResponseExtension } from '@/dtos/Extension.dto';

import { extensionMessageContainer } from './styles.css';

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
    <div className={clsx(ClassName.MESSAGE, `vfrc-message--extension-${extension.name}`, extensionMessageContainer)}>
      <span ref={ref} />
    </div>
  );
};
