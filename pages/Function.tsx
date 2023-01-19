import { Contract } from "ethers";
import { ParamType } from "ethers/src.ts/utils";
import React, { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { SamTokenAbi } from "../abi/SamToken";
import {
  ExtractAbiFunctions,
  ExtractAbiFunction,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunctionNames,
  Abi,
} from "abitype";
import { useForm, SubmitHandler } from "react-hook-form";

// TO DO : export in type file
export type ExtractAbiFunctionParams<
  TAbi extends Abi,
  TMethod extends ExtractAbiFunctionNames<TAbi>
> = AbiParametersToPrimitiveTypes<ExtractAbiFunction<TAbi, TMethod>["inputs"]>;

type Props = {
  contract: Contract;
  functionName: ExtractAbiFunctions<typeof SamTokenAbi, "nonpayable">["name"];
};

function displayName(arg: ParamType) {
  if (!arg.name) return arg.type;
  return `${arg.name} (${arg.type})`;
}

function Function({ contract, functionName }: Props) {
  type Result2 = ExtractAbiFunctionParams<
    typeof SamTokenAbi,
    typeof functionName
  >;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Record<string, Result2>>();

  const onSubmit = async (data: any) => {
    console.log(data);
    await prepare();
    if (config) sendTransac();
  };

  const { data: config, refetch: prepare } = usePrepareContractWrite({
    address: contract.address,
    abi: SamTokenAbi,
    functionName: functionName,
    enabled: false,
    args: Object.values(watch()) as any,
  });

  const {
    data: dataTransac,
    isLoading,
    isSuccess,
    writeAsync: sendTransac,
  } = useContractWrite({
    ...config,
  });

  return (
    <div>
      <h3>{functionName}</h3>
      {contract.interface.functions[functionName].inputs.map((arg, i) => {
        return (
          <input
            key={arg.name}
            placeholder={displayName(arg)}
            {...register(arg.name)}
          />
        );
      })}
      <button onClick={handleSubmit(onSubmit)}>Submit</button>
    </div>
  );
}

export default Function;
