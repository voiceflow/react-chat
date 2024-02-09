import { useContext } from 'react';

import { Assistant } from '@/common/types';
import { RuntimeStateContext } from '@/contexts/RuntimeContext';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';

export const useLoadCustomTheme = (assistant: Assistant) => {
  const { shadowRoot } = useContext(RuntimeStateContext);
  return useResolveAssistantStyleSheet(assistant, shadowRoot);
};
