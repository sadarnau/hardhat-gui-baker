import { findRootSync } from "@manypkg/find-root";
import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { task } from "hardhat/config";

import { parseContracts } from "./utils";

const baseVitePath: string = "/node_modules/hardhat-gui-baker/gui-baker";

task("gui-baker", "Create a simple Gui to test your smartcontracts")
  .addOptionalParam(
    "optPort",
    "Optional : Wich port will be used to expose the GUI"
  )
  .addFlag("showLogs", "Show logs")
  .setAction(async (taskArgs, hre) => {
    const logs = taskArgs.showLogs ? "inherit" : "ignore";

    console.log("Compiling your contracts...");
    await hre.run("compile");

    const root = findRootSync(process.cwd());
    const vitePath = root.rootDir + baseVitePath;

    console.log("\nCreating your GUI recipe...");
    if (!existsSync(".gui-baker")) {
      spawnSync("cp", ["-r", vitePath, ".gui-baker"], { stdio: logs });
    }

    spawnSync("npm", ["i"], { cwd: ".gui-baker", stdio: logs });
    await parseContracts(hre);

    console.log("Baking your GUI...");
    spawnSync("npm", ["run", "build"], {
      cwd: ".gui-baker",
      stdio: logs,
    });

    if (taskArgs.optPort) {
      console.log(
        "You can now enjoy it on : http://localhost:" + taskArgs.optPort
      );
      spawnSync("npm", ["run", "preview", "--", "--port", taskArgs.optPort], {
        cwd: ".gui-baker",
        stdio: logs,
      });
    } else {
      console.log("You can now enjoy it on : http://localhost:4173");
      spawnSync("npm", ["run", "preview"], {
        cwd: ".gui-baker",
        stdio: logs,
      });
    }
  });
