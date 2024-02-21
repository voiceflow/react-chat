import { useContext } from 'react';

import { RuntimeStateContext } from '@/contexts/RuntimeContext';
import { AssistantOptions } from '@/dtos/AssistantOptions.dto';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';

export const useLoadCustomTheme = (assistant: AssistantOptions) => {
  const { shadowRoot } = useContext(RuntimeStateContext);
  return useResolveAssistantStyleSheet(assistant, shadowRoot);
};
