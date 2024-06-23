import { type BaseRequest, isTextRequest } from '@voiceflow/dtos';

import type { SystemTurnProps, TurnProps } from '@/types';
import { TurnType } from '@/types';

export const getLastSystemTurn = (turns: TurnProps[]): SystemTurnProps | null => {
  for (let i = turns.length - 1; i >= 0; i--) {
    const turn = turns[i];
    if (turn.type === TurnType.SYSTEM) return turn;
  }

  return null;
};

const stringFuzzyEquals = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

// resolve the action that the user should take, based on pass turns as input
export const resolveAction = (action: BaseRequest, turns: TurnProps[]): BaseRequest => {
  if (isTextRequest(action)) {
    /// if the system has suggested actions, match action name against the user text request
    const systemTurn = getLastSystemTurn(turns);
    const matchedAction = systemTurn?.actions?.find((a) => stringFuzzyEquals(a.name, action.payload))?.request;
    if (matchedAction) return matchedAction;
  }

  return action;
};
