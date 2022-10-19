import { task } from "hardhat/config";
import { spawn, spawnSync } from "child_process";

task("front", "create front").setAction(async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  await hre.run("compile");
  hre.run("node");
  const contractTest = await hre.ethers.getContractFactory("Coin");
  const deployedContract = await contractTest.deploy(accounts[0].address);
  console.log("deployedContract:", deployedContract.address);

  spawnSync("cp", ["-r", "artifacts", "../../../front/contract-front/src"]);
  spawnSync("cp", [
    "-r",
    "typechain-types",
    "../../../front/contract-front/src",
  ]);
  const test = spawn("pwd");
  test.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  spawnSync("yarn", ["start"], { cwd: "../../../contract-front" });
});
