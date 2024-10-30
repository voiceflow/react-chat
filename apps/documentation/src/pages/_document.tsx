import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
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
                     assistant: {
                      stylesheet: '/dist/style.css',
                    }
                   });
                };
                v.src = '/dist/bundle.mjs';
                v.type = 'text/javascript';
                s.parentNode.insertBefore(v, s);
              })(document, 'script');
            `,
        }}
      />
    </Html>
  );
}
