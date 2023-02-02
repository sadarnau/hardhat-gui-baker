import { SamTokenAbi } from "./SamTokenAbi";
import { SamToken } from "../typechain-types/contracts/SamToken";

export const ContractAbi = SamTokenAbi;
export interface ContractType extends SamToken {}

export {};
