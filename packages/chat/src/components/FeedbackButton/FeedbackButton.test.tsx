import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FeedbackButton } from '.';

describe('Button', () => {
  it('onClick callback fires properly', async () => {
    const onClick = vi.fn();

    render(<FeedbackButton onClick={onClick} />);
    screen.getByRole('button').click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
