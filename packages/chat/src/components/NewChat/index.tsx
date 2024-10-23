import mockAvatar from '../../assets/blank-image.png';
import { Dialog } from '../Dialog';
import Header from '../Header';
import { NewFooter } from '../NewFooter';
import { ScrollButton } from '../NewFooter/ScrollButton';
import { chatContainer, chatFooter, dialogContainer, scrollToButton } from './NewChat.css';

interface INewChat {
  messages: { from: string; text: string }[];
  color?: string;
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
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const NewChat: React.FC<INewChat> = ({ messages, color, footerProps }) => {
  const [chatMessages, setChatMessages] = useState(messages);
  const [newMessage, setNewMessage] = useState('');
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollableAreaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scrollableAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableAreaRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if (isAtBottom) {
        scrollableAreaRef.current.scrollTo({
          top: scrollableAreaRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [chatMessages]);

  const handleScroll = () => {
    if (scrollableAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableAreaRef.current;
      const isAboveBottom = scrollTop + clientHeight < scrollHeight - 1;
      setShowScrollToBottom(isAboveBottom);
    }
  };

  useEffect(() => {
    const currentRef = scrollableAreaRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleSubmit = async () => {
    if (newMessage.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { from: 'user', text: newMessage },
       ]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && event.metaKey) {
      handleSubmit();
    }
  };

  // Trigger scroll when manually clicking the scroll button
  const handleScrollToBottom = () => {
    if (scrollableAreaRef.current) {
      scrollableAreaRef.current.scrollTo({
        top: scrollableAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={chatContainer} onKeyDown={handleKeyDown}>
      <Header title="ChatKit V2" image={mockAvatar} rounded primaryColor={color} />
      <div ref={scrollableAreaRef} className={dialogContainer}>
        <Dialog messages={chatMessages} showPoweredBy={footerProps.showPoweredBy} color={color} />
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
