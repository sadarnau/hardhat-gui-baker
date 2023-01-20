import { spawnSync } from "child_process";
import { writeFileSync } from "fs";
import { replaceInFile, replaceInFileSync } from "replace-in-file";
import * as SamTokenInterface from "../packages/hardhat/artifacts/contracts/SamToken.sol/SamToken.json";
// import SamTokenInterface from "../artifacts/contracts/SamToken.sol/SamToken.json";

// spawnSync("cp", ["-r", "hardhat/typechain-types", "next-website/pages"], {
//   cwd: "packages",
// });

// spawnSync("cp", ["ContractContextExample.ts", "ContractContext.ts"], {
//   cwd: "packages/next-website/pages",
// });

// replaceInFileSync({
//   files: "packages/next-website/pages/ContractContext.ts",
//   from: /ToChangeAbi/g,
//   to: "SamTokenAbi",
// });

// replaceInFileSync({
//   files: "packages/next-website/pages/ContractContext.ts",
//   from: /ToChangeType/g,
//   to: "SamToken",
// });

const fileContent = `export const SamTokenAbi = ${JSON.stringify(
  SamTokenInterface.abi,
  null,
  2
)} as const;\n`;
writeFileSync(`packages/next-website/pages/SamTokenAbi.ts`, fileContent);
