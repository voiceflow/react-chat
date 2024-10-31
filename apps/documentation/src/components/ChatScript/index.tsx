import React, { useEffect } from 'react';

export const ChatScript = ({ projectID }: { projectID: string }) => {
  useEffect(() => {
    // Clean up old script tags if any exist
    const oldScript = document.getElementById('voiceflow-chat-script');
    if (oldScript) {
      oldScript.remove();
    }

    // Create a new script tag with the updated projectID
    const script = document.createElement('script');
    script.id = 'voiceflow-chat-script';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      (function (d, t) {
        const v = d.createElement(t);
        const s = d.getElementsByTagName(t)[0];
        v.onload = function () {
          window.voiceflow.chat.load({
            verify: { projectID: "${projectID}"  },
             assistant: {
              stylesheet: '../../dist/style.css',
            }
           });
        };
        v.src = '../../dist/bundle.mjs';
        v.type = 'text/javascript';
        s.parentNode.insertBefore(v, s);
      })(document, 'script');
    `;

    document.body.appendChild(script);

    // Optional: Clean up when component unmounts
    return () => {
      script.remove();
    };
  }, [projectID]); // Runs whenever projectID changes

  return <div />;
};
