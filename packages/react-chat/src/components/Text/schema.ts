import { defaultSchema } from 'rehype-sanitize';

const mediaAttributes = ['controls', 'src', 'type', 'autoPlay', 'loop', 'muted', 'playsInline', 'poster'];

export const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    video: mediaAttributes,
    audio: mediaAttributes,
    '*': [...defaultSchema.attributes!['*'], 'style'],
  },
  protocols: {
    ...defaultSchema.protocols,
    poster: ['https'],
  },
  tagNames: [...defaultSchema.tagNames!, 'video', 'audio'],
};
