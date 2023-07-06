import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Button from '.';

describe('Button', () => {
  it('should render a button with a label', async () => {
    const label = 'Button Label';

    const { getByText, getByRole } = render(<Button>{label}</Button>);

    expect(getByText(label)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });
});
