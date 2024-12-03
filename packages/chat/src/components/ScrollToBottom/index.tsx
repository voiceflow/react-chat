import clsx from 'clsx';
import { type RefObject, useContext, useEffect, useRef, useState } from 'react';

import { IsAutoScrollingContext } from '@/contexts';

import { ScrollButton } from '../NewFooter/ScrollButton';
import { scrollToBottomButton, scrollToButtonContainer } from './styles.css';

interface ScrollToBottomProps {
  scrollableAreaRef: RefObject<HTMLDivElement>;
  className?: string;
}

export const ScrollToBottom: React.FC<ScrollToBottomProps> = ({ scrollableAreaRef, className }) => {
  const autoScrolling = useContext(IsAutoScrollingContext);
  const [atBottom, setAtBottom] = useState(true);
  const prevScrollPosition = useRef<number>();
  const pauseCheck = useRef(false);

  useEffect(() => {
    const currentRef = scrollableAreaRef?.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // If it's auto scrolling, then immediately hide the button and pause checking
    // for a bit.
    pauseCheck.current = autoScrolling;
    if (autoScrolling) setAtBottom(true);
  }, [autoScrolling]);

  const handleScroll = () => {
    if (!scrollableAreaRef?.current || !prevScrollPosition) return;
    if (pauseCheck.current) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollableAreaRef.current;

    const buffer = 10;
    const isAboveBottom = scrollTop + clientHeight < scrollHeight - buffer;

    setAtBottom(!isAboveBottom);
    prevScrollPosition.current = scrollTop;
  };

  const scrollToBottom = () => {
    if (!scrollableAreaRef?.current) return;

    // We know that it will reach the bottom, so we call `setAtBottom(true)` cause we want
    // to immediately hide the button while it scrolls down.
    // ...and there's no reliable way of knowing when the scroll action finished, so we
    // just use a timer.
    setAtBottom(true);
    pauseCheck.current = true;
    setTimeout(() => {
      pauseCheck.current = false;
    }, 700);

    scrollableAreaRef.current.scrollTo({
      top: scrollableAreaRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={scrollToButtonContainer}>
      <ScrollButton
        className={clsx(scrollToBottomButton({ hidden: !!atBottom }), className)}
        onClick={scrollToBottom}
      />
    </div>
  );
};
