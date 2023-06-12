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

  onClick: (feedback: FeedbackName) => void;
}

const Feedback: React.FC<FeedbackProps> = ({ question = 'Was this helpful?', onClick, ...props }) => {
  const [active, setActive] = React.useState<FeedbackName | null>(null);

  const handleClick = (feedback: FeedbackName) => {
    if (feedback === active) return;
    onClick(feedback);
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
