// import { RenderMode } from '@/common';
// import { RuntimeProvider } from '@/contexts';

// import { ChatWidget, ChatWindowStandaloneView } from './views';

interface IEntrypoint {
  config: any;
  assistant: any;
  shadowRoot: any;
  resolve: any;
}

export const Entrypoint: React.FC<IEntrypoint> = () => {
  return (
    <>div</>
    // <RuntimeProvider assistant={assistant} config={config} shadowRoot={shadowRoot}>
    //   {config.render?.mode === RenderMode.EMBEDDED && <ChatWindowStandaloneView chatAPI={window.voiceflow!.chat} ready={resolve} />}
    //   {config.render?.mode === RenderMode.BUBBLE && <ChatWidget chatAPI={window.voiceflow!.chat} ready={resolve} />}
    // </RuntimeProvider>
  );
};
