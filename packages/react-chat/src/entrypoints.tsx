// import { RenderMode } from '@/common';
import { RuntimeProvider } from '@/contexts';

// import ChatWidget from '@/views/ChatWidget';
import { styled } from './globals';
// import { ChatWindow } from './views';

interface IEntrypoint {
  config: any;
  assistant: any;
  shadowRoot: any;
  resolve: any;
}

const Styled = styled('div', {
  backgroundColor: 'red',
  width: 20,
  height: 20,
});

export const Entrypoint: React.FC<IEntrypoint> = ({ assistant, config, shadowRoot, resolve }) => {
  return (
    <RuntimeProvider assistant={assistant} config={config} shadowRoot={shadowRoot}>
      <Styled />
      {/* {config.render?.mode === RenderMode.EMBEDDED && <ChatWindow />}
      {config.render?.mode === RenderMode.BUBBLE && <ChatWidget chatAPI={window.voiceflow!.chat} ready={resolve} />} */}
    </RuntimeProvider>
  );
};
