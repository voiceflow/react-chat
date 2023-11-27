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

const safeProtocol = /^(https?|ircs?|mailto|xmpp)$/i;
export function transformURL(value: string): string {
  const colon = value.indexOf(':');
  const questionMark = value.indexOf('?');
  const numberSign = value.indexOf('#');
  const slash = value.indexOf('/');

  if (
    // If there is no protocol, it’s relative.
    colon < 0 ||
    // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    (slash > -1 && colon > slash) ||
    (questionMark > -1 && colon > questionMark) ||
    (numberSign > -1 && colon > numberSign) ||
    // It is a protocol, it should be allowed.
    safeProtocol.test(value.slice(0, colon))
  ) {
    return value;
  }

  return '';
}
