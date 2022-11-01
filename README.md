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
  verify: {
    /**
     * the ID of your voiceflow project, the project must have `apiPrivacy: public`
     * find this under integrations tab
     */
    projectID: string;
  };

  /**
   * [optional] userID to track users and persist/continue sessions
   */
  userID?: string;

  /**
   * [optional] user metadata for transcripts
   */
  user?: {
    name?: string;
    image?: string;
  };

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

  /**
   * [optional] override configured assistant definitions on integrations tab
   */
  assistant?: {
    title?: string;
    description?: string;
    image?: string;
    color?: string;
  };
}
```

## Browser Usage

You can use a simple JavaScript snippet to add the chat widget to any HTML page.
Ensure that the `verify: { projectID: ... }` field is replaced with your Voiceflow projectID.

```html
<script type="text/javascript">
  (function (d, t) {
    var v = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
    v.onload = function () {
      window.voiceflow.chat.load({
        verify: { projectID: "XXXXXX..." },
      });
    };
    v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    v.type = "text/javascript";
    s.parentNode.insertBefore(v, s);
  })(document, "script");
</script>
```

### Browser API

When the `react-chat` script is loaded it will register an API as `window.voiceflow.chat`.
It has the following interface:

```ts
interface VoiceflowAPI {
  // (re)load the chat
  // chat will not be visible until called
  load: (config: Configuration) => void;

  // open the chat
  open: () => void;

  // close the chat
  close: () => void;

  // hide the chat + button
  hide: () => void;

  // show the chat + button
  show: () => void;

  // send custom interaction to voiceflow
  interact: (action: RuntimeAction) => void;
}
```

Example call:

```ts
window.voiceflow.chat.show();
```
