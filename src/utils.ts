import { writeFileSync } from "fs";
import { Artifact, HardhatRuntimeEnvironment } from "hardhat/types";

const componentsPath: string = ".gui-baker/src/components";

export async function parseContracts(hre: HardhatRuntimeEnvironment) {
  let nameList: string = "";
  const artifatcsName = await hre.artifacts.getAllFullyQualifiedNames();
  for (const name of artifatcsName) {
    if (name.includes("@openzeppelin")) {
      continue;
    }
    const contract: Artifact = await hre.artifacts.readArtifact(name);
    exportAbi(contract);
    addContractToContext(contract.contractName);
    nameList += contract.contractName + ",";
  }
  addExportToContext(nameList.slice(0, -1));
}

export function exportAbi(contract: Artifact) {
  const fileContent = `export const ${contract.contractName} = {\nname: "${
    contract.contractName
  }",
	  abi: ${JSON.stringify(contract.abi, null, 2)} as const,\n}`;

  writeFileSync(componentsPath + `/${contract.contractName}.ts`, fileContent);
}

export function addContractToContext(contractName: string) {
  const fileContent = `import { ${contractName} } from "./${contractName}";\n`;

  writeFileSync(componentsPath + `/ContractContext.ts`, fileContent, {
    flag: "a",
  });
}
export function addExportToContext(nameList: string) {
  const fileContent = `export const Contracts = [${nameList}];`;

  writeFileSync(componentsPath + `/ContractContext.ts`, fileContent, {
    flag: "a",
  });
}
