import { task } from "hardhat/config";
import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { parseContracts } from "./utils";
import { findRootSync } from "@manypkg/find-root";

// TODO : take care of monorepos

const baseVitePath: string = "/node_modules/hardhat-gui-baker/gui-baker";

task("gui-baker", "Create a simple front to test your smartcontract")
  .addOptionalParam("optNetwork", "Optional : Wich network will be used")
  .addOptionalParam(
    "optPort",
    "Optional : Wich port will be used to expose the GUI"
  )
  .setAction(async (taskArgs, hre) => {
    await hre.run("compile");

    const root = findRootSync(process.cwd());
    const vitePath = root.rootDir + baseVitePath;

    // TODO : if network param, lanch node
    // await hre.run("node");

    console.log("\nCreating your GUI recipe...");
    if (!existsSync(".gui-baker"))
      spawnSync("cp", ["-r", vitePath, ".gui-baker"]);

    spawnSync("npm", ["i"], { cwd: ".gui-baker" });
    await parseContracts(hre);

    console.log("Baking your GUI...");
    spawnSync("npm", ["run", "build"], {
      cwd: ".gui-baker",
    });

    if (taskArgs.optPort) {
      console.log(
        "You can now enjoy it on : http://localhost:" + taskArgs.optPort
      );
      spawnSync("npm", ["run", "preview", "--", "--port", taskArgs.optPort], {
        cwd: ".gui-baker",
      });
    } else {
      console.log("You can now enjoy it on : http://localhost:4173");
      spawnSync("npm", ["run", "preview"], {
        cwd: ".gui-baker",
      });
    }
  });
