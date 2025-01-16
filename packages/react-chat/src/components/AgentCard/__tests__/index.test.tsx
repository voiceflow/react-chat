import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<AgentCard {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<AgentCard {...defaultProps} className={customClass} />);
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('applies default avatar color when not specified', () => {
    const { container } = render(<AgentCard {...defaultProps} />);
    const avatar = container.querySelector(`.${ClassName.AVATAR}`);
    expect(avatar).toHaveStyle({ backgroundColor: '#4a9b57' });
  });

  it('maintains correct button attributes', () => {
    render(<AgentCard {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders with correct text styles', () => {
    render(<AgentCard {...defaultProps} />);
    
    const nameElement = screen.getByText(defaultProps.name);
    expect(nameElement).toHaveStyle({
      fontSize: '14px',
      fontWeight: '500',
    });
    
    const timestampElement = screen.getByText(defaultProps.timestamp);
    expect(timestampElement).toHaveStyle({
      fontSize: '12px',
      color: 'rgb(115, 115, 118)', // $darkGrey
    });
  });
});
