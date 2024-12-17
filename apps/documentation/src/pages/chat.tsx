import 'regenerator-runtime/runtime';

import { ChatScript } from '@/components/ChatScript';

import ProactiveMessage from './ProactiveMessage';

export const getServerSideProps = async (context: any) => ({
  // will be passed to the page component as props
  props: {
    projectID: context.query.projectID,
    embedded: !!context.query.embed,
  },
});

export default function ChatPage(props: any) {
  return (
    <>
      <div style={{ height: '100vh', padding: '30px' }}>
        <div style={{ position: 'relative' }}>
          You can switch projects by changing the URL `projectID=...`
          {props.projectID && <ChatScript {...props} />}
        </div>
        <ProactiveMessage />

        <div style={{ width: '600px', height: '100%', margin: '0 auto' }} id="chat_embed"></div>
      </div>
    </>
  );
}
