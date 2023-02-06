import { task } from "hardhat/config";
import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { createGuiContext, exportAbiAndTypes } from "./utils";

// TODO : add in a const file
const componentsPath: string = "gui-baker/src/components";
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
    if (!existsSync("gui-baker")) {
      spawnSync("cp", ["-r", plugin + "/gui-baker", "."]);
      spawnSync("yarn", [], { cwd: "gui-baker" });
    }

    exportAbiAndTypes(contract);
    createGuiContext(contract.contractName);

    console.log("Baking your GUI...");

    spawnSync("yarn", ["build"], {
      cwd: "gui-baker",
    });

    console.log("You can now enjoy it on : localhost:4173");

    spawnSync("yarn", ["preview"], {
      cwd: "gui-baker",
    });
  });
