import Head from 'next/head';

export const ChatEmbedded = ({ projectID }: { projectID: string }) => {
  if (!projectID) {
    return null;
  }

  const script = `
    (function (d, t) {
      const v = d.createElement(t);
      const s = d.getElementsByTagName(t)[0];
      v.onload = function () {
        window.voiceflow.chat.load({
          verify: { projectID: "${projectID}"  },
            assistant: {
            stylesheet: '../../bundle/style.css',
          }
        });
      };
      v.src = '../../bundle/bundle.mjs';
      v.type = 'text/javascript';
      s.parentNode.insertBefore(v, s);
    })(document, 'script');
  `;

  return (
    <Head>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: script,
        }}
      />
    </Head>
  );
};
