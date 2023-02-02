import { Contract } from "ethers";
import { useState } from "react";
import Function from "./Function";
import FunctionConstant from "./FunctionConstant";
import ToggleButton from "./ToggleButton";

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
        <Function key={arg} functionName={arg} contract={contract} />
      ))
    : [];
  const constComponents = displayConstant
    ? constFx.map((arg) => (
        <FunctionConstant key={arg} functionName={arg} contract={contract} />
      ))
    : [];

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="w-full">
          <ToggleButton
            on={displayWrite}
            setOn={setDisplayWrite}
            message={"Write Functions"}
            style={"input-primary"}
          />
        </div>
        <div className="w-full ">
          <ToggleButton
            on={displayConstant}
            setOn={setDisplayConstant}
            message={"Constant Functions"}
            style={"input-info"}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {<div>{writeComponents}</div>}
        {<div>{constComponents}</div>}
      </div>
    </div>
  );
}
