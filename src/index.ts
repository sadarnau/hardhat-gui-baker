import { task, types } from "hardhat/config";
import { spawnSync } from "child_process";
import { ethers, hardhatArguments } from "hardhat";
import * as fs from "fs";

const pluginPath: string = "node_modules/test-plugin-hardhat-sam/";

task("front", "create front")
  .addParam("contract", "The contract name")
  .addOptionalParam(
    "deploy",
    "Path to the deploy script (default : scripts/deploy.ts)",
    "scripts/deploy.ts",
    types.string
  )
  .addOptionalParam("cargs", "Constructor arguments")
  .setAction(async (taskArgs, hre) => {
    // console.log(taskArgs);

    // spawnSync("ls", { stdio: [process.stdin, process.stdout, process.stderr] });

    // const accounts = await hre.ethers.getSigners();

    // await hre.run("compile");

    // hre.run("node");

    // if script :
    // await hre.run("run", { script: taskArgs.deploy });
    // const contract = await hre.artifacts.readArtifact(taskArgs.contract);

    // if no script :
    // const contract = await hre.ethers.getContractFactory(taskArgs.contract);
    // const contractDeployed = await contract.deploy(
    //   taskArgs.cargs ? taskArgs.cargs : ""
    // );

    // TO DO : do not need anymore ?
    // spawnSync("cp", ["-r", "artifacts", pluginPath + "contract-front/src"]);

    spawnSync("cp", [
      "-r",
      "typechain-types",
      pluginPath + "contract-front/src",
    ]);

    const file = pluginPath + "contract-front/src/App.tsx";
    const newInterface = taskArgs.contract + "Interface";
    const newImport: string =
      "import " +
      newInterface +
      ' from "./artifacts/contracts/' +
      taskArgs.contract +
      ".sol" +
      "/" +
      taskArgs.contract +
      '.json";\nimport { ' +
      taskArgs.contract +
      ' } from "./typechain-types";\n';

    const data = fs.readFileSync(file); //read existing contents into data
    const buf = Buffer.from(newImport);
    fs.writeFileSync(file, buf); //write new data
    fs.appendFileSync(file, data);

    // spawnSync("yarn", ["start"], {
    //   cwd: pluginPath,
    //   // stdio: [process.stdin, process.stdout, process.stderr],
    // });
  });
