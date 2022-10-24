import React from "react";
import CoinInterface from "./artifacts/contracts/test.sol/Coin.json";
import { Coin } from "./typechain-types";
import { Contract, ethers } from "ethers";
import Function from "./Function";

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  chain,
} from "wagmi";

import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Profile } from "./Profile";

function parseFunctions(contract: Contract) {
  const functions = contract.interface.functions;
  const functionList = [];

  for (const func in functions) {
    functionList.push(Function({ contract, functionName: func }));
    // for (const input of functions[func].inputs) {
    //   console.log(input);
    // }
  }
  return functionList;
}

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `http://127.0.0.1:8545/`,
      }),
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  // webSocketProvider,
});

function App() {
  const deployedCoin: Coin = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    CoinInterface.abi
  ) as Coin;
  // const functionsList = parseFunctions(deployedCoin);

  return (
    <WagmiConfig client={client}>
      {/* <Profile /> */}
      <Function contract={deployedCoin} functionName="balances(address)" />
    </WagmiConfig>
  );
}

export default App;
