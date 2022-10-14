import React, { ReactNode } from "react";
import test from "./artifacts/contracts/test.sol/Coin.json";

function App() {
  // console.log(test.abi);
  const test2 = test.abi as { name: string }[];

  return <div>{test2.forEach((abis) => abis.name!)}</div>;
}

export default App;
