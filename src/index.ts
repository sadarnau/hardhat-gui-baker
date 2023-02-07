import { task } from "hardhat/config";
import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { exportAbi, parseContracts } from "./utils";
import { exit } from "process";

// TODO : add in a const file
const componentsPath: string = "gui-baker/src/components";
const plugin: string = "node_modules/hardhat-gui-baker";

task("gui-baker", "Create a simple front to test your smartcontract")
  .addOptionalParam("optDeploy", "Optional : Path to the deploy script")
  .addOptionalParam("optNetwork", "Optional : Wich network will be used")
  .setAction(async (taskArgs, hre) => {
    await hre.run("compile");

    // if (!(await hre.artifacts.artifactExists(taskArgs.contract)))
    //   // TODO : throw hardhat error
    //   throw new Error("No contract found with this name");

    // TODO : if network params, lanch node
    // await hre.run("node");

    // // if script :
    // if (taskArgs.deploy)
    //   await hre.run("run", {
    //     script: taskArgs.deploy,
    //     network: taskArgs.net,
    //   });

    console.log("Creating your GUI recipe...");
    if (!existsSync(".gui-baker")) {
      spawnSync("cp", ["-r", plugin + "/gui-baker", ".gui-baker"]);
      spawnSync("pnpm", ["i"], { cwd: ".gui-baker" });
    }

    await parseContracts(hre);
    spawnSync("cp", ["-r", "typechain-types", componentsPath]);

    console.log("Baking your GUI...");

    spawnSync("pnpm", ["build"], {
      cwd: ".gui-baker",
      stdio: "inherit",
    });

    console.log("You can now enjoy it on : localhost:4173");

    spawnSync("pnpm", ["preview"], {
      cwd: ".gui-baker",
      stdio: "inherit",
    });
  });
