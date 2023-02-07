import { task } from "hardhat/config";
import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { parseContracts } from "./utils";

const frontPath: string = "node_modules/hardhat-gui-baker/gui-baker";

task("gui-baker", "Create a simple front to test your smartcontract")
  .addOptionalParam("optNetwork", "Optional : Wich network will be used")
  .setAction(async (taskArgs, hre) => {
    await hre.run("compile");

    // TODO : if network params, lanch node
    // await hre.run("node");

    console.log("Creating your GUI recipe...");
    if (!existsSync(".gui-baker")) {
      spawnSync("cp", ["-r", frontPath, ".gui-baker"]);
      // TODO : npm for portability
      spawnSync("pnpm", ["i"], { cwd: ".gui-baker" });
    }

    await parseContracts(hre);

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
