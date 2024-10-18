/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import type { Meta } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import { VF_ICON } from '@/fixtures';

import { AgentMessage } from '../AgentMessage';
import Avatar from '../Avatar';
import Header from '../Header';
import { NewFooter } from '../NewFooter';
import { UserMessage } from '../UserMessage';
import { WelcomeMessage } from '../WelcomeMessage';
import { agentMessage, avatarContainer, chatContainer, chatContent, scrollableArea, userMessage } from './NewChat.css';

const meta: Meta = {
  title: 'Widget',
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const buttons = [
  {
    label: 'Who built this?',
    onClick: () => alert('Button 1 clicked'),
  },
  {
    label: "Say 'Howdy'",
    onClick: () => alert('Button 2 clicked'),
  },
  {
    label: 'LFG 🚀',
    onClick: () => alert('Button 3 clicked'),
  },
  {
    label: 'What is this?',
    onClick: () => alert('Button 4 clicked'),
  },
  {
    label: 'Label',
    onClick: () => alert('Button 5 clicked'),
  },
  {
    label: 'Label',
    onClick: () => alert('Button 6 clicked'),
  },
  {
    label: 'Label',
    onClick: () => alert('Button 6 clicked'),
  },
];
const MockWidget = () => {
  const [messages, setMessages] = useState([
    {
      from: 'system',
      text: "Hi, I'm your new ChatKit, your assistant! I'm here to help you with your queries. How can I help you today?",
    },
    { from: 'user', text: 'Howdy!' },
    { from: 'user', text: 'What kinda sick stuff can you do?' },
    { from: 'system', text: "You're in for a treat. We can do some pretty sick stuff." },
    { from: 'user', text: 'What kinda sick stuff can you do?' },
    { from: 'user', text: 'What kinda sick stuff can you do?' },
    { from: 'system', text: "You're in for a treat. We can do some pretty sick stuff." },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollableAreaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (scrollableAreaRef.current) {
      scrollableAreaRef.current.scrollTop = scrollableAreaRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableAreaRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableAreaRef.current;
        setShowScrollToBottom(scrollTop + clientHeight < scrollHeight - 1);
      }
    };

    if (scrollableAreaRef.current) {
      scrollableAreaRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollableAreaRef.current) {
        scrollableAreaRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleSubmit = async () => {
    if (newMessage.trim()) {
      setMessages([...messages, { from: 'user', text: newMessage }]);
      setNewMessage('');
    }

    const llamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: newMessage,
        stream: true, // Enable streaming
      }),
    });

    const reader = llamaRes.body?.getReader();
    const decoder = new TextDecoder();
    let accumulatedMessage = '';

    while (true) {
      // eslint-disable-next-line no-await-in-loop, no-unsafe-optional-chaining
      const { done, value } = await reader?.read()!;
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const jsonChunk = JSON.parse(chunk);
      accumulatedMessage += jsonChunk.response;

      // Update the UI by appending to the last system message

      // eslint-disable-next-line no-loop-func
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.from === 'system') {
          return [...prevMessages.slice(0, -1), { from: 'system', text: accumulatedMessage }];
        }
        return [...prevMessages, { from: 'system', text: accumulatedMessage }];
      });
    }

    // Ensure the final decoded value is flushed
    accumulatedMessage += decoder.decode();
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.from === 'system') {
        return [...prevMessages.slice(0, -1), { from: 'system', text: accumulatedMessage }];
      }
      return [...prevMessages, { from: 'system', text: accumulatedMessage }];
    });
  };

  return (
    <div className={chatContainer}>
      <Header title="ChatKit V2" image={VF_ICON} rounded />
      <span className={scrollableArea} ref={scrollableAreaRef}>
        <WelcomeMessage
          avatar={VF_ICON}
          title="ChatKit V2"
          description="Hi, I'm your new chat kit! Let's make some cool stuff."
        />
        <div className={chatContent}>
          {messages.map((msg, idx) => (
            <div key={`${msg}-${idx}`} className={msg.from === 'system' ? agentMessage : userMessage}>
              {msg.from === 'system' && (
                <div className={avatarContainer}>
                  <Avatar avatar={VF_ICON} />
                </div>
              )}
              {msg.from === 'system' ? (
                <AgentMessage from="system">{msg.text}</AgentMessage>
              ) : (
                <UserMessage from="user">{msg.text}</UserMessage>
              )}
            </div>
          ))}
        </div>
      </span>
      <NewFooter
        showPoweredBy={true}
        buttons={buttons}
        onScrollToBottom={() => {
          if (scrollableAreaRef.current) {
            scrollableAreaRef.current.scrollTo({
              top: scrollableAreaRef.current.scrollHeight,
              behavior: 'smooth',
            });
          }
        }}
        showScrollToButton={showScrollToBottom}
        messageInputProps={{
          message: newMessage,
          onValueChange: (e) => setNewMessage(e),
          placeholder: 'Message...',
          onSubmit: handleSubmit,
        }}
      />
    </div>
  );
};

export const PrimaryInfo = {
  render: () => <MockWidget />,
};
