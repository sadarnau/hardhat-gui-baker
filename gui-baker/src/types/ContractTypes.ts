// import { Contracts } from "../components/ContractContextExample";
import {
  ExtractAbiFunctions,
  ExtractAbiFunction,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunctionNames,
  Abi,
} from "abitype";

export type FuncType = ExtractAbiFunctions<Abi, "nonpayable">["name"];
export type ConstFuncType = ExtractAbiFunctions<Abi, "view">["name"];
export type ExtractAbiFunctionParams<
  TAbi extends Abi,
  TMethod extends ExtractAbiFunctionNames<TAbi>
> = AbiParametersToPrimitiveTypes<ExtractAbiFunction<TAbi, TMethod>["inputs"]>;
