import { task } from "hardhat/config";
import { spawn, spawnSync } from "child_process";

task("front", "Prints a hello world message").setAction(
  async (taskArgs, hre) => {
    await hre.run("compile");
    // spawn("mkdir", ["../../../front"]);
    // const createReact = spawnSync(
    //   "yarn",
    //   ["create", "react-app", "contract-front", "--template", "typescript"],
    //   { cwd: "../../../front" }
    // );

    // spawnSync("cp", ["-r", "artifacts", "../../../front/contract-front/src"]);

    spawnSync("yarn", ["start"], { cwd: "../../../front/contract-front" });
  }
);
