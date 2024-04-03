import { AssistantOptions, ChatConfig } from '@voiceflow/react-chat';

const IMAGE = 'https://picsum.photos/seed/1/200/300';
const AVATAR = 'https://picsum.photos/seed/1/80/80';

export const ASSISTANT: AssistantOptions = AssistantOptions.parse({
  title: 'Live Agent Demo',
  description: 'Demonstration of integrating Voiceflow with Intercom.',
  image: IMAGE,
  avatar: AVATAR,
});

export const CONFIG = ChatConfig.parse({
  verify: { projectID: import.meta.env.VF_PROJECT_ID },
});
