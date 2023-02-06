import { ContractAbi } from "../components/ContractContext";
import {
  ExtractAbiFunctions,
  ExtractAbiFunction,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunctionNames,
  Abi,
} from "abitype";

export type FuncType = ExtractAbiFunctions<
  typeof ContractAbi,
  "nonpayable"
>["name"];
export type ConstFuncType = ExtractAbiFunctions<
  typeof ContractAbi,
  "view"
>["name"];
export type ExtractAbiFunctionParams<
  TAbi extends Abi,
  TMethod extends ExtractAbiFunctionNames<TAbi>
> = AbiParametersToPrimitiveTypes<ExtractAbiFunction<TAbi, TMethod>["inputs"]>;
