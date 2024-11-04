import '@/styles/globals.css';
import '@voiceflow/chat/dist/style.css';

import type { AppProps } from 'next/app';

import { ChatScript } from '@/components/ChatScript';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ position: 'relative' }}>
      <ChatScript />
      <Component {...pageProps} />
    </div>
  );
}
