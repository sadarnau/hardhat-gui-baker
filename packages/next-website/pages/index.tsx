import { ConnectButton } from "@rainbow-me/rainbowkit";
import FunctionConstant from "./FunctionConstant";
import { ethers, Contract } from "ethers";
import Function from "./Function";
import { ContractAbi, ContractType } from "./ContractContext";

function FList({ contract }: { contract: Contract }) {
  return Object.keys(contract.interface.functions).map((arg) => {
    if (contract.interface.functions[arg].constant)
      return (
        <FunctionConstant key={arg} functionName={arg} contract={contract} />
      );
    return <Function key={arg} functionName={arg} contract={contract} />;
  });
}

export default function Home() {
  const deployedCoin = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    ContractAbi
  ) as ContractType;
  return (
    <div className=" m-5">
      <div className="mt-5">
        <ConnectButton />
      </div>
      <div>
        <FList contract={deployedCoin}></FList>
      </div>
    </div>
  );
}
