import { task } from "hardhat/config";
import { spawnSync } from "child_process";
import { replaceInFileSync } from "replace-in-file";
import { writeFileSync } from "fs";

const componentsPath: string = "next-website/components";
const plugin: string = "node_modules/hardhat-gui-baker";

task("gui-baker", "Create a simple front to test your smartcontract")
  .addParam("contract", "The contract name")
  .addOptionalParam("optDeploy", "Optional : Path to the deploy script")
  .addOptionalParam("optNetwork", "Optional : Wich network will be used")
  .setAction(async (taskArgs, hre) => {
    if (!(await hre.artifacts.artifactExists(taskArgs.contract)))
      // TODO : throw hardhat error
      throw new Error("No contract found with this name");

    await hre.run("compile");

    // TODO : if network params, lanch node
    // await hre.run("node");

    // if script :
    if (taskArgs.deploy)
      await hre.run("run", {
        script: taskArgs.deploy,
        network: taskArgs.net,
      });

    const contract = await hre.artifacts.readArtifact(taskArgs.contract);

    console.log("Creating your GUI recipe...");
    const test = spawnSync("cp", ["-r", plugin + "/next-website", "."], {});

    spawnSync("yarn", [], { cwd: "next-website" });

    const fileContent = `export const ${
      contract.contractName
    }Abi = ${JSON.stringify(contract.abi, null, 2)} as const;\n`;

    writeFileSync(
      componentsPath + `/${contract.contractName}Abi.ts`,
      fileContent
    );

    spawnSync("cp", ["-r", "typechain-types", componentsPath]);

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
      to: contract.contractName + "Abi",
    });

    replaceInFileSync({
      files: componentsPath + "/ContractContext.ts",
      from: /ToChangeType/g,
      to: contract.contractName,
    });

    console.log("Baking your GUI...");

    spawnSync("yarn", ["build"], {
      cwd: "next-website",
    });

    console.log("You can now enjoy it on : localhost:3000");

    spawnSync("yarn", ["start"], {
      cwd: "next-website",
    });
  });
