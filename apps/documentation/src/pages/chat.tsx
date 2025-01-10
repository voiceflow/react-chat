import 'regenerator-runtime/runtime';

import { ChatScript } from '@/components/ChatScript';

import ProactiveMessage, { sendButtonStyle } from './ProactiveMessage';

export const getServerSideProps = async (context: any) => ({
  // will be passed to the page component as props.
  props: {
    projectID: context.query.projectID,
    embedded: !!context.query.embed,
  },
});

export default function ChatPage(props: any) {
  const hideChat = () => {
    (window as any).voiceflow.chat.hide();
  };

  const showChat = () => {
    (window as any).voiceflow.chat.show();
  };

  return (
    <>
      <div style={{ height: '100vh', padding: '30px', gap: '10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative' }}>
          You can switch projects by changing the URL `projectID=...`
          {props.projectID && <ChatScript {...props} />}
        </div>
        <ProactiveMessage />

        <div>
          <div style={{ display: 'flex', gap: '10px' }}>
            Chat Controls
            <button style={sendButtonStyle} onClick={hideChat} type="button">
              Hide Chat
            </button>
            <button style={sendButtonStyle} onClick={showChat} type="button">
              Show Chat
            </button>
          </div>
        </div>

        <div style={{ width: '600px', height: '100%', margin: '0 auto' }} id="chat_embed"></div>
      </div>
    </>
  );
}
