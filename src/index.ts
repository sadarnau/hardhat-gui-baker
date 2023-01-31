import { task, types } from "hardhat/config";
import { spawnSync } from "child_process";
import { replaceInFileSync } from "replace-in-file";
import { writeFileSync } from "fs";

const pluginPath: string = "node_modules/hardhat-gui-baker/";
const pagesPath: string = pluginPath + "next-website/pages";

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

    const fileContent = `export const ${
      contract.contractName
    }Abi = ${JSON.stringify(contract.abi, null, 2)} as const;\n`;
    writeFileSync(pagesPath + `/${contract.contractName}Abi.ts`, fileContent);

    spawnSync("cp", ["-r", "typechain-types", pagesPath]);

    spawnSync("cp", ["ContractContextExample.ts", "ContractContext.ts"], {
      cwd: pagesPath,
    });

    replaceInFileSync({
      files: pagesPath + "/ContractContext.ts",
      from: /\/\//g,
      to: "",
    });

    replaceInFileSync({
      files: pagesPath + "/ContractContext.ts",
      from: /ToChangeAbi/g,
      to: contract.contractName + "Abi",
    });

    replaceInFileSync({
      files: pagesPath + "/ContractContext.ts",
      from: /ToChangeType/g,
      to: contract.contractName,
    });

    console.log("you can now go to : localhost:3000");
    spawnSync("yarn", ["website"], {
      cwd: pluginPath,
      stdio: [0, 1, 2],
    });
  });
