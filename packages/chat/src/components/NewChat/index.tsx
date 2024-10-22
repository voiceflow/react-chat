import { useEffect, useRef, useState } from 'react';

import CODE_RESPONSE_FIXTURE from '@/__fixtures__/markdown/code-response.md?raw';
import CODE_SNIPPET_FIXTURE from '@/__fixtures__/markdown/inline-code.md?raw';
import LISTS_FIXTURE from '@/__fixtures__/markdown/lists.md?raw';
import TABLES_QUOTES_RULES from '@/__fixtures__/markdown/tables-quotes-rules.md?raw';
import TEXT_TREATMENT_MARKDOWN from '@/__fixtures__/markdown/text-treatment.md?raw';

import mockAvatar from '../../assets/blank-image.png';
import { Dialog } from '../Dialog';
import Header from '../Header';
import { NewFooter } from '../NewFooter';
import { ScrollButton } from '../NewFooter/ScrollButton';
import { chatContainer, chatFooter, dialogContainer, scrollToButton } from './NewChat.css';

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

  const handleScrollToBottom = () => {
    if (scrollableAreaRef.current) {
      scrollableAreaRef.current.scrollTo({
        top: scrollableAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = async () => {
    // randomly respond with one of the fixtures
    const randomIndex = Math.floor(Math.random() * 5);
    const response = [
      TEXT_TREATMENT_MARKDOWN,
      CODE_SNIPPET_FIXTURE,
      LISTS_FIXTURE,
      CODE_RESPONSE_FIXTURE,
      TABLES_QUOTES_RULES,
    ][randomIndex];
    setTimeout(() => {
      setChatMessages([...chatMessages, { from: 'user', text: newMessage }, { from: 'system', text: response }]);
    }, 500);
  };

  return (
    <div className={chatContainer}>
      <Header title="ChatKit V2" image={mockAvatar} rounded />
      <div ref={scrollableAreaRef} className={dialogContainer}>
        <Dialog messages={chatMessages} />
      </div>
      {showScrollToBottom && (
        <div className={scrollToButton}>
          <ScrollButton onClick={handleScrollToBottom} />
        </div>
      )}
      <div className={chatFooter}>
        <NewFooter
          {...footerProps}
          messageInputProps={{
            ...footerProps.messageInputProps,
            onValueChange: setNewMessage,
            message: newMessage,
            onSubmit: handleSubmit,
          }}
        />
      </div>
    </div>
  );
};
