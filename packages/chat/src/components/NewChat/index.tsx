import { useEffect, useRef, useState } from 'react';

import { VF_ICON } from '@/fixtures';

import { AgentMessage } from '../AgentMessage';
import Avatar from '../Avatar';
import Header from '../Header';
import { NewFooter } from '../NewFooter';
import { UserMessage } from '../UserMessage';
import { WelcomeMessage } from '../WelcomeMessage';
import {
  agentMessage,
  avatarContainer,
  chatContainer,
  chatContent,
  footerContainer,
  scrollableArea,
  userMessage,
} from './NewChat.css';

interface INewChat {
  messages: { from: string; text: string }[];
  footerProps: {
    buttons?: { label: string; onClick: () => void }[];
    showPoweredBy?: boolean;
    messageInputProps: {
      message: string;
      onValueChange: (e: string) => void;
      placeholder: string;
      onSubmit: () => void;
    };
  };
}

export const NewChat: React.FC<INewChat> = ({ messages, footerProps }) => {
  const [chatMessages, setChatMessages] = useState(messages);
  const [newMessage, setNewMessage] = useState('');
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollableAreaRef = useRef<HTMLDivElement>(null);

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
      setChatMessages([...chatMessages, { from: 'user', text: newMessage }]);
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
      // eslint-disable-next-line no-await-in-loop, no-unsafe-optional-chaining, @typescript-eslint/no-non-null-asserted-optional-chain
      const { done, value } = await reader?.read()!;
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const jsonChunk = JSON.parse(chunk);
      accumulatedMessage += jsonChunk.response;

      // Update the UI by appending to the last system message

      // eslint-disable-next-line no-loop-func
      setChatMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.from === 'system') {
          return [...prevMessages.slice(0, -1), { from: 'system', text: accumulatedMessage }];
        }
        return [...prevMessages, { from: 'system', text: accumulatedMessage }];
      });
    }

    // Ensure the final decoded value is flushed
    accumulatedMessage += decoder.decode();
    setChatMessages((prevMessages) => {
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
      <div className={scrollableArea} ref={scrollableAreaRef}>
        <WelcomeMessage
          avatar={VF_ICON}
          title="ChatKit V2"
          description="Hi, I'm your new chat kit! Let's make some cool stuff."
        />
        <div className={chatContent}>
          {chatMessages.map((msg, idx) => (
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
      </div>
      <section className={footerContainer}>
        <NewFooter
          {...footerProps}
          showScrollToButton={showScrollToBottom}
          onScrollToBottom={() => {
            if (scrollableAreaRef.current) {
              scrollableAreaRef.current.scrollTo({
                top: scrollableAreaRef.current.scrollHeight,
                behavior: 'smooth',
              });
            }
          }}
        />
      </section>
    </div>
  );
};
