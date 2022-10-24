import { BigNumber, Contract, ethers } from "ethers";
import { ParamType } from "ethers/src.ts/utils";
import React, { useState } from "react";
import coinabi from "./abi/Coin.json";
import { usePrepareContractWrite, useContractWrite, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const test = [
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "current",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "required",
        type: "uint256",
      },
    ],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dest_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

type Props = { contract: Contract; functionName: string };

function displayName(arg: ParamType) {
  if (!arg.name) return arg.type;
  return `${arg.name} (${arg.type})`;
}

function Function({ contract, functionName }: Props) {
  const [inputs, setInputs] = useState({});

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { config } = usePrepareContractWrite({
    address: contract.address,
    abi: test,
    functionName: "transfer",
    args: [ethers.constants.AddressZero, BigNumber.from(1000000)],
  });
  const { data, isLoading, isSuccess, write: sendTransac } = useContractWrite(
    config
  );

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleClick = () => {
    sendTransac?.();
  };

  return (
    <div>
      <button onClick={() => connect()}>Connect Wallet</button>;
      <h3>{functionName}</h3>
      {contract.interface.functions[functionName].inputs.map((arg) => {
        return (
          <input
            placeholder={displayName(arg)}
            name={arg.name ? arg.name : "arg"}
            value={
              arg.name
                ? inputs[arg.name as keyof typeof inputs]
                : inputs["arg" as keyof typeof inputs]
            }
            onChange={handleChange}
          />
        );
      })}
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Function;
