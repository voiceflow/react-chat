# Live Agent Example

## Install Dependencies

```sh
yarn install
```

## Import Example Project

Import this [project with custom actions](example_project.vf) into your Voiceflow workspace.
It includes custom `account_info`, `calendar` and `video` actions.

## Configure Environment

Follow [these instructions](https://developer.voiceflow.com/docs/step-3-deploy-assistant) to publish your Voiceflow Assistant.

Copy the project ID from the Assistant Settings and write it to a `.env.local` file.

```sh
# replace `XXX` with your project ID key
echo 'VF_PROJECT_ID=XXX` > .env.local
```

## Run Dev Server

The demo app will be available locally at <http://127.0.0.1:3006>.

```sh
yarn dev
```

You will also need to run the WebSocket server located in `server/` to interact with Intercom's APIs.
See the [README](server/README.md) for more information.

```sh
yarn dev:server
```

<img width="442" alt="Screenshot 2023-06-12 at 3 53 10 AM" src="https://github.com/voiceflow/demo-react-chat/assets/3784470/417199c3-317f-4722-9b5f-e27fff78d6e8">

## Invoke Custom Actions

### `talk_to_agent`

- "I want to talk to a human"
- "Please connect me to a human"

This will switch the conversation into a mode that emulates talking with a live agent.
New messages will skip the Voiceflow logic and be sent directly to the agent.
You can also end the live conversation and return to talking with the Voiceflow bot.
Make sure to run the server in `./server` with the command `yarn dev`.
