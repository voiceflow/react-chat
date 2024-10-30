import '@/styles/globals.css';
import '@voiceflow/chat/dist/style.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function (d, t) {
                const v = d.createElement(t);
                const s = d.getElementsByTagName(t)[0];
                v.onload = function () {
                  window.voiceflow.chat.load({
                    verify: { projectID: '643b0fec8f78850008907e2f' },
                    render: { mode: 'overlay' },
                    assistant: {
                      stylesheet: '/bundle/style.css',
                    }
                   });
                };
                v.src = '/bundle/bundle.mjs';
                v.type = 'text/javascript';
                s.parentNode.insertBefore(v, s);
              })(document, 'script');
            `,
          }}
        />
      </Head>

      <Component {...pageProps} />
    </div>
  );
}
