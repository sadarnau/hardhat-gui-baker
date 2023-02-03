import { Contract } from "ethers";
import { useState } from "react";
import { ContractAbi } from "./ContractContext";
import Function from "./Function";
import FunctionConstant from "./FunctionConstant";
import ToggleButton from "./ToggleButton";
import { ExtractAbiFunctions } from "abitype";

// TODO : export in a type file
type test = ExtractAbiFunctions<typeof ContractAbi, "nonpayable">["name"];
type test2 = ExtractAbiFunctions<typeof ContractAbi, "view">["name"];

export function FList({ contract }: { contract: Contract }) {
  const [displayConstant, setDisplayConstant] = useState(true);
  const [displayWrite, setDisplayWrite] = useState(true);

  const writeFx = Object.keys(contract.interface.functions).filter((arg) => {
    return !contract.interface.functions[arg].constant;
  });

  const constFx = Object.keys(contract.interface.functions).filter((arg) => {
    return contract.interface.functions[arg].constant;
  });

  const writeComponents = displayWrite
    ? writeFx.map((arg) => (
        <Function key={arg} functionName={arg as test} contract={contract} />
      ))
    : [];
  const constComponents = displayConstant
    ? constFx.map((arg) => (
        <FunctionConstant key={arg} functionName={arg as test2} contract={contract} />
      ))
    : [];

  return (
    <div className="w-full grid grid-cols-2 gap-32">
      {
        <div>
          <ToggleButton
            on={displayWrite}
            setOn={setDisplayWrite}
            message={"Write Functions"}
            style={"input-primary"}
          />
          {writeComponents}
        </div>
      }
      {
        <div>
          <ToggleButton
            on={displayConstant}
            setOn={setDisplayConstant}
            message={"View Functions"}
            style={"input-info"}
          />
          {constComponents}
        </div>
      }
    </div>
  );
}
