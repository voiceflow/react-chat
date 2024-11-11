import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FeedbackButton } from '.';

describe('Button', () => {
  it('onClick callback fires properly', async () => {
    const onClick = vi.fn();
    const testID = 'button';
    render(<FeedbackButton onClick={onClick} testID={testID} />);
    screen.getByTestId(`${testID}--positive`).click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
