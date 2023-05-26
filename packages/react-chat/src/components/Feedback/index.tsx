import React from 'react';

import { thumbsUp as ThumbsUp } from '@/assets/svg';

import { Button, ButtonsContainer, Container, Description } from './styled';

export interface FeedbackProps extends React.PropsWithChildren {
  /**
   * Alternative question to ask the user
   *
   * @default 'Was this helpful?'
   */
  question?: string;

  onClick: (feedback: 'positive' | 'negative') => void;
}

const Feedback: React.FC<FeedbackProps> = ({ question = 'Was this helpful?', onClick, ...props }) => {
  const [active, setActive] = React.useState<'positive' | 'negative' | null>(null);

  const handleClick = (feedback: 'positive' | 'negative') => {
    if (feedback === active) return;
    onClick(feedback);
    setActive(feedback);
  };

  return (
    <Container {...props}>
      <Description>{question}</Description>
      <ButtonsContainer>
        <Button orientation="positive" active={active === 'positive'} onClick={() => handleClick('positive')}>
          <ThumbsUp width="24px" height="24px" />
        </Button>
        <Button orientation="negative" active={active === 'negative'} onClick={() => handleClick('negative')}>
          <ThumbsUp width="24px" height="24px" />
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Feedback;
