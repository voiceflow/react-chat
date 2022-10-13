# React Chat

A `react`-based chat widget built to interact seamlessly with Voiceflow's runtime.

## Installation

```sh
yarn add @voiceflow/react-chat
# or
npm install @voiceflow/react-chat
```

## Configuration

```ts
interface Configuration {
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

## Browser Usage

You can use a simple JavaScript snippet to add the chat widget to any HTML page.

```html
<script>
  window.voiceflowChatConfig = {
    projectID: 'XXXXXXX.....',
    assistant: {
      name: 'My Assistant',
      description: "It's your friendly, neighborhood chat assistant!",
      image: 'https://source.unsplash.com/random/72x72',
    },
  };
</script>
<script src="https://unpkg.com/@voiceflow/react-chat/iframe/dist/bundle.mjs"></script>
```

### Browser API

When the `react-chat` script is loaded it will register an API as `window.voiceflow.chat`.
It has the following interface:

```ts
interface VoiceflowAPI {
  // open the chat
  open: () => void;

  // close the chat
  close: () => void;

  // hide the chat + button
  hide: () => void;

  // show the chat + button
  show: () => void;

  // (re)load the chat
  // chat will not be visible by default if `window.voiceflowChatConfig` not set
  load: (config: Configuration) => void;
}
```

Example:

```ts
window.voiceflow.chat.show();
```
