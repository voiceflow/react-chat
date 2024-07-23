# Live Agent Example

## Install Dependencies

```sh
yarn install
```

## Import Example Project

Import this [project with custom actions](example_project.vf) into your Voiceflow workspace.
It includes custom `account_info`, `calendar` and `video` actions.

## Configure Environment

Follow [these instructions](https://docs.voiceflow.com/docs/publishing-environments-backups) to publish your Voiceflow Assistant.

Copy the project ID from the Assistant Settings and write it to a `.env.local` file.

```sh
# replace `XXX` with your project ID key
echo 'VF_PROJECT_ID=XXX` > .env.local
```

## Run Dev Server

The demo app will be available locally at <http://127.0.0.1:3006>.

This will also start the WebSocket server located in `server/` to interact with Intercom's APIs.
See the [README](server/README.md) for more information.

For convenience you can run both the chat widget and the WebSocket server at the same time with this command.

```sh
yarn dev
```

<img width="405" alt="Screenshot 2024-04-03 at 12 32 06" src="https://github.com/voiceflow/react-chat/assets/3784470/0674b429-fe12-4e73-8e65-a0d40200ee3a">

## Invoke Custom Actions

### `talk_to_agent`

- "I want to talk to a human"
- "Please connect me to a human"

This will switch the conversation into a mode that emulates talking with a live agent.
New messages will skip the Voiceflow logic and be sent directly to the agent.
You can also end the live conversation and return to talking with the Voiceflow bot.
Make sure to run the server in `./server` with the command `yarn dev`.
