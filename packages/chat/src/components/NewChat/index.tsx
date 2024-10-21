import { useEffect, useRef, useState } from 'react';

import CODE_RESPONSE_FIXTURE from '@/__fixtures__/markdown/code-response.md?raw';
import CODE_SNIPPET_FIXTURE from '@/__fixtures__/markdown/inline-code.md?raw';
import LISTS_FIXTURE from '@/__fixtures__/markdown/lists.md?raw';
import TABLES_QUOTES_RULES from '@/__fixtures__/markdown/tables-quotes-rules.md?raw';
import TEXT_TREATMENT_MARKDOWN from '@/__fixtures__/markdown/text-treatment.md?raw';

import mockAvatar from '../../assets/blank-image.png';
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

  const handleScroll = () => {
    if (scrollableAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableAreaRef.current;
      setShowScrollToBottom(scrollTop + clientHeight < scrollHeight - 1);
    }
  };
  useEffect(() => {
    if (scrollableAreaRef.current) {
      scrollableAreaRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollableAreaRef.current) {
        scrollableAreaRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    handleScroll();
  }, [chatMessages]);

  const handleSubmit = async () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { from: 'user', text: newMessage }]);
      setNewMessage('');
    }

    // randomly respond with one of the fixtures
    const randomIndex = Math.floor(Math.random() * 4);
    const response = [TEXT_TREATMENT_MARKDOWN, CODE_SNIPPET_FIXTURE, CODE_RESPONSE_FIXTURE, TABLES_QUOTES_RULES][
      randomIndex
    ];
    setTimeout(() => {
      setChatMessages([...chatMessages, { from: 'system', text: response }]);
    }, 500);
  };

  return (
    <div className={chatContainer}>
      <Header title="ChatKit V2" image={mockAvatar} rounded />
      <div className={scrollableArea} ref={scrollableAreaRef}>
        <WelcomeMessage
          avatar={mockAvatar}
          title="ChatKit V2"
          description="Hi, I'm your new chat kit! Let's make some cool stuff."
        />
        <div className={chatContent}>
          {chatMessages.map((msg, idx) => {
            const isMessageSameAsPrevious = idx > 0 && chatMessages[idx - 1].from === msg.from;
            return (
              <div
                key={`${msg}-${idx}`}
                className={
                  msg.from === 'system'
                    ? agentMessage({ tight: isMessageSameAsPrevious })
                    : userMessage({ tight: isMessageSameAsPrevious })
                }
              >
                {msg.from === 'system' && (
                  <div className={avatarContainer}>
                    <Avatar avatar={mockAvatar} />
                  </div>
                )}
                {msg.from === 'system' ? (
                  <AgentMessage from="system">{msg.text}</AgentMessage>
                ) : (
                  <UserMessage from="user">{msg.text}</UserMessage>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <section className={footerContainer}>
        <NewFooter
          {...footerProps}
          messageInputProps={{
            ...footerProps.messageInputProps,
            onValueChange: setNewMessage,
            message: newMessage,
            onSubmit: handleSubmit,
          }}
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
