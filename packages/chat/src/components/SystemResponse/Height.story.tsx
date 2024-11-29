import type { Meta } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import { testAvatar, testAvatarColumn, testContainer, testMessage, testMessageColumn } from './Height.css';
const Test = () => {
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([{ id: '0', text: 'Message 1' }]);
  const avatarRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prevMessages) => {
        if (prevMessages.length >= 10) {
          clearInterval(interval);
          return prevMessages;
        }
        return [...prevMessages, { id: prevMessages.length.toString(), text: `Message ${prevMessages.length + 1}` }];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (avatarRef.current && messageListRef.current) {
      const lastMessage = messageListRef.current.lastElementChild as HTMLElement;
      if (lastMessage) {
        // Calculate offset relative to the parent container
        const offset = lastMessage.offsetTop;
        avatarRef.current.style.transform = `translateY(${offset}px)`;
      }
    }
  }, [messages]);
  return (
    <div className={testContainer}>
      <div
        className={testAvatarColumn}
        style={{ alignItems: 'flex-end' }} // Change alignment for demonstration
      >
        <div className={testAvatar} ref={avatarRef}></div>
      </div>
      <div className={testMessageColumn} ref={messageListRef}>
        {messages.map((message) => (
          <div key={message.id} className={testMessage}>
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'HeightEXP',
  component: Test,

  argTypes: {
    timestamp: {
      control: { type: 'date' },
    },
  },
  excludeStories: ['RawTemplate'],
  render: (args) => <Test {...args} />,
};

export const Base = {};

export default meta;
