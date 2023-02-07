import { Contract } from "ethers";
import { useState } from "react";
import { ConstFuncType, FuncType } from "../types/ContractTypes";
import Function from "./Function";
import FunctionConstant from "./FunctionConstant";
import ToggleButton from "./ToggleButton";

type Props = {
  contract: Contract;
  contractAbi: any;
};

// TODO : change any
export function FuncList({ contract, contractAbi }: Props) {
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
        <Function
          key={arg}
          functionName={arg as FuncType}
          contract={contract}
          abi={contractAbi}
        />
      ))
    : [];
  const constComponents = displayConstant
    ? constFx.map((arg) => (
        <FunctionConstant
          key={arg}
          functionName={arg as ConstFuncType}
          contract={contract}
          abi={contractAbi}
        />
      ))
    : [];

  return (
    <div className="grid grid-cols-2 gap-32">
      {
        <div>
          <ToggleButton
            on={displayWrite}
            setOn={setDisplayWrite}
            message={"Write Functions"}
            style={"input-info"}
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
