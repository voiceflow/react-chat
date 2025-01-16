import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { ClassName } from '@/constants';
import AgentCard from '..';

describe('AgentCard', () => {
  const defaultProps = {
    name: 'John Smith',
    timestamp: '2 hours ago',
    initials: 'JS',
  };

  it('renders with default props', () => {
    render(<AgentCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.name)).toBeDefined();
    expect(screen.getByText(defaultProps.timestamp)).toBeDefined();
    expect(screen.getByText(defaultProps.initials)).toBeDefined();
  });

  it('applies custom avatar color', () => {
    const customColor = '#ff6b6b';
    const { container } = render(<AgentCard {...defaultProps} avatarColor={customColor} />);
    const avatar = container.querySelector(`.${ClassName.AVATAR}`) as HTMLElement;
    expect(avatar).toHaveStyle(`background-color: ${customColor}`);
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<AgentCard {...defaultProps} onClick={handleClick} />);
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<AgentCard {...defaultProps} className={customClass} />);
    expect(container.firstChild).toHaveClass(customClass);
  });
});
