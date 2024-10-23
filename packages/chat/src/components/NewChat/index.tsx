import { useEffect, useRef, useState } from 'react';

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
      const isAboveBottom = scrollTop + clientHeight < scrollHeight - 1;
      setShowScrollToBottom(isAboveBottom);
      if (!isAboveBottom) {
        handleScrollToBottom();
      }
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
    if (scrollableAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableAreaRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      setTimeout(() => {
        setChatMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, { from: 'user', text: newMessage }];
          if (isAtBottom) {
            scrollableAreaRef.current?.scrollTo({
              top: scrollableAreaRef.current.scrollHeight,
              behavior: 'smooth',
            });
          }
          return updatedMessages;
        });
      }, 500);
    }
  };

  return (
    <div className={chatContainer}>
      <Header title="ChatKit V2" image={mockAvatar} rounded />
      <div ref={scrollableAreaRef} className={dialogContainer}>
        <Dialog messages={chatMessages} showPoweredBy={footerProps.showPoweredBy} />
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
