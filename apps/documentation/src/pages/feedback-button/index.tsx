import { RuntimeProvider } from '@voiceflow/chat';
import { FeedbackButton } from '@voiceflow/chat/ui';

export default function FeedbackButtonPage() {
  return (
    <div>
      howdy folks
      <VariantRenderer title="Base" />
      <VariantRenderer title="Active state" active={true} />
    </div>
  );
}

const THEME_FIXTURE = ['#A3E4D7', '#F1948A', '#85C1E9', '#F7DC6F', '#BB8FCE', 'green', 'black', 'yellow', 'purple'];

const MOCK_CONFIG = { render: { mode: 'embedded' }, verify: { projectID: ' ' } } as any;

const VariantRenderer = ({ title, active }: { title: string; active?: boolean }) => {
  return (
    <>
      <h1>{title}</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        {THEME_FIXTURE.map((color, index) => (
          <RuntimeProvider config={MOCK_CONFIG} assistant={{ persistence: {}, extensions: [], color } as any}>
            <FeedbackButton
              variant={index % 2 === 0 ? 'up' : 'down'}
              active={active}
              key={index}
              onClick={() => null}
              testID={`feedback-button--${index}`}
            />
          </RuntimeProvider>
        ))}
      </div>
    </>
  );
};
