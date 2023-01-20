import { ContractAbi, ContractType } from "./ContractContext";
import { ethers, Contract } from "ethers";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  useContract,
} from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { ConnectButton, connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Function from "./Function";
import FunctionConstant from "./FunctionConstant";
import { QueryClient, QueryClientProvider } from "react-query";

const { chains, provider } = configureChains(defaultChains, [
  // alchemyProvider({ apiKey: "yourAlchemyApiKey" }),
  jsonRpcProvider({
    rpc: () => ({
      http: `http://127.0.0.1:8545/`,
    }),
  }),
]);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function FList({ contract }: { contract: Contract }) {
  return Object.keys(contract.interface.functions).map((arg) => {
    if (contract.interface.functions[arg].constant)
      return (
        <FunctionConstant key={arg} functionName={arg} contract={contract} />
      );
    else return <Function key={arg} functionName={arg} contract={contract} />;
  });
}

function App() {
  const client = new QueryClient();
  const deployedCoin = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    ContractAbi
  ) as ContractType;
  const tok = useContract({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: ContractAbi,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <ConnectButton label="Connect a wallet" />
          <div>
            <FList contract={deployedCoin}></FList>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default App;
