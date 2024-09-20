import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Button from '.';

describe('Button', () => {
  it('should render a button with a label', async () => {
    const label = 'Button Label';

    render(<Button>{label}</Button>);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
