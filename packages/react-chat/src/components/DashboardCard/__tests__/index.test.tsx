import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DashboardCard from '..';

describe('DashboardCard', () => {
  it('should render children correctly', () => {
    const testContent = 'Test Content';
    const { getByText } = render(<DashboardCard>{testContent}</DashboardCard>);
    expect(getByText(testContent)).toBeDefined();
  });

  it('should pass through additional props', () => {
    const testId = 'test-dashboard-card';
    const { container } = render(<DashboardCard data-testid={testId} />);
    expect(container.querySelector(`[data-testid="${testId}"]`)).toBeDefined();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<DashboardCard className={customClass} />);
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('should maintain correct styling', () => {
    const { container } = render(<DashboardCard />);
    const card = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(card);
    
    expect(styles.borderRadius).toBe('6px');
    expect(styles.display).toBe('flex');
    expect(styles.flexDirection).toBe('column');
    expect(styles.boxSizing).toBe('border-box');
    expect(styles.overflow).toBe('hidden');
  });
});
