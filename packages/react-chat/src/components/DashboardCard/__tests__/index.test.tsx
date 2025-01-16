import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

import { ClassName } from '../../../constants';
import DashboardCard from '..';

describe('DashboardCard', () => {
  const testContent = 'Test Content';

  it('renders children correctly', () => {
    render(<DashboardCard>{testContent}</DashboardCard>);
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('passes through additional props', () => {
    const testId = 'test-dashboard-card';
    const ariaLabel = 'Dashboard Card';
    render(<DashboardCard data-testid={testId} aria-label={ariaLabel}>{testContent}</DashboardCard>);
    
    const card = screen.getByTestId(testId);
    expect(card).toHaveAttribute('aria-label', ariaLabel);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<DashboardCard className={customClass}>{testContent}</DashboardCard>);
    expect(container.firstChild).toHaveClass(customClass);
    expect(container.firstChild).toHaveClass(ClassName.DASHBOARD_CARD);
  });

  it('maintains correct styling', () => {
    const { container } = render(<DashboardCard>{testContent}</DashboardCard>);
    const card = container.firstChild as HTMLElement;
    
    expect(card).toHaveStyle({
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'hidden',
      backgroundColor: 'rgb(255, 255, 255)', // $white
    });
  });

  it('applies box shadow correctly', () => {
    const { container } = render(<DashboardCard>{testContent}</DashboardCard>);
    const card = container.firstChild as HTMLElement;
    
    const boxShadow = window.getComputedStyle(card).boxShadow;
    expect(boxShadow).toContain('0px 1px 3px 1px');
    expect(boxShadow).toContain('0px 4px 8px -6px');
    expect(boxShadow).toContain('0px 1px 5px -4px');
    expect(boxShadow).toContain('0px 0px 0px 1px');
    expect(boxShadow).toContain('0px 1px 0px 0px');
  });

  it('handles complex nested content', () => {
    const complexContent = (
      <div data-testid="complex-content">
        <h3>Title</h3>
        <p>Description</p>
        <button>Action</button>
      </div>
    );
    
    render(<DashboardCard>{complexContent}</DashboardCard>);
    const content = screen.getByTestId('complex-content');
    expect(content).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles empty content gracefully', () => {
    const { container } = render(<DashboardCard />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it('maintains layout with different content types', () => {
    const { rerender, container } = render(<DashboardCard>Short text</DashboardCard>);
    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });

    rerender(
      <DashboardCard>
        <div style={{ padding: '20px' }}>
          <h1>Large Content</h1>
          <p>With multiple paragraphs</p>
          <p>And more content</p>
        </div>
      </DashboardCard>
    );
    
    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
  });
});
