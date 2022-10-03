# React Chat

A `react`-based chat widget built to interact seamlessly with Voiceflow's runtime.

## Installation

```sh
yarn add @voiceflow/react-chat
# or
npm install @voiceflow/react-chat
```

## Options

```ts
interface Option {
  /**
   * the ID of your voiceflow project, the project must have `apiPrivacy: public`
   * find this under integrations tab
   */
  projectID: string;

  /**
   * basic assistant information
   */
  assistant: {
    name: string;
    description: string;
    image: string;
  };

  /**
   * [optional] userID to track users and persist/continue sessions
   */
  userID?: string;

  /**
   * [optional] the version ID of your project, defaults to 'development'
   * can be a 'development' or 'production' alias or a specific versionID
   */
  versionID?: string;

  /**
   * [optional] voiceflow dialog management runtime endpoint
   * defaults to https://general-runtime.voiceflow.com
   */
  url?: string;
}
```

## React Usage

You can import the widget directly within your `react` codebase and add it to your render tree.

```tsx
import { ChatWidget } from '@voiceflow/react-chat';

const VERSION_ID = 'abc123';
const API_KEY = 'VF.DM.xxx123';

const assistant = {
  name: 'My Assistant',
  description: "It's your friendly, neighborhood chat assistant!",
  image: 'https://source.unsplash.com/random/72x72',
};

// add the chat widget near the root of your render tree
const App = () => {
  return (
    <main>
      <p>Welcome</p>

      <ChatWidget assistant={assistant} versionID={VERSION_ID} authorization={API_KEY} />
    </main>
  );
};
```

## Browser Usage

You can use a simple JavaScript snippet to add the chat widget to any HTML page.

```html
<html>
  <body>
    <p>Welcome</p>

    <script src="https://unpkg.com/@voiceflow/react-chat/dist/bundle.mjs"></script>
    <script>
      vf.chat.show({
        projectID: 'XXXXXXX.....',
        assistant: {
          name: 'My Assistant',
          description: "It's your friendly, neighborhood chat assistant!",
          image: 'https://source.unsplash.com/random/72x72',
        },
      });
    </script>
  </body>
</html>
```

### Browser API

When the `react-chat` script is loaded it will register an API as `window.vf.chat`.
It has the following interface:

```ts
interface VFChatAPI {
  /**
   * render the widget
   */
  show: (options: Options) => void;

  /**
   * unmount the widget
   */
  hide: () => void;
}
```
