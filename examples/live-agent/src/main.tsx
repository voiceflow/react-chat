import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { ChatWidget } from '@voiceflow/react-chat';
import { createRoot } from 'react-dom/client';

import { Cart } from './components/Cart';
import { RuntimeProvider } from './context';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VF_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <SignedOut>
      <SignInButton />
      <SignUpButton />
    </SignedOut>
    <SignedIn>
      <RuntimeProvider>
        <ChatWidget chatAPI={undefined} />
        <Cart />
      </RuntimeProvider>
    </SignedIn>
  </ClerkProvider>
);
