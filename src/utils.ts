import { spawnSync } from "child_process";
import { writeFileSync } from "fs";
import { Artifact } from "hardhat/types";
import { replaceInFileSync } from "replace-in-file";

const componentsPath: string = "gui-baker/src/components";

export function exportAbiAndTypes(contract: Artifact) {
  const fileContent = `export const ${
    contract.contractName
  }Abi = ${JSON.stringify(contract.abi, null, 2)} as const;\n`;

  writeFileSync(
    componentsPath + `/${contract.contractName}Abi.ts`,
    fileContent
  );

  spawnSync("cp", ["-r", "typechain-types", componentsPath]);
}

export function createGuiContext(contractName: string) {
  spawnSync("cp", ["ContractContextExample.ts", "ContractContext.ts"], {
    cwd: componentsPath,
  });

  replaceInFileSync({
    files: componentsPath + "/ContractContext.ts",
    from: /\/\//g,
    to: "",
  });

  replaceInFileSync({
    files: componentsPath + "/ContractContext.ts",
    from: /ToChangeAbi/g,
    to: contractName + "Abi",
  });

  replaceInFileSync({
    files: componentsPath + "/ContractContext.ts",
    from: /ToChangeType/g,
    to: contractName,
  });
}
