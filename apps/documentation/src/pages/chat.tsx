import 'regenerator-runtime/runtime';

import { ChatScript } from '@/components/ChatScript';

export const getServerSideProps = async (context: any) => ({
  props: { projectID: context.query.projectID }, // will be passed to the page component as props
});

export default function ChatPage(props: any) {
  return (
    <div style={{ position: 'relative' }}>
      You can switch projects by changing the URL `projectID=...`
      {props.projectID && <ChatScript projectID={props.projectID} />}
    </div>
  );
}
