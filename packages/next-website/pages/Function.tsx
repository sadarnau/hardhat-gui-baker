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

  const nbArgs = contract.interface.functions[functionName].inputs.length;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Record<string, Result2>>();

  const onSubmit = async (data: any) => {
    console.log(data);
    await prepare();
    // ready ? sendTransac() : null;
  };

  const {
    data: config,
    refetch: prepare,
    isSuccess: ready,
  } = usePrepareContractWrite({
    address: contract.address,
    abi: ContractAbi,
    functionName: functionName,
    enabled: false,
    args: Object.values(watch()) as any,
    onSuccess() {
      sendTransac();
    },
  });

  const { data: dataTransac, writeAsync: sendTransac } = useContractWrite({
    ...config!,
    async onSuccess(data) {
      console.log(await data.wait());
    },
  });

  return (
    <div className="my-5">
      <h3 className={`${!nbArgs ? "inline" : ""} mr-4`}>
        {functionName.slice(0, functionName.indexOf("("))}
      </h3>
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
      <button
        className="min-h-8 btn btn-outline input-xs input-primary border-2 h-6"
        onClick={handleSubmit(onSubmit)}
      >
        Send
      </button>
    </div>
  );
}

export default Function;
