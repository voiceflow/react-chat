import { Trace } from '@voiceflow/base-types';
import { useEffect, useRef } from 'react';

import { ResponseExtension } from '@/dtos/Extension.dto';

import Message from '../Message';

export interface ExtensionMessageProps {
  extensions: ResponseExtension[];
  trace: Trace.AnyTrace;
}

export const ExtensionMessage: React.FC<ExtensionMessageProps> = ({ extensions, trace }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // eslint-disable-next-line xss/no-mixed-html
    extensions.forEach((extension) => extension.render?.({ trace, element: ref.current as HTMLElement }));
  }, []);

  return (
    <Message from="system">
      <span ref={ref} />
    </Message>
  );
};
