import { type RefObject, useEffect, useRef, useState } from 'react';

import { ScrollButton } from '../NewFooter/ScrollButton';
import { scrollToBottomButton, scrollToButtonContainer } from './styles.css';

interface ScrollToBottomProps {
  scrollableAreaRef: RefObject<HTMLDivElement>;
}

export const ScrollToBottom: React.FC<ScrollToBottomProps> = ({ scrollableAreaRef }) => {
  const [atBottom, setAtBottom] = useState(true);
  const prevScrollPosition = useRef<number>();
  const pauseCheck = useRef(false);

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
    if (!scrollableAreaRef?.current || !prevScrollPosition) return;
    if (pauseCheck.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollableAreaRef.current;

    if (scrollTop > (prevScrollPosition?.current || 0)) {
      // This means the scrollableArea is being scrolled down, which can be caused by
      // the AutoScrollProvider - and in this case, we should wait a little bit (0.5s)
      // before checking the scroll position so we don't flash the button while messages
      // are coming in.
      pauseCheck.current = true;
      setTimeout(() => {
        prevScrollPosition.current = scrollableAreaRef.current?.scrollTop;
        pauseCheck.current = false;
        handleScroll();
      }, 500);

      return;
    }

    const buffer = 30;
    const isAboveBottom = scrollTop + clientHeight < scrollHeight - buffer;

    setAtBottom(!isAboveBottom);
    prevScrollPosition.current = scrollTop;
  };

  const scrollToBottom = () => {
    if (!scrollableAreaRef?.current) return;

    scrollableAreaRef.current.scrollTo({
      top: scrollableAreaRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={scrollToButtonContainer}>
      <ScrollButton className={scrollToBottomButton({ hidden: !!atBottom })} onClick={scrollToBottom} />
    </div>
  );
};
