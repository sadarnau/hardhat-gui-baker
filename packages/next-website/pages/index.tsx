import { ConnectButton } from "@rainbow-me/rainbowkit";
import FunctionConstant from "./FunctionConstant";

import { ethers, Contract } from "ethers";
import Function from "./Function";
import { ContractAbi, ContractType } from "./ContractContext";
import { useState } from "react";
import ToggleButton from "./ToggleButton";

function FList({
  contract,
  displayConstant,
  displayWrite,
}: {
  contract: Contract;
  displayConstant: boolean;
  displayWrite: boolean;
}) {
  const writeFx = Object.keys(contract.interface.functions).filter((arg) => {
    return !contract.interface.functions[arg].constant;
  });

  const constFx = Object.keys(contract.interface.functions).filter((arg) => {
    return contract.interface.functions[arg].constant;
  });

  const writeComponents = displayWrite
    ? writeFx.map((arg) => (
        <Function key={arg} functionName={arg} contract={contract} />
      ))
    : [];
  const constComponents = displayConstant
    ? constFx.map((arg) => (
        <FunctionConstant key={arg} functionName={arg} contract={contract} />
      ))
    : [];

  if (writeComponents.length > 0)
    return writeComponents.concat(constComponents);
  return constComponents;
}

export default function Home() {
  const [displayConstant, setDisplayConstant] = useState(true);
  const [displayWrite, setDisplayWrite] = useState(true);
  const deployedCoin = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    ContractAbi
  ) as ContractType;
  return (
    <div className="m-5">
      <div className="mt-5">
        <ConnectButton />
      </div>
      {/* <button
        onClick={() => setDisplayConstant(!displayConstant)}
        className={`mr-2 min-h-8 btn btn-outline input-xs input-primary border-2 h-6 ${
          displayConstant ? "input-info" : "input-secondary bg-secondary"
        }`}
      >
        Constant Functions
      </button> */}
      <ToggleButton
        on={displayWrite}
        setOn={setDisplayWrite}
        message={"Write Functions"}
        color={"input-primary"}
      />
      <ToggleButton
        on={displayConstant}
        setOn={setDisplayConstant}
        message={"Constant Functions"}
        color={"input-info"}
      />
      <div>
        <FList
          contract={deployedCoin}
          displayConstant={displayConstant}
          displayWrite={displayWrite}
        ></FList>
      </div>
    </div>
  );
}
