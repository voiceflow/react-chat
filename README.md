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
   * the API key for your project
   */
  authorization: string;

  /**
   * [optional] userID to allow users to continue a session
   */
  userID?: string;

  /**
   * [optional] the version ID of your project (appears in the URL)
   * can also be 'development' or 'production'
   */
  versionID?: string;

  /**
   * basic assistant information
   */
  assistant: {
    name: string;
    description: string;
    image: string;
  };
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
        assistant: {
          name: 'My Assistant',
          description: "It's your friendly, neighborhood chat assistant!",
          image: 'https://source.unsplash.com/random/72x72',
        },
        authorization: 'VF.DM.xxx123',
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
