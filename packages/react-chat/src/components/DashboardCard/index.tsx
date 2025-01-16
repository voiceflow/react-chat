import React from 'react';

import { Container } from './styled';

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered inside the card.
   */
  children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children, ...props }) => (
  <Container {...props}>{children}</Container>
);

/**
 * A flexible card component with a rounded rectangle shape and subtle shadow effects.
 */
export default Object.assign(DashboardCard, {
  Container,
});
