import '@/styles/globals.css';

import { Button } from '@voiceflow/ui/next';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { DismissableLayersGlobalProvider } from 'react-dismissable-layers';

export default function App({ Component, pageProps }: AppProps) {
  const [active, setActive] = useState(0);

  return (
    <DismissableLayersGlobalProvider>
      <div>
        <Button label="howdy" />
        <Component {...pageProps} />
      </div>
    </DismissableLayersGlobalProvider>
  );
}
