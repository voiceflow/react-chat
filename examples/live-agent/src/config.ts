import { AssistantOptions, ChatConfig, ExtensionType } from '@voiceflow/react-chat';

import { AppEmitter } from './emitter';

const IMAGE = 'https://picsum.photos/seed/1/200/300';
const AVATAR = 'https://picsum.photos/seed/1/80/80';

const EXTENSIONS: AssistantOptions['extensions'] = [
  {
    name: 'cart/add',
    type: ExtensionType.EFFECT,
    match: (ctx: { trace: { type: string } }) => ctx.trace.type === 'add_to_cart',
    effect: (ctx) => AppEmitter.emit('addToCart', ctx.trace.payload),
  },
];

export const ASSISTANT: AssistantOptions = AssistantOptions.parse({
  title: 'Live Agent Demo',
  description: 'Demonstration of integrating Voiceflow with Intercom.',
  image: IMAGE,
  avatar: AVATAR,
  extensions: EXTENSIONS,
});

export const CONFIG = ChatConfig.parse({
  verify: { projectID: import.meta.env.VF_PROJECT_ID },
});
