# Live Agent Example

## Install Dependencies

```sh
yarn install
```

## Import Example Project

Import this [project with custom actions](example_project.vf) into your Voiceflow workspace.
It includes custom `account_info`, `calendar` and `video` actions.

## Configure Environment

Follow [these instructions](https://developer.voiceflow.com/reference/project#obtaining-a-dialog-manager-api-key)
to get the Dialog API key for your Voiceflow project.

Write your API key to a `.env.local` file.

```sh
# replace `XXX` with your API key
echo 'VF_DM_API_KEY=XXX` > .env.local
```

### 🛑 NOT PRODUCTION SAFE 🛑

This setup is **NOT** the recommended way of authenticating a Web Chat project with the Voiceflow Dialog API.
Using the API key in the browser exposes it to the user and could allow them to make unauthorized requests to the API.

For a production-ready setup, you should publish your Voiceflow assistant and update the options passed to the `useRuntime` hook. You can find your assistant's `projectID` in the code example on the Web Chat Integration page.
[See our docs](https://developer.voiceflow.com/docs/chat-widget) for more information.

```ts
useRuntime({
  verify: { projectID: 'XXX' },
  versionID: 'production',

  // the rest of your options can stay the same
});
```

## Run Dev Server

The demo app will be available locally at <http://127.0.0.1:3006>.

```sh
yarn dev
```

<img width="442" alt="Screenshot 2023-06-12 at 3 53 10 AM" src="https://github.com/voiceflow/demo-react-chat/assets/3784470/417199c3-317f-4722-9b5f-e27fff78d6e8">

## Live Agent Handoff

To demo this functionality you will need to run a local WebSocket server that will interface with the live agent platform.
The `server/` directory contains a sample server with some basic integrations.
See the [README](server/README.md) for more information.

## Invoke Custom Actions

### `account_info`

- "What is my account status?"
- "Can I check my account?"
- "What is the status of my account?"

This will re-use our existing text messages to display a message with the user's account information.
The `created_at` date is rendered with the locale-appropriate date format.

### `calendar`

- "Can I book an appointment?"
- "I want to schedule a meeting"

This will re-use our existing text messages to display a message with the user's account information.
The `created_at` date is rendered with the locale-appropriate date format.

### `video`

- "What services to you offer?"
- "Give me a list of services you provide"
- "What do you offer?"

This will re-use our existing text messages to display a message with the user's account information.
The `created_at` date is rendered with the locale-appropriate date format.

### `talk_to_agent`

- "I want to talk to a human"
- "Please connect me to a human"

This will switch the conversation into a mode that emulates talking with a live agent.
New messages will skip the Voiceflow logic and be sent directly to the agent.
You can also end the live conversation and return to talking with the Voiceflow bot.
Make sure to run the server in `./server` with the command `yarn dev`.

### `plugin:tetris`

- "Open tetris"
- "Launch tetris"

This will display an embedded `<iframe>` pointed at `https://tetris.com/`.
It is meant to showcase how you can distribute "plugin" scripts that dynamically add functionality to the widget.
Make sure to build the plugin in `./plugin` with the command `yarn build`.
