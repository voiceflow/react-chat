import 'regenerator-runtime/runtime';

import { Head, Html, Main, NextScript } from 'next/document';

import { ChatScript } from '@/components/ChatScript';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <ChatScript projectID="643b0fec8f78850008907e2f" />
    </Html>
  );
}
