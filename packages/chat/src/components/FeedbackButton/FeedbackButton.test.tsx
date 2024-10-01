import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RuntimeProvider } from '@/contexts';

import { FeedbackButton } from './FeedbackButton.component';

describe('Button', () => {
  it('onClick callback fires properly', async () => {
    const onClick = vi.fn();
    const MOCK_CONFIG = { render: { mode: 'embedded' }, verify: { projectID: ' ' } } as any;

    render(
      <RuntimeProvider config={MOCK_CONFIG} assistant={{ persistence: {}, extensions: [], color: 'blue' } as any}>
        <FeedbackButton onClick={onClick} />
      </RuntimeProvider>
    );
    screen.getByRole('button').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
