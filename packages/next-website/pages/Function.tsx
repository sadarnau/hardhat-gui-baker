import { ContractAbi } from "./ContractContext";
import { Contract } from "ethers";
import { ParamType } from "ethers/src.ts/utils";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import {
  ExtractAbiFunctions,
  ExtractAbiFunction,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunctionNames,
  Abi,
} from "abitype";
import { useForm } from "react-hook-form";

// TO DO : export in type file
export type ExtractAbiFunctionParams<
  TAbi extends Abi,
  TMethod extends ExtractAbiFunctionNames<TAbi>
> = AbiParametersToPrimitiveTypes<ExtractAbiFunction<TAbi, TMethod>["inputs"]>;

type Props = {
  contract: Contract;
  functionName: ExtractAbiFunctions<typeof ContractAbi, "nonpayable">["name"];
};

function displayName(arg: ParamType) {
  if (!arg.name) return arg.type;
  return `${arg.name} (${arg.type})`;
}

function Function({ contract, functionName }: Props) {
  type Result2 = ExtractAbiFunctionParams<
    typeof ContractAbi,
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
    sendTransac();
  };

  const { data: config, refetch: prepare } = usePrepareContractWrite({
    address: contract.address,
    abi: ContractAbi,
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
    mode: "prepared",
  });

  return (
    <div>
      <h3>{functionName}</h3>
      {contract.interface.functions[functionName].inputs.map((arg, i) => {
        return (
          <input
            className="input input-primary"
            key={arg.name}
            placeholder={displayName(arg)}
            {...register(arg.name)}
          />
        );
      })}
      <button className="btn btn-outline" onClick={handleSubmit(onSubmit)}>
        Submit
      </button>
    </div>
  );
}

export default Function;
