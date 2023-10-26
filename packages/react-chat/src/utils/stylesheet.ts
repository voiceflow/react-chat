/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import { Assistant } from '@/common';

// used to add stylesheets dynamically, resolves when loaded
export const addStyleSheetURL = async (url: string) => {
  const link = document.createElement('link');
  const load = new Promise((resolve, reject) => {
    link.onload = resolve;
    link.onerror = reject;
  });

  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);

  await load;
};

// do not load until stylesheet is resolved
export const useResolveAssistantStyleSheet = (assistant?: Assistant): boolean => {
  const [isStyleSheetResolved, setStyleSheetResolved] = useState(false);

  useEffect(() => {
    if (!assistant || isStyleSheetResolved) return;

    if (!assistant.stylesheet) {
      setStyleSheetResolved(true);
      return;
    }

    // inject stylesheet url
    (async () => {
      await addStyleSheetURL(assistant.stylesheet!).catch((error) => {
        console.error(`failed to load stylesheet: ${assistant.stylesheet}`);
        console.error(error);
      });
      setStyleSheetResolved(true);
    })();
  }, [assistant]);

  return isStyleSheetResolved;
};
