import { useEffect } from 'react';

export const ChatScript = ({ projectID, embedded = false }: { projectID: string; embedded?: boolean }) => {
  if (!projectID) {
    return null;
  }

  const loadScript = `
    (function (d, t) {
      const v = d.createElement(t);
      const s = d.getElementsByTagName(t)[0];
      v.onload = function () {
        window.voiceflow.chat.load({
          url: 'https://general-runtime-review-new-widget.us-2.development.voiceflow.com',
          verify: { projectID: "${projectID}"  },
          versionID: 'production'
          ${embedded ? ', render: { mode: "embedded", target: document.getElementById("chat_embed") }' : ''}
        });
      };
      v.src = '../../bundle/bundle.mjs';
      v.type = 'text/javascript';
      s.parentNode.insertBefore(v, s);
    })(document, 'script');
  `;

  useEffect(() => {
    const script = document.createElement('script');
    script.text = loadScript;
    document.getElementsByTagName('head')[0].appendChild(script);
  }, []);

  return null;
};
