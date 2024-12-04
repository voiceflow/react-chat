import { Trace } from '@voiceflow/base-types';
import type { WidgetSettingsWidgetPosition } from '@voiceflow/dtos-interact';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { match } from 'ts-pattern';

import { ClassName } from '@/constants';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { closeButton, closeButtonIcon, messageContainer, proactiveContainer, singleMessage } from './styles.css';

interface ProactiveQueueProps {
  side: WidgetSettingsWidgetPosition;
  messages: Trace.AnyTrace[];
}

export const Proactive: React.FC<ProactiveQueueProps> = ({ side, messages }) => {
  const [isClosed, setIsClosed] = useState(false);

  const queue = useMemo(
    () =>
      messages.map((message, index) =>
        match(message)
          .with({ type: Trace.TraceType.TEXT }, ({ payload }) => (
            <div className={singleMessage} key={index}>
              {String(payload.message)}
            </div>
          ))
          .otherwise(() => null)
      ),
    [messages]
  );

  useEffect(() => {
    if (!queue.length) return;
    setIsClosed(false);
  }, [queue]);

  if (isClosed || !queue.length) return null;

  return (
    <div className={clsx(ClassName.PROACTIVE, proactiveContainer({ side }))}>
      <Button round className={closeButton} onClick={() => setIsClosed(true)}>
        <Icon className={closeButtonIcon} svg="closeV2" />
      </Button>
      <div className={messageContainer}>{queue}</div>
    </div>
  );
};
