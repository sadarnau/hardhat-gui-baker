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

// version 0.1 :
// const handleChange = (event, i) => {
//   setInputsMap((prev) => ({ ...prev, [i]: event.target.value }));
// };

// const handleClick = () => {
//   console.log(inputsMap);
//   callMe();
// };
// const [inputsMap, setInputsMap] = useState<Record<number, Result2>>({});

// value={inputsMap[i]}
// onChange={(event) => handleChange(event, i)}
// name={arg.name ? arg.name : "arg"}

export type ExtractAbiFunctionParams<
  TAbi extends Abi,
  TMethod extends ExtractAbiFunctionNames<TAbi>
> = AbiParametersToPrimitiveTypes<ExtractAbiFunction<TAbi, TMethod>["inputs"]>;

type Props = {
  contract: Contract;
  functionName: ExtractAbiFunctions<typeof SamTokenAbi, "view">["name"];
};

function displayName(arg: ParamType) {
  if (!arg.name) return arg.type;
  return `${arg.name} (${arg.type})`;
}

function FunctionConstant({ contract, functionName }: Props) {
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

  const onSubmit = (data: any) => {
    console.log(data);
    callMe();
  };

  const { data, refetch: callMe } = useContractRead({
    address: contract.address,
    abi: SamTokenAbi,
    functionName: functionName,
    enabled: false,
    args: Object.values(watch()) as any,
    onSuccess(data) {
      console.log("Success", data);
    },
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

export default FunctionConstant;
