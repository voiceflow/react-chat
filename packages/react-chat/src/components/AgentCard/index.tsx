import React from 'react';

import { Container } from './styled';

export interface AgentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered inside the card.
   */
  children?: React.ReactNode;
}

const AgentCard: React.FC<AgentCardProps> = ({ children, ...props }) => (
  <Container {...props}>{children}</Container>
);

/**
 * A flexible card component with a rounded rectangle shape and subtle shadow effects.
 */
export default Object.assign(AgentCard, {
  Container,
});
