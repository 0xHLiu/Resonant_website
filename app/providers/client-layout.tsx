'use client';

import { ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId="cmcp0frno00awla0me4jn6bgt"//{process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ['wallet', 'email'],
        appearance: { theme: 'light' },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
