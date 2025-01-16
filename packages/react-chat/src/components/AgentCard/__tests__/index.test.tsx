import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { ClassName } from '@/constants';
import AgentCard from '..';
import { styled } from '@/styles';

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

  it('handles empty or missing props gracefully', () => {
    const { container } = render(
      <AgentCard
        name=""
        timestamp=""
        initials=""
      />
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.name)).not.toBeInTheDocument();
  });

  it('spreads additional props to button element', () => {
    const testId = 'test-agent-card';
    const ariaLabel = 'Agent Card';
    render(
      <AgentCard
        {...defaultProps}
        data-testid={testId}
        aria-label={ariaLabel}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-testid', testId);
    expect(button).toHaveAttribute('aria-label', ariaLabel);
  });

  it('maintains correct layout structure', () => {
    const { container } = render(<AgentCard {...defaultProps} />);
    const button = screen.getByRole('button');
    const avatar = container.querySelector(`.${ClassName.AVATAR}`);
    const contentContainer = button.querySelector('[class*="content"]');

    expect(button).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
    });
    expect(avatar).toBeInTheDocument();
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it('handles keyboard navigation', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<AgentCard {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard('[Space]');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    handleClick.mockClear();
    await user.keyboard('[Enter]');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies hover styles correctly', async () => {
    const { container } = render(<AgentCard {...defaultProps} />);
    const button = screen.getByRole('button');
    
    // Initial state
    expect(button).toHaveStyle({
      backgroundColor: 'rgb(255, 255, 255)', // $white
    });
    
    // Hover state
    await userEvent.hover(button);
    expect(button).toHaveStyle({
      backgroundColor: 'rgb(244, 244, 244)', // $lightGrey
    });
    
    // Remove hover
    await userEvent.unhover(button);
    expect(button).toHaveStyle({
      backgroundColor: 'rgb(255, 255, 255)', // $white
    });
  });
});
