import 'regenerator-runtime/runtime';
import '@/styles/globals.css';
import '@voiceflow/chat/dist/style.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ position: 'relative' }}>
      <Component {...pageProps} />
    </div>
  );
}
