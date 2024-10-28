import { type RefObject, useEffect, useState } from 'react';

import { ScrollButton } from '../NewFooter/ScrollButton';
import { scrollToButton } from './styles.css';

interface ScrollToBottomProps {
  scrollableAreaRef: RefObject<HTMLDivElement>;
}

export const ScrollToBottom: React.FC<ScrollToBottomProps> = ({ scrollableAreaRef }) => {
  const [atBottom, setAtBottom] = useState(false);

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

  const handleScroll = () => {
    if (!scrollableAreaRef?.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollableAreaRef.current;
    const isAboveBottom = scrollTop + clientHeight < scrollHeight - 1;
    setAtBottom(!isAboveBottom);
  };

  const scrollToBottom = () => {
    if (!scrollableAreaRef?.current) return;

    scrollableAreaRef.current.scrollTo({
      top: scrollableAreaRef.current.scrollHeight,
      behavior: 'smooth',
    });
    setAtBottom(true);
  };

  if (atBottom) {
    return null;
  }

  return (
    <div className={scrollToButton}>
      <ScrollButton onClick={scrollToBottom} />
    </div>
  );
};
