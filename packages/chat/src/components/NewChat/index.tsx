import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import mockAvatar from '../../assets/blank-image.png';
import { Dialog } from '../Dialog';
import { Header, type HeaderProps } from '../Header';
import type { INewFooter } from '../NewFooter';
import { NewFooter } from '../NewFooter';
import { ScrollButton } from '../NewFooter/ScrollButton';
import type { IWelcomeMessage } from '../WelcomeMessage';
import { chatContainer, chatFooter, dialogContainer, scrollToButton } from './NewChat.css';

interface INewChat extends HeaderProps, IWelcomeMessage, INewFooter {
  messages?: { from: string; text: string }[];
  color?: string;
}

export const NewChat: React.FC<INewChat> = ({
  messages,
  color,
  buttons,
  showPoweredBy,
  messageInputProps,
  privacyURL,
}) => {
  const [chatMessages, setChatMessages] = useState(messages ?? []);
  const [newMessage, setNewMessage] = useState('');
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollableAreaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scrollableAreaRef.current) {
      scrollableAreaRef.current.scrollTo({
        top: scrollableAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
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
      setChatMessages((prevMessages) => [...prevMessages, { from: 'user', text: newMessage }]);
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
      <Header title="ChatKit V2" image={mockAvatar} rounded />
      <div ref={scrollableAreaRef} className={dialogContainer}>
        <Dialog messages={chatMessages} showPoweredBy={showPoweredBy} color={color} />
      </div>
      {showScrollToBottom && (
        <div className={scrollToButton}>
          <ScrollButton onClick={handleScrollToBottom} />
        </div>
      )}
      <div className={chatFooter}>
        <NewFooter
          buttons={buttons}
          showPoweredBy={showPoweredBy}
          privacyURL={privacyURL}
          messageInputProps={{ ...messageInputProps }}
        />
      </div>
    </div>
  );
};
