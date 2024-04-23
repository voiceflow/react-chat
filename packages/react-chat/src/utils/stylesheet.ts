import { useEffect, useState } from 'react';

import type { AssistantOptions } from '@/dtos/AssistantOptions.dto';

// used to add stylesheets dynamically, resolves when loaded
export const addStyleSheetURL = async (url: string, root: Node) => {
  const link = document.createElement('link');
  const load = new Promise((resolve, reject) => {
    link.onload = resolve;
    link.onerror = reject;
  });

  link.rel = 'stylesheet';
  link.href = url;
  root.appendChild(link);

  await load;
};

// do not load until stylesheet is resolved
export const useResolveAssistantStyleSheet = (assistant?: AssistantOptions, shadowRoot?: ShadowRoot): boolean => {
  const [isStyleSheetResolved, setStyleSheetResolved] = useState(false);

  useEffect(() => {
    if (!assistant || isStyleSheetResolved) return;

    if (!assistant.stylesheet) {
      setStyleSheetResolved(true);
      return;
    }

    const stylesheet = Array.isArray(assistant.stylesheet) ? assistant.stylesheet[0] : assistant.stylesheet;

    // inject stylesheet url
    (async () => {
      await addStyleSheetURL(stylesheet, shadowRoot ?? document.head).catch((error) => {
        console.error(`failed to load stylesheet: ${assistant.stylesheet}`);
        console.error(error);
      });
      setStyleSheetResolved(true);
    })();
  }, [assistant]);

  return isStyleSheetResolved;
};
