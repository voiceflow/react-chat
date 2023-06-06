import React from 'react';

import { thumbsUp as ThumbsUp } from '@/assets/svg';
import { FeedbackName } from '@/hooks';

import { Button, ButtonsContainer, Container, Description } from './styled';

export interface FeedbackProps extends React.PropsWithChildren {
  /**
   * Alternative question to ask the user
   *
   * @default 'Was this helpful?'
   */
  question?: string;

  /**
   * Message that will be sent with the feedback
   */
  aiMessage: string;

  onClick: (feedback: FeedbackName, message: string) => void;
}

const Feedback: React.FC<FeedbackProps> = ({ question = 'Was this helpful?', onClick, aiMessage, ...props }) => {
  const [active, setActive] = React.useState<FeedbackName | null>(null);

  const handleClick = (feedback: FeedbackName) => {
    if (feedback === active) return;
    onClick(feedback, aiMessage);
    setActive(feedback);
  };

  return (
    <Container {...props}>
      <Description>{question}</Description>
      <ButtonsContainer>
        <Button orientation="positive" active={active === FeedbackName.POSITIVE} onClick={() => handleClick(FeedbackName.POSITIVE)}>
          <ThumbsUp width="24px" height="24px" />
        </Button>
        <Button orientation="negative" active={active === FeedbackName.NEGATIVE} onClick={() => handleClick(FeedbackName.NEGATIVE)}>
          <ThumbsUp width="24px" height="24px" />
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Feedback;
