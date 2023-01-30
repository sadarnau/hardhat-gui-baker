import { ContractAbi } from "./ContractContext";
import { Contract } from "ethers";
import { ParamType } from "ethers/src.ts/utils";
import { useContractRead } from "wagmi";
import {
  ExtractAbiFunctions,
  ExtractAbiFunction,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunctionNames,
  Abi,
} from "abitype";
import { useForm } from "react-hook-form";
import { useState } from "react";

export type ExtractAbiFunctionParams<
  TAbi extends Abi,
  TMethod extends ExtractAbiFunctionNames<TAbi>
> = AbiParametersToPrimitiveTypes<ExtractAbiFunction<TAbi, TMethod>["inputs"]>;

type Props = {
  contract: Contract;
  functionName: ExtractAbiFunctions<typeof ContractAbi, "view">["name"];
};

function displayName(arg: ParamType) {
  if (!arg.name) return arg.type;
  return `${arg.name} (${arg.type})`;
}

function FunctionConstant({ contract, functionName }: Props) {
  type Result2 = ExtractAbiFunctionParams<
    typeof ContractAbi,
    typeof functionName
  >;
  const [result, setResult] = useState("");
  const nbArgs = contract.interface.functions[functionName].inputs.length;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Record<string, Result2>>();

  const onSubmit = (data: any) => {
    console.log(data);
    callMe();
  };

  const { data, refetch: callMe } = useContractRead({
    address: contract.address,
    abi: ContractAbi,
    functionName: functionName,
    enabled: false,
    args: Object.values(watch()) as any,
    onSuccess(data) {
      console.log("Success", data);
      setResult(data.toString());
    },
  });

  return (
    <div className="my-5 grid grid-cols-12 w-[600px] ">
      <div className="col-span-11">
        <h3 className={`${!nbArgs ? "inline" : ""} mr-4`}>
          {functionName.slice(0, functionName.indexOf("("))}
        </h3>
        <div className="grid grid-cols-2 ">
          {contract.interface.functions[functionName].inputs.map((arg, i) => {
            return (
              <input
                className="input input-secondary input-md h-8 border-2 mr-4"
                key={arg.name}
                placeholder={displayName(arg)}
                {...register(arg.name)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <button
          className="min-h-8 w-14 btn btn-outline input-xs input-info border-2 h-6"
          onClick={handleSubmit(onSubmit)}
        >
          Read
        </button>
      </div>
      {result === "" ? null : <p className="inline ml-4">{result}</p>}
    </div>
  );
}

export default FunctionConstant;
