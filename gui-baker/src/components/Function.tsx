import { Contract } from "ethers";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { ExtractAbiFunctions, Abi} from "abitype";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import { ExtractAbiFunctionParams } from "../types/ContractTypes";


type Props = {
  contract: Contract;
	abi: Abi;
  functionName: string
};

function displayName(arg: any) {
  if (!arg.name) return arg.type;
  return `${arg.name} (${arg.type})`;
}

function Function({ contract, abi, functionName }: Props) {
  type Result2 = ExtractAbiFunctionParams<
    typeof abi,
    typeof functionName
  >;
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const nbArgs = contract.interface.functions[functionName].inputs.length;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Record<string, Result2>>();

  const onSubmit = async (data: any) => {
		await sendTransaction({ recklesslySetUnpreparedArgs: Object.values(data) });
  };

  const { data: dataTransac, writeAsync: sendTransaction } = useContractWrite({
    address: contract.address as `0x${string}`,
    abi: abi,
    functionName: functionName,
    mode: "recklesslyUnprepared",
  });

  return (
    <div className="mb-5 grid grid-cols-12">
      <div className="mt-3 col-span-11">
        <h3 className={`${!nbArgs ? "inline" : ""}`}>
          {functionName.slice(0, functionName.indexOf("("))}
        </h3>
        <div className="grid grid-cols-2">
          {contract.interface.functions[functionName].inputs.map((arg, i) => {
            return (
              <input
                className="input input-secondary input-md h-8 border-2 mt-1 mr-4"
                key={arg.name}
                placeholder={displayName(arg)}
                {...register(arg.name)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-end ">
        <button
          className="min-h-8 w-14 mb-0 btn btn-outline input-info input-xs border-2 h-6"
          onClick={handleSubmit(onSubmit)}
        >
          Send
        </button>
      </div>
      <SuccessMessage message={result} setResult={setResult} />
      <ErrorMessage message={error} setError={setError} />
    </div>
  );
}

export default Function;
