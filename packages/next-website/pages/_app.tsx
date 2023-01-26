import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectButton, connectorsForWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  ledgerWallet,
  braveWallet,
  metaMaskWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID })
    jsonRpcProvider({
      rpc: () => ({
        http: `http://127.0.0.1:8545/`,
      }),
    }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
  {
    groupName: "Other",
    wallets: [
      rainbowWallet({ chains }),
      coinbaseWallet({ appName: "Frontify", chains }),
      braveWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
