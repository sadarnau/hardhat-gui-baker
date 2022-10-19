import { Contract } from "ethers";
import React from "react";

type Props = { contract: Contract; functionName: string };

function Function({ contract, functionName }: Props) {
  return (
    <div>
      <h3>{functionName}</h3>
      <input />
      <input />
      <input />
    </div>
  );
}

export default Function;
