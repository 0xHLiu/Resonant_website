// app/app-page.tsx or pages/app-page.tsx
"use client"

// Update the import path below to the correct relative path for your project structure
import AppPageContent from "@/components/app/page_content"
import {PrivyProvider} from '@privy-io/react-auth';
import {useState} from 'react';
import {useLoginWithEmail} from '@privy-io/react-auth';

export default function AppPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const {sendCode, loginWithCode} = useLoginWithEmail();

  return (

    
    <PrivyProvider 
      appId="cmcp0frno00awla0me4jn6bgt" //"{process.env.APP_ID as string}"
      config={{
      "appearance": {
        "accentColor": "#6A6FF5",
        "theme": "#FFFFFF",
        "showWalletLoginFirst": false,
        "logo": "https://auth.privy.io/logos/privy-logo.png",
        "walletChainType": "ethereum-only",
        "walletList": [
        "detected_ethereum_wallets",
        "metamask",
        "coinbase_wallet",
        "rainbow",
        "wallet_connect"
        ]
      },
      "loginMethods": [
        "wallet",
        "email"
      ],
      "fundingMethodConfig": {
        "moonpay": {
        "useSandbox": true
        }
      },
      "embeddedWallets": {
        "requireUserPasswordOnCreate": false,
        "showWalletUIs": true,
        "ethereum": {
        "createOnLogin": "users-without-wallets"
        },
        "solana": {
        "createOnLogin": "off"
        }
      },
      "mfa": {
        "noPromptOnMfaRequired": false
      }
      }}
    >
      <AppPageContent />
    </PrivyProvider>
  )
}
