import * as React from 'react';
import Avatar from '@/components/Avatar';

import { AgentButton, ContentContainer, AgentName, AgentTimestamp } from './styled';

export interface AgentCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The name of the agent to display.
   */
  name: string;

  /**
   * The timestamp to display below the name.
   */
  timestamp: string;

  /**
   * The initials to display in the avatar when no image is provided.
   */
  initials: string;

  /**
   * Optional background color for the avatar.
   * @default '#4a9b57'
   */
  avatarColor?: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  name, 
  timestamp, 
  initials, 
  avatarColor = '#4a9b57',
  className,
  ...props 
}) => (
  <AgentButton className={className} {...props}>
    <Avatar
      size="small"
      avatar=""
      css={{
        backgroundColor: avatarColor,
        color: '$white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {initials}
    </Avatar>
    <ContentContainer>
      <AgentName>{name}</AgentName>
      <AgentTimestamp>{timestamp}</AgentTimestamp>
    </ContentContainer>
  </AgentButton>
);

/**
 * A button component that displays agent information with an avatar.
 */
export default Object.assign(AgentCard, {
  Button: AgentButton,
  Container: ContentContainer,
  Name: AgentName,
  Timestamp: AgentTimestamp,
});
