export const slateMessage = (text: string) => ({
  type: 'text',
  payload: {
    slate: {
      id: text,
      content: [{ children: [{ text }] }],
      messageDelayMilliseconds: 100,
    },
    message: text,
    delay: 100,
  },
});
