import React from "react";
import CoinInterface from "./artifacts/contracts/test.sol/Coin.json";
import { Coin } from "./typechain-types";
import { Contract, ethers } from "ethers";
import Function from "./Function";

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

function App() {
  const deployedCoin: Coin = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    CoinInterface.abi
  ) as Coin;
  const functionsList = parseFunctions(deployedCoin);

  return <div>{functionsList}</div>;
}

export default App;
