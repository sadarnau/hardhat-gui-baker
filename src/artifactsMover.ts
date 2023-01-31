import { writeFileSync } from "fs";

export function exportAbi(contractName: string, abi: any[]) {
  const fileContent = `export const ${contractName}Abi = ${JSON.stringify(
    abi,
    null,
    2
  )} as const;\n`;
  writeFileSync(`./${contractName}Abi.ts`, fileContent);
}
