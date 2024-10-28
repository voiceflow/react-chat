import type { Text, Trace } from '@voiceflow/base-types';

import CODE_RESPONSE_FIXTURE from '@/__fixtures__/markdown/code-response.md?raw';
import type { MessageProps } from '@/components/SystemResponse';
import { MessageType } from '@/components/SystemResponse/constants';
import { ExtensionType, type ResponseExtension } from '@/dtos/Extension.dto';

// Example text content for Text.SlateTextValue
export const SAMPLE_SLATE_TEXT: Text.SlateTextValue = [{ type: 'paragraph', children: [{ text: 'Hello, world!' }] }];
const sampleTrace: Trace.AnyTrace = { type: 'speak', payload: { message: 'End of conversation.' } } as Trace.AnyTrace;
const sampleExtension: ResponseExtension = {
  name: 'SampleExtension',
  type: ExtensionType.RESPONSE,
  match(): boolean {
    throw new Error('Function not implemented.');
  },
};

export const textMessageFixture: MessageProps[] = [
  {
    type: MessageType.TEXT,
    text: SAMPLE_SLATE_TEXT,
    delay: 500,
    ai: true,
  },
];

export const codeMessageFixture: MessageProps[] = [
  {
    type: MessageType.TEXT,
    text: CODE_RESPONSE_FIXTURE,
    delay: 500,
    ai: true,
  },
];

export const imageMessageFixture: MessageProps = {
  type: MessageType.IMAGE,
  url: 'https://example.com/image.png',
  delay: 200,
  ai: false,
};

export const cardMessageFixture: MessageProps = {
  type: MessageType.CARD,
  title: 'Sample Card Title',
  description: 'Sample Subtitle',
  image: 'https://example.com/card-image.png',
  delay: 300,
  ai: true,
};

export const carouselMessageFixture: MessageProps = {
  type: MessageType.CAROUSEL,
  cards: [
    {
      title: 'Card 1',
      description: 'First Card in Carousel',
      image: 'https://example.com/card1.png',
    },
    {
      title: 'Card 2',
      description: 'Second Card in Carousel',
      image: 'https://example.com/card2.png',
    },
  ],
  delay: 400,
  ai: false,
};

export const endMessageFixture: MessageProps = {
  type: MessageType.END,
  delay: 100,
  ai: true,
};

export const extensionMessageFixture: MessageProps = {
  type: MessageType.EXTENSION,
  payload: {
    trace: sampleTrace,
    extension: sampleExtension,
  },
  delay: 500,
  ai: true,
};

export const customMessageFixture: MessageProps = {
  type: 'custom_greeting',
  payload: {
    greeting: 'Hello, custom world!',
  },
  delay: 600,
  ai: true,
};
