import { BaseRequest } from '@voiceflow/base-types';
import type { RuntimeAction } from '@voiceflow/sdk-runtime';

import { openURLInANewTab } from '@/utils/url';

const hasActions = (action: RuntimeAction): action is BaseRequest.ActionRequest =>
  !!action.payload &&
  typeof action.payload === 'object' &&
  Array.isArray((action.payload as Record<string, unknown>).actions);

export const handleActions = (action: RuntimeAction) => {
  if (hasActions(action)) {
    action.payload.actions?.forEach((action) => {
      if (BaseRequest.Action.isOpenURLAction(action) && action.payload.url) {
        openURLInANewTab(action.payload.url);
      }
    });
  }
};
