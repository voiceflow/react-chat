export const ChatScript = ({ projectID }: { projectID: string }) => {
  if (!projectID) {
    return null;
  }
  return (
    <div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
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
            `,
        }}
      />
    </div>
  );
};
